import RawContentState from 'draft-js-raw-content-state';
import { expect } from 'chai';
import {
  selectAllBlocks,
  collapseOnEndOffset,
  collapseOnStartOffset,
  mergeSelection,
  getSelection,
} from '../src/selection';

describe('collapseOnEndOffset', () => {
  it('should collapse the selection on the focus offset', () => {
    const editorState = new RawContentState()
      .addBlock('Block with entity here')
      .anchorKey(0)
      .focusKey(5)
      .toEditorState();

    const newEditorState = collapseOnEndOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(5);
    expect(newSelection.getFocusOffset()).to.equal(5);
  });
  it('should collapse the selection on the focus offset when selection is backward', () => {
    const editorState = new RawContentState()
      .addBlock('Block with entity here')
      .anchorKey(0)
      .focusKey(5)
      .isBackward(true)
      .toEditorState();

    const newEditorState = collapseOnEndOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(5);
    expect(newSelection.getFocusOffset()).to.equal(5);
  });
  it('should collapse the selection on the focus offset when multiple blocks are selected', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('Block2')
      .setKey('key2')
      .addBlock('Block3')
      .setKey('key3')
      .focusKey(5)
      .toEditorState();

    const newEditorState = collapseOnEndOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(5);
    expect(newSelection.getFocusOffset()).to.equal(5);
    expect(newSelection.getFocusKey()).to.equal('key3');
  });
  it('should collapse the selection on the focus offset when multiple blocks are selected and selection is backward', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('Block2')
      .setKey('key2')
      .addBlock('Block3')
      .setKey('key3')
      .focusKey(5)
      .isBackward(true)
      .toEditorState();

    const newEditorState = collapseOnEndOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(5);
    expect(newSelection.getFocusOffset()).to.equal(5);
    expect(newSelection.getFocusKey()).to.equal('key3');
  });
});

describe('collapseOnStartOffset', () => {
  it('should collapse the selection on the anchor offset', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .anchorKey(0)
      .focusKey(5)
      .toEditorState();

    const newEditorState = collapseOnStartOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(0);
    expect(newSelection.getFocusOffset()).to.equal(0);
  });
  it('should collapse the selection on the anchor offset when selection is backward', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .anchorKey(0)
      .focusKey(5)
      .isBackward(true)
      .toEditorState();

    const newEditorState = collapseOnStartOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(0);
    expect(newSelection.getFocusOffset()).to.equal(0);
  });
  it('should collapse the selection on the anchor offset when multiple blocks are selected', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('Block2')
      .setKey('key2')
      .addBlock('Block3')
      .setKey('key3')
      .focusKey(5)
      .toEditorState();

    const newEditorState = collapseOnStartOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(0);
    expect(newSelection.getFocusOffset()).to.equal(0);
    expect(newSelection.getFocusKey()).to.equal('key1');
  });
  it('should collapse the selection on the anchor offset when multiple blocks are selected and selection is backward', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('Block2')
      .setKey('key2')
      .addBlock('Block3')
      .setKey('key3')
      .focusKey(5)
      .isBackward(true)
      .toEditorState();

    const newEditorState = collapseOnStartOffset(editorState);
    const newSelection = newEditorState.getSelection();
    expect(newSelection.getAnchorOffset()).to.equal(0);
    expect(newSelection.getFocusOffset()).to.equal(0);
    expect(newSelection.getFocusKey()).to.equal('key1');
  });
});

describe('selectAllBlocks', () => {
  it('should select all blocks', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .addBlock('Block2')
      .addBlock('Block3')
      .addBlock('Block4')
      .setKey('key4')
      .toEditorState();

    const { anchorOffset, focusOffset, anchorKey, focusKey, } = selectAllBlocks(editorState).getSelection();

    expect(anchorOffset).to.equal(0);
    expect(focusOffset).to.equal(6);
    expect(anchorKey).to.equal('key1');
    expect(focusKey).to.equal('key4');
  });
  it('should select all blocks on a backward selection', () => {
    const editorState = new RawContentState()
      .addBlock('Block1')
      .setKey('key1')
      .addBlock('Block2')
      .addBlock('Block3')
      .addBlock('Block4')
      .isBackward(true)
      .setKey('key4')
      .toEditorState();

    const { anchorOffset, focusOffset, anchorKey, focusKey, } = selectAllBlocks(editorState).getSelection();

    expect(anchorOffset).to.equal(0);
    expect(focusOffset).to.equal(6);
    expect(anchorKey).to.equal('key1');
    expect(focusKey).to.equal('key4');
  });
});

describe('selectEntityInRange', () => {
  it('selectEntityInRange', () => {
    // selectEntityInRange()
  });
});

describe('selectOverlappingEntities', () => {
  it('selectOverlappingEntities', () => {
    // selectOverlappingEntities()
  });
});

describe('selectionHasEntityType', () => {
  it('selectionHasEntityType', () => {
    // selectionHasEntityType()
  });
});

describe('mergeSelection', () => {
  it('should merge a selection', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .focusKey(6)
      .toEditorState();

    const selection = editorState.getSelection().toJS();

    const original = {
      anchorOffset: 0,
      focusOffset: 6,
      anchorKey: 'key1',
      focusKey: 'key3',
      hasFocus: false,
      isBackward: false,
    };
    const expected = {
      anchorOffset: 1,
      focusOffset: 2,
      anchorKey: 'key2',
      focusKey: 'key3',
      hasFocus: true,
      isBackward: true,
    };
    const result = mergeSelection({
      anchorOffset: 1,
      focusOffset: 2,
      anchorKey: 'key2',
      focusKey: 'key3',
      hasFocus: true,
      isBackward: true,
    }, editorState).getSelection().toJS();

    expect(selection).to.deep.equal(original);
    expect(result).to.deep.equal(expected);
  });
});

describe('getSelection', () => {
  it('should get a selection', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .anchorKey(0)
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .focusKey(6)
      .toEditorState();

    const selection = editorState.getSelection().toJS();
    expect(selection).to.deep.equal(getSelection(editorState));
  });
});
