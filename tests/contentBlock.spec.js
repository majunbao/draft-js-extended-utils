import { expect } from 'chai';
import RawContentState from 'draft-js-raw-content-state';
import {
  getBlockByKey,
  getBlockByIndex,
  getSelectedBlocks,
  removeBlockWithKey,
  getSelectedBlockKeys,
  getFirstBlock,
  getLastBlock,
  addBlockAfterKey,
  addBlockBeforeKey,
} from '../src/contentBlock';

describe('getSelectedBlocks', () => {
  it('getSelectedBlocks', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .anchorKey(0)
      .addBlock('block3')
      .setKey('key3')
      .addBlock('block4')
      .setKey('key4')
      .focusKey()
      .addBlock('block5')
      .setKey('key5')
      .toEditorState();

    const blocks = getSelectedBlocks(editorState);
    expect(blocks.size).to.equal(3);
    expect(blocks.get('key1')).to.equal(undefined);
    expect(blocks.get('key2').get('key')).to.equal('key2');
    expect(blocks.get('key3').get('key')).to.equal('key3');
    expect(blocks.get('key4').get('key')).to.equal('key4');
    expect(blocks.get('key1')).to.equal(undefined);
  });

});

describe('getSelectedBlockKeys', () => {
  it('gets the selected block keys', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .anchorKey(0)
      .addBlock('block3')
      .setKey('key3')
      .addBlock('block4')
      .setKey('key4')
      .focusKey()
      .addBlock('block5')
      .setKey('key5')
      .toEditorState();

    const blockKeys = getSelectedBlockKeys(editorState);
    expect(blockKeys).to.deep.equal(['key2', 'key3', 'key4'])
  });
});

describe('getBlockByIndex', () => {
  it('gets blocks by index', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .toEditorState();

    const block = getBlockByIndex(1, editorState);
    expect(block.getKey()).to.equal('key2')
  });

});

describe('getBlockByKey', () => {
  it('gets blocks by index', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .toEditorState();

    const block = getBlockByKey('key1', editorState);
    expect(block.getKey()).to.equal('key1')
  });

});

describe('removeBlockWithKey', () => {
  describe(`remove the first block on a blockMap and sets the selection to the next 
  block. Also updates the selectionBefore and selectionAfter selections, for undo/redo 
  history`, () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .toEditorState();

    const newEditorState = removeBlockWithKey('key1', editorState);
    const contentState = newEditorState.getCurrentContent();
    const selectionBefore = contentState.getSelectionBefore();
    const selectionAfter = contentState.getSelectionAfter();
    const selection = newEditorState.getSelection();
    const block1 = contentState.getBlockForKey('key1');
    const block2 = contentState.getBlockForKey('key2');
    const block3 = contentState.getBlockForKey('key3');

    it('should remove the block with the blockKey', () => {
      expect(block1).to.equal(undefined);
      expect(block2.getKey()).to.equal('key2');
      expect(block3.getKey()).to.equal('key3');
    });

    it('should set a new selection to be the next block when there is no block before', () => {
      expect(selection.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: true,
        isBackward: false,
        anchorKey: 'key2',
        focusKey: 'key2',
      });
    });

    it('selectionAfter should be equal to the new selection', () => {
      expect(selectionAfter.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: true,
        isBackward: false,
        anchorKey: 'key2',
        focusKey: 'key2',
      });
    });

    it('selection before should be equal to the previous selection', () => {
      expect(selectionBefore.toJS()).to.deep.equal({
        anchorKey: 'key1',
        anchorOffset: 0,
        focusKey: 'key1',
        focusOffset: 0,
        hasFocus: false,
        isBackward: false,
      })
    });
  });

  describe(`remove the second block on a blockMap and sets the selection to the prev 
  block. Also updates the selectionBefore and selectionAfter selections, for undo/redo 
  history`, () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .addBlock('block2')
      .setKey('key2')
      .addBlock('block3')
      .setKey('key3')
      .toEditorState();

    const newEditorState = removeBlockWithKey('key2', editorState);
    const contentState = newEditorState.getCurrentContent();
    const selectionBefore = contentState.getSelectionBefore();
    const selectionAfter = contentState.getSelectionAfter();
    const selection = newEditorState.getSelection();
    const block1 = contentState.getBlockForKey('key1');
    const block2 = contentState.getBlockForKey('key2');
    const block3 = contentState.getBlockForKey('key3');

    it('should remove the block with the blockKey', () => {
      expect(block1.getKey()).to.equal('key1');
      expect(block2).to.equal(undefined);
      expect(block3.getKey()).to.equal('key3');
    });

    it('should set a new selection to be the next block when there is no block before', () => {
      expect(selection.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: true,
        isBackward: false,
        anchorKey: 'key1',
        focusKey: 'key1',
      });
    });

    it('selectionAfter should be equal to the new selection', () => {
      expect(selectionAfter.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: true,
        isBackward: false,
        anchorKey: 'key1',
        focusKey: 'key1',
      });
    });

    it('selection before should be equal to the previous selection', () => {
      expect(selectionBefore.toJS()).to.deep.equal({
        anchorKey: 'key1',
        anchorOffset: 0,
        focusKey: 'key1',
        focusOffset: 0,
        hasFocus: false,
        isBackward: false,
      })
    });
  });

  describe(`should try remove the first block on a blockMap containing 1 block`, () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .setKey('key1')
      .toEditorState();

    const newEditorState = removeBlockWithKey('key2', editorState);
    const contentState = newEditorState.getCurrentContent();
    const selectionBefore = contentState.getSelectionBefore();
    const selectionAfter = contentState.getSelectionAfter();
    const selection = newEditorState.getSelection();
    const block1 = contentState.getBlockForKey('key1');

    it('should remove the block with the blockKey', () => {
      expect(block1.getKey()).to.equal('key1');
    });

    it('should set a new selection to be the next block when there is no block before', () => {
      expect(selection.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: false,
        isBackward: false,
        anchorKey: 'key1',
        focusKey: 'key1',
      });
    });

    it('selectionAfter should be equal to the new selection', () => {
      expect(selectionAfter.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: false,
        isBackward: false,
        anchorKey: 'key1',
        focusKey: 'key1',
      });
    });

    it('selection before should be equal to the previous selection', () => {
      expect(selectionBefore.toJS()).to.deep.equal({
        anchorOffset: 0,
        focusOffset: 0,
        hasFocus: false,
        isBackward: false,
        anchorKey: 'key1',
        focusKey: 'key1',
      })
    });
  });
});

describe('getFirstBlock', () => {
  const editorState = new RawContentState()
    .addBlock('block1')
    .setKey('key1')
    .addBlock('block2')
    .setKey('key2')
    .addBlock('block3')
    .setKey('key3')
    .toEditorState();
  expect(getFirstBlock(editorState).getKey()).to.equal('key1');
});

describe('getLastBlock', () => {
  const editorState = new RawContentState()
    .addBlock('block1')
    .setKey('key1')
    .addBlock('block2')
    .setKey('key2')
    .addBlock('block3')
    .setKey('key3')
    .toEditorState();
  expect(getLastBlock(editorState).getKey()).to.equal('key3');
});

describe('getLastBlock', () => {
  const editorState = new RawContentState()
    .addBlock('blockLength 14')
    .setKey('block1')
    .addBlock('block2')
    .setKey('block2')
    .addBlock('block3')
    .setKey('block3')
    .toEditorState();
  const length = editorState.getCurrentContent().getFirstBlock().getLength();
  expect(length).to.equal(14);
});

describe('addBlockAfterKey', () => {
  const editorState = new RawContentState()
    .addBlock('Block1')
    .setKey('key1')
    // We will add a new block here
    .addBlock('Block3')
    .setKey('key3')
    .addBlock('Block4')
    .setKey('key4')
    .toEditorState();

  const newBlock = new RawContentState()
    .addBlock('Block2')
    .setKey('key2')
    .toContentState()
    .getFirstBlock();

  const newEditorState = addBlockAfterKey('key1', newBlock, editorState);
  const contentState = newEditorState.getCurrentContent();
  const selection = newEditorState.getSelection();
  const selectionBefore = contentState.getSelectionBefore();
  const selectionAfter = contentState.getSelectionAfter();
  const blockMapSize = newEditorState.getCurrentContent().getBlockMap().size;

  it('it should have blockMap of 4', () => {
    expect(blockMapSize).to.equal(4)
  });

  it('should have added blocks in the right order', () => {
    const blockList = newEditorState.getCurrentContent().getBlockMap().toList();
    expect(blockList.get(0).getKey()).to.equal('key1');
    expect(blockList.get(1).getKey()).to.equal('key2');
    expect(blockList.get(2).getKey()).to.equal('key3');
    expect(blockList.get(3).getKey()).to.equal('key4');
  });

  it('should have a new selection collapsed on the new block', () => {
    expect(selection.toJS()).to.deep.equal({
      anchorOffset: 0,
      focusOffset: 0,
      hasFocus: true,
      isBackward: false,
      anchorKey: 'key2',
      focusKey: 'key2',
    });
  });

  it('selectionAfter should be equal to the new selection', () => {
    expect(selectionAfter.toJS()).to.deep.equal({
      anchorOffset: 0,
      focusOffset: 0,
      hasFocus: true,
      isBackward: false,
      anchorKey: 'key2',
      focusKey: 'key2',
    });
  });

  it('selection before should be equal to the previous selection', () => {
    expect(selectionBefore.toJS()).to.deep.equal({
      anchorKey: 'key1',
      anchorOffset: 0,
      focusKey: 'key1',
      focusOffset: 0,
      hasFocus: false,
      isBackward: false,
    })
  });
});

describe('addBlockBeforeKey', () => {
  const editorState = new RawContentState()
  // We will add a new block here
    .addBlock('Block2')
    .setKey('key2')
    .addBlock('Block3')
    .setKey('key3')
    .addBlock('Block4')
    .setKey('key4')
    .toEditorState();

  const newBlock = new RawContentState()
    .addBlock('Block1')
    .setKey('key1')
    .toContentState()
    .getFirstBlock();

  const newEditorState = addBlockBeforeKey('key2', newBlock, editorState);
  const contentState = newEditorState.getCurrentContent();
  const selection = newEditorState.getSelection();
  const selectionBefore = contentState.getSelectionBefore();
  const selectionAfter = contentState.getSelectionAfter();
  const blockMapSize = newEditorState.getCurrentContent().getBlockMap().size;

  it('it should have blockMap of 4', () => {
    expect(blockMapSize).to.equal(4)
  });

  it('should have added blocks in the right order', () => {
    const blockList = newEditorState.getCurrentContent().getBlockMap().toList();
    expect(blockList.get(0).getKey()).to.equal('key1');
    expect(blockList.get(1).getKey()).to.equal('key2');
    expect(blockList.get(2).getKey()).to.equal('key3');
    expect(blockList.get(3).getKey()).to.equal('key4');
  });

  it('should have a new selection collapsed on the new block', () => {
    expect(selection.toJS()).to.deep.equal({
      anchorOffset: 0,
      focusOffset: 0,
      hasFocus: true,
      isBackward: false,
      anchorKey: 'key1',
      focusKey: 'key1',
    });
  });

  it('selectionAfter should be equal to the new selection', () => {
    expect(selectionAfter.toJS()).to.deep.equal({
      anchorOffset: 0,
      focusOffset: 0,
      hasFocus: true,
      isBackward: false,
      anchorKey: 'key1',
      focusKey: 'key1',
    });
  });

  it('selection before should be equal to the previous selection', () => {
    expect(selectionBefore.toJS()).to.deep.equal({
      anchorKey: 'key2',
      anchorOffset: 0,
      focusKey: 'key2',
      focusOffset: 0,
      hasFocus: false,
      isBackward: false,
    })
  });
});

describe('addBlockDataToSelectedBlocks', () => {
  it('addBlockDataToSelectedBlocks', () => {
    //addBlockDataToSelectedBlocks();
  });

});
describe('addDataToBlockWithKey', () => {
  it('addDataToBlockWithKey', () => {
    //addDataToBlockWithKey();
  });

});
describe('removeDataFromBlockWithKey', () => {
  it('removeDataFromBlockWithKey', () => {
    //removeDataFromBlockWithKey();
  });

});
describe('removeBlockDataFromSelectedBlocks', () => {
  it('removeBlockDataFromSelectedBlocks', () => {
    //removeBlockDataFromSelectedBlocks();
  });

});
describe('splitBlock', () => {
  it('splitBlock', () => {
    //splitBlock();
  });

});
describe('getBlockDataProp', () => {
  it('getBlockDataProp', () => {
    //getBlockDataProp();
  });

});
describe('getBlockStyleRanges', () => {
  it('getBlockStyleRanges', () => {
    //getBlockStyleRanges();
  });

});
describe('getBlockByKey', () => {
  it('getBlockByKey', () => {
    //getBlockByKey();
  });

});
describe('getBlockEntityRanges', () => {
  it('getBlockEntityRanges', () => {
    //getBlockEntityRanges();
  });

});
describe('getBlockLength', () => {
  it('getBlockLength', () => {
    //getBlockLength();
  });
});
describe('removeEmptyBlocks', () => {
});

