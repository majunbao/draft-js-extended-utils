import { EditorState, Modifier, RichUtils, convertToRaw, SelectionState } from 'draft-js';
import splitBlock from 'draft-js/lib/splitBlockInContentState';
import { Map, fromJS, isImmutable } from 'immutable';

export const getSelectedBlocks = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const startKey = editorState.getSelection().getStartKey();
  const endKey = editorState.getSelection().getEndKey();

  return blockMap
    .skipUntil((__, k) => k === startKey)
    .takeUntil((__, k) => k === endKey)
    .concat(Map([[endKey, blockMap.get(endKey)]]));
};

export const getSelectedBlockKeys = editorState => {
  return (getSelectedBlocks(editorState)
    .map(block => block.getKey()))
    .toList()
    .toJS();
};

export const getBlockByIndex = (index, editorState) => {
  return editorState
    .getCurrentContent()
    .getBlockMap()
    .toList()
    .get(index);
};

export const getBlockByKey = (key, editorState) => {
  return editorState
    .getCurrentContent()
    .getBlockMap().get(key)
};

export const removeBlockWithKey = (key, editorState) => {
  const contentState = editorState.getCurrentContent();
  const newBlockMap = editorState
    .getCurrentContent()
    .getBlockMap()
    .filter(block => block.get('key') !== key);
  const prevKey = contentState.getKeyBefore(key);
  const nextKey = contentState.getKeyAfter(key);
  const anchorAndFocusKey = prevKey || nextKey;

  // last block and we cannot remove it.
  if (!anchorAndFocusKey) return editorState;

  const newSelectionAfter = SelectionState
    .createEmpty(key)
    .merge({
      anchorKey: anchorAndFocusKey,
      focusKey: anchorAndFocusKey,
      anchorOffset: 0,
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    });

  // move the selection back to what it was before
  // it might be better if we just move the selection to point to prev block
  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: newSelectionAfter,
  });

  return EditorState.push(editorState, newContentState, 'move-block'
  );
};

export const getFirstBlock = editorState => {
  return editorState.getCurrentContent().getFirstBlock();
};

export const getLastBlock = editorState => {
  return editorState.getCurrentContent().getLastBlock();
};

export const getBlockLength = block => {
  return block.getLength();
};

export const addBlockAfterKey = (block, key, editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  const blockMap1 = blockMap
    .takeUntil((__, k) => k === key)
    .concat(Map([
      [key, blockMap.get(key)],
      [block.getKey(), block]
    ]));

  const blockMap2 = blockMap
    .reverse()
    .takeUntil((__, k) => k === key)
    .reverse();

  const newBlockMap = blockMap1.merge(blockMap2);
  const newSelectionAfter = SelectionState
    .createEmpty(block.getKey())
    .merge({
      anchorKey: block.getKey(),
      focusKey: block.getKey(),
      anchorOffset: 0,
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    });

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: newSelectionAfter,
  });

  return EditorState.push(editorState, newContentState, 'change-block');
};

export const addBlockBeforeKey = (block, key, editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();

  const blockMap1 = blockMap
    .takeUntil((__, k) => k === key)
    .concat(Map([
      [block.getKey(), block],
      [key, blockMap.get(key)],
    ]));

  const blockMap2 = blockMap
    .reverse()
    .takeUntil((__, k) => k === key)
    .reverse();

  const newBlockMap = blockMap1.merge(blockMap2);
  const newSelectionAfter = SelectionState
    .createEmpty(block.getKey())
    .merge({
      anchorKey: block.getKey(),
      focusKey: block.getKey(),
      anchorOffset: 0,
      focusOffset: 0,
      isBackward: false,
      hasFocus: true,
    });

  const newContentState = contentState.merge({
    blockMap: newBlockMap,
    selectionBefore: contentState.getSelectionAfter(),
    selectionAfter: newSelectionAfter,
  });

  return EditorState.push(editorState, newContentState, 'change-block');
};

// (EditorState, fn) -> BlockMap
export const reduceBlockMap = (editorState, callback) => {
  return editorState
    .getCurrentContent()
    .getBlockMap()
    .reduce(callback);
};

export const changeSelectionBlockDepth = (depth, editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const blockFragment = getSelectedBlocks(editorState);
  const newBlockMap = blockFragment.reduce((acc, block) => {
    return acc.set(block.getKey(), block.set('depth', depth));
  }, Map());
  const currentContent = contentState.merge({ blockMap: blockMap.merge(newBlockMap) });

  return EditorState.push(editorState, currentContent, 'adjust-depth');
};

export const increaseBlockDepth = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const blockFragment = getSelectedBlocks(editorState);
  const newBlockMap = blockFragment.reduce((acc, block) => {
    const depth = block.getDepth();
    const newDepth = depth <= 0 ? 1 : depth + 1;
    return acc.set(block.getKey(), block.set('depth', newDepth));
  }, Map());
  const currentContent = contentState.merge({ blockMap: blockMap.merge(newBlockMap) });

  return EditorState.push(editorState, currentContent, 'adjust-depth');
};

export const decreaseBlockDepth = editorState => {
  const contentState = editorState.getCurrentContent();
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const blockFragment = getSelectedBlocks(editorState);
  const newBlockMap = blockFragment.reduce((acc, block) => {
    const depth = block.getDepth();
    const newDepth = depth <= 0 ? 0 : depth - 1;
    return acc.set(block.getKey(), block.set('depth', newDepth));
  }, Map());
  const currentContent = contentState.merge({ blockMap: blockMap.merge(newBlockMap) });

  return EditorState.push(editorState, currentContent, 'adjust-depth');
};

export const setSelectedBlockData = (data, editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const blockFragment = getSelectedBlocks(editorState);
  const newBlockMap = blockFragment.reduce((acc, block) => {
    return acc.set(block.getKey(), block.set('data', data));
  }, Map());
  const currentContent = contentState.merge({ blockMap: blockMap.merge(newBlockMap) });

  return EditorState.push(editorState, currentContent, 'change-block-data');
};

// merge as JS
export const mergeSelectedBlockData = (data = {}, editorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = editorState.getCurrentContent().getBlockMap();
  const blockFragment = getSelectedBlocks(editorState);
  const newBlockMap = blockFragment.reduce((acc, block) => {
    const blockData = block.getData().merge(data).toJS();
    return acc.set(block.getKey(), block.set('data', blockData));
  }, Map());
  const currentContent = contentState.merge({ blockMap: blockMap.merge(newBlockMap) });

  return EditorState.push(editorState, currentContent, 'change-block-data');
};

export const splitBlockWithData = (editorState, data = {}, selection) => {
  const contentState = splitBlock(
    editorState.getCurrentContent(),
    selection || editorState.getSelection()
  );

  return changeSelectionBlockData(
    EditorState.push(editorState, contentState, 'change-block-data'),
    data
  );
};

export const findBlockStyleRanges = (block, style) => {
  let result = [];
  block.findStyleRanges(
    char => char.hasStyle(style),
    (start, end) => result.push({ start, end }),
  );

  return result;
};
