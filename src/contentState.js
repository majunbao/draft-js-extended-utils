import { convertToRaw } from 'draft-js';

export const getBlockMap = editorState => {
  return editorState
    .getCurrentContent()
    .getBlockMap();
};

export const getSelectionBefore = editorState => {
  return editorState
    .getCurrentContent()
    .getSelectionBefore();
};

export const getSelectionAfter = editorState => {
  return editorState
    .getCurrentContent()
    .getSelectionAfter();
};

