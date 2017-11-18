import { EditorState, Modifier, RichUtils, convertToRaw } from 'draft-js';
import splitBlock from 'draft-js/lib/splitBlockInContentState';
import { Map, fromJS, isImmutable } from 'immutable';

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
  return getSelectedBlocksAsList(editorState).map(block => block.key);
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
