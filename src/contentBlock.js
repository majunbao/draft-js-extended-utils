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

// TODO: [] require more testing on to see how undo/redo behaves
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

export const changeBlockDepth = (depth, block) => {
  return block.set('depth', depth);
};

export const addDataToSelectedBlocks = (editorState, data) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const updatedContentState = Modifier.mergeBlockData(
    contentState,
    selection,
    fromJS(data)
  );
  const newEditorState = EditorState.push(
    editorState,
    updatedContentState,
    'change-block-data'
  );

  return EditorState.forceSelection(newEditorState, selection);
};

export const removeAllDataFromSelectedBlocks = editorState => {
  return addDataToSelectedBlocks(editorState, {});
};

export const removeSelectionBlockData = (editorState, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const selectedBlockKeys = getSelectedBlockKeys(editorState);
  const newContentState = reduceAndRemoveBlockData(oldContentState, selectedBlockKeys, dataPath);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export const removeBlockDataForBlockKeys = (editorState, blockKeys, dataPath) => {
  const oldContentState = editorState.getCurrentContent();
  const newContentState = reduceAndRemoveBlockData(oldContentState, blockKeys, dataPath);

  return EditorState.push(editorState, newContentState, 'change-block-data');
};

export const getBlockDataProp = (block, prop) => block.getData().get(prop);

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
