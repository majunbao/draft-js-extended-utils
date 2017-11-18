import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  ContentState
} from 'draft-js';

export const fromRaw = (raw, decorator = null) => {
  try {
    return EditorState.createWithContent(convertFromRaw(raw), decorator);
  } catch (err) {
    console.log('Error converting to EditorState');
    return EditorState.createEmpty(decorator);
  }
};

export const toRaw = (obj) => {
  if (obj instanceof EditorState) {
    return convertToRaw(obj.getCurrentContent());
  }

  if (obj instanceof ContentState) {
    return convertToRaw(obj);
  }
  console.log('Expecting object to be instance of ContentState or EditorState');
};

export const toRawString = (obj) => {
  return JSON.stringify(toRaw(obj));
};

export const logRaw = obj => {
  const raw = toRaw(obj);
  console.log(JSON.stringify(raw, null, 2));
};
