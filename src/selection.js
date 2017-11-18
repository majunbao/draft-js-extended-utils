import { EditorState } from 'draft-js';

export const collapseOnEndOffset = editorState => {
  const selection = editorState.getSelection();
  const endKey = selection.getEndKey();
  const startKey = selection.getStartKey();
  const isBackward = selection.isBackward;
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  const key = isBackward ? startKey : endKey;
  const offset = isBackward ? startOffset : endOffset;

  const newSelection = selection.merge({
    anchorOffset: offset,
    focusOffset: offset,
    anchorKey: key,
    focusKey: key,
    isBackward: false,
  });

  return EditorState.forceSelection(editorState, newSelection);
};

export const collapseOnStartOffset = editorState => {
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const isBackward = selection.isBackward;
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  const key = isBackward ? endKey : startKey;
  const offset = isBackward ? endOffset : startOffset;

  const newSelection = selection.merge({
    anchorOffset: offset,
    focusOffset: offset,
    anchorKey: key,
    focusKey: key,
    isBackward: false,
  });

  return EditorState.forceSelection(editorState, newSelection);
};

export const selectAllBlocks = editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startBlock = contentState.getFirstBlock();
  const endBlock = contentState.getLastBlock();
  const newSelection = selection
    .merge({
      anchorOffset: 0,
      anchorKey: startBlock.getKey(),
      focusOffset: endBlock.getLength(),
      focusKey: endBlock.getKey(),
      isBackward: false,
    });

  return EditorState.acceptSelection(editorState, newSelection);
};
