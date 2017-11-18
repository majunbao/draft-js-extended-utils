import { expect } from 'chai';
import RawContentState from 'draft-js-raw-content-state';
import {
  getBlockMap,
  getSelectionBefore,
  getSelectionAfter,
} from "../src/contentState";

describe('getBlockMap', () => {
  const editorState = new RawContentState()
    .addBlock('block1')
    .addBlock('block2')
    .addBlock('block3')
    .toEditorState();

  const blockMap = getBlockMap(editorState);
  expect(blockMap.size).to.equal(3)
});

describe('getSelectionBefore', () => {
  it('should find the selection before', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .addBlock('block2')
      .addBlock('block2')
      .toEditorState();

    const selectionBefore = getSelectionBefore(editorState);
    expect(selectionBefore.toJS()).to.deep.equal(editorState.getCurrentContent().getSelectionBefore().toJS())
  });
});

describe('getSelectionAfter', () => {
  it('should find the selection before', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .addBlock('block2')
      .addBlock('block2')
      .toEditorState();

    const selectionBefore = getSelectionAfter(editorState);
    expect(selectionBefore.toJS()).to.deep.equal(editorState.getCurrentContent().getSelectionAfter().toJS())
  });
});
