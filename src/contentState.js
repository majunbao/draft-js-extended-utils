import { convertToRaw } from 'draft-js';

export const editorStateToRaw = editorState => {
  return convertToRaw(editorState.getCurrentContent());
};

