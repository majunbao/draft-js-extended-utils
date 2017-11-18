import { EditorState } from 'draft-js';

export const setUndo = (bool, editorState) => {
  return EditorState.set(editorState, {
    allowUndo: bool,
  })
};

export const getUndoStack = (editorState) => {
  return editorState.getUndoStack();
};

export const getRedoStack = (editorState) => {
  return editorState.getRedoStack();
};
