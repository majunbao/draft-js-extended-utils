import { expect } from 'chai';
import RawContentState from 'draft-js-raw-content-state';

import {
  setUndo,
  getUndoStack,
  getRedoStack,
} from '../src/editorState';

describe('setUndo', () => {
  it('should set undo to false to prevent writting to the undo stack', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .toEditorState();
    expect(editorState.getAllowUndo()).to.equal(true);
    const newEditorState = setUndo(false, editorState);
    expect(newEditorState.getAllowUndo()).to.equal(false);
  });
});

describe('getUndoStack', () => {
  it('should set undo to false to prevent writing to the undo stack', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .toEditorState();
    const stack = getUndoStack(editorState);
    console.log('stack :\n', stack);
    expect(stack.constructor.name ===  'Stack').to.equal(true);
    expect(getUndoStack(editorState).toJS()).to.deep.equal([]);
  });
});
describe('getRedoStack', () => {
  it('should set undo to false to prevent writing to the undo stack', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .toEditorState();
    const stack = getRedoStack(editorState);
    expect(stack.constructor.name == 'Stack').to.equal(true);
    expect(getRedoStack(editorState).toJS()).to.deep.equal([]);
  });
});

