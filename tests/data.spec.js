import RawContentState from 'draft-js-raw-content-state';
import { EditorState } from 'draft-js';
import { expect } from 'chai';
import {
  toRaw,
  logRaw,
  fromRaw,
  toRawString,
} from '../src/data';

describe('fromRaw', () => {
  it('should convert from raw contentState', () => {
    const raw = new RawContentState()
      .addBlock('Block1')
      .addBlock('Block2')
      .toRawContentState();

    const editorState = fromRaw(raw);
    expect(editorState instanceof EditorState).to.equal(true);
  });
  it('should return an empty editorState when conversion fails', () => {
    const editorState = fromRaw('Hello');
    expect(editorState instanceof EditorState).to.equal(true);
    expect(editorState.getCurrentContent().getFirstBlock().getText()).to.equal('');
  });
});

describe('toRaw', () => {
  const expected = {
    entityMap: {},
    blocks: [{
      data: {},
      depth: 0,
      entityRanges: [],
      inlineStyleRanges: [],
      key: "key1",
      text: "Block1",
      type: "unstyled",
    }],
  };
  it('should convert contentState to raw contentState', () => {
    const contentState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .toContentState();

    expect(toRaw(contentState)).to.deep.equal(expected)
  });

  it('should convert editorState to raw contentState', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .toEditorState();

    expect(toRaw(editorState)).to.deep.equal(expected);
  });
});

describe('toRawString', () => {
  const expected = JSON.stringify({
    entityMap: {},
    blocks: [{
      key: "key1",
      text: "Block1",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    }]
  });

  it('converts editorState to rawContentState as a string', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .toEditorState();
    const rawString = toRawString(editorState);
    expect(rawString).to.equal(expected);
  });
  it('converts contentState to rawContentState as a string', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .toContentState();
    const rawString = toRawString(editorState);
    expect(rawString).to.equal(expected);
  });
});

describe('logRaw', () => {
  it('logs rawContentState', () => {
    // find out how to test this
  });
});
