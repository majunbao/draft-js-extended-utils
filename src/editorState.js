import { EditorState, convertFromRaw } from 'draft-js';

export const fromRawContentStateToEditorState = (contentState, decorator) => {
  return contentState
    ? EditorState.createWithContent(convertFromRaw(contentState), decorator)
    : EditorState.createEmpty(decorator);
};

export const createEditorStateFromContentState = (contentState, decorator) => {
  return EditorState.createWithContent(convertFromRaw(contentState), decorator);
};
