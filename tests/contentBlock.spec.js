import { expect } from 'chai';
import RawContentState from 'draft-js-raw-content-state';
import {
  getSelectedBlocks,
  getSelectedBlockKeys,
  getBlockByIndex,
  getBlockByKey,
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
  it('removeBlockWithKey', () => {
    //removeBlockWithKey();
  });

});
describe('addBlockAfterBlockKey', () => {
  it('addBlockAfterBlockKey', () => {
    //addBlockAfterBlockKey();
  });

});
describe('addBlockBeforeBlockKey', () => {
  it('addBlockBeforeBlockKey', () => {
    //addBlockBeforeBlockKey();
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

