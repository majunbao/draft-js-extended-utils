import { expect } from 'chai';
import { CharacterMetadata } from 'draft-js';
import RawContentState from 'draft-js-raw-content-state';
import { mapSelectedCharacters } from "../src/characters";
import { findBlockStyleRanges } from "../src/contentBlock";

describe('mapSelectedCharacters', () => {
  it('should map over selected characters and apply a callback', () => {
    const editorState = new RawContentState()
      .addBlock('block1')
      .anchorKey(0)
      .focusKey(6)
      .addBlock('block2')
      .addBlock('block3')
      .toEditorState();

    const callback = char => {
      return CharacterMetadata.applyStyle(char, 'BOLD')
    };

    const newEditorState = mapSelectedCharacters(callback)(editorState);
    const firstBlock = newEditorState
      .getCurrentContent()
      .getFirstBlock();

    const ranges = findBlockStyleRanges(firstBlock, 'BOLD');
    expect(ranges).to.deep.equal([{ start: 0, end: 6 }]);
  });
});
