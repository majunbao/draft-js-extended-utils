import { EditorState } from 'draft-js';
import { Map } from 'immutable';

// This functionality has been taken from draft-js and modified for re-usability purposes.
// Maps over the selected characters, and applies a function to each character.
// Characters are of type CharacterMetadata.
// visit: https://draftjs.org/docs/api-reference-character-metadata.html#content
// to see which operations can be performed on characters.
// your callback function must return the characters back so they can be merge back
// into the ContentBlock
export const mapSelectedCharacters = callback => editorState => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const blockMap = contentState.getBlockMap();
  const startKey = selectionState.getStartKey();
  const startOffset = selectionState.getStartOffset();
  const endKey = selectionState.getEndKey();
  const endOffset = selectionState.getEndOffset();

  const newBlocks = blockMap.skipUntil((_, k) => {
    return k === startKey;
  }).takeUntil((_, k) => {
    return k === endKey;
  }).concat(Map([[endKey, blockMap.get(endKey)]])).map((block, blockKey) => {
    let sliceStart;
    let sliceEnd;

    // sliceStart -> where the selection starts
    // endSlice -> Where the selection ends

    // Only 1 block selected
    if (startKey === endKey) {
      sliceStart = startOffset;
      sliceEnd = endOffset;
      // Gets the selected characters of the block when multiple blocks are selected.
    } else {
      sliceStart = blockKey === startKey ? startOffset : 0;
      sliceEnd = blockKey === endKey ? endOffset : block.getLength();
    }

    // Get the characters of the current block
    let chars = block.getCharacterList();
    let current;
    while (sliceStart < sliceEnd) {
      current = chars.get(sliceStart);
      const newChar = callback(current, editorState);
      chars = chars.set(sliceStart, newChar);
      sliceStart += 1;
    }

    return block.set('characterList', chars);
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.merge(newBlocks),
    selectionBefore: selectionState,
    selectionAfter: selectionState,
  });

  return EditorState.push(editorState, newContentState, 'change-inline-style');
};

export const sliceSelectedBlockCharacters = (block, selection) => {
  const startOffset = selection.getStartOffset();
  const endOffset = selection.getEndOffset();
  const startKey = selection.getStartKey();
  const endKey = selection.getEndKey();
  const blockKey = block.getKey();

  // Only 1 block selected
  if (blockKey === startKey && blockKey === endKey) {
    return {
      blockKey: block.getKey(),
      offset: { start: startOffset, end: endOffset },
      chars: block.getCharacterList().slice(startOffset, endOffset),
    };
  }

  // Multiple blocks selected, iterating first block
  if (blockKey === startKey) {
    return {
      blockKey: block.getKey(),
      offset: { start: startOffset, end: block.getLength() },
      chars: block.getCharacterList().slice(startOffset, block.getLength()),
    };
  }

  // Multiple blocks selected, iterating over last block
  if (blockKey === endOffset) {
    return {
      blockKey: block.getKey(),
      offset: { start: 0, end: endOffset },
      chars: block.getCharacterList().slice(0, endOffset),
    };
  }

  // Going over the middle block get all selected characters
  return {
    blockKey: block.getKey(),
    offset: { start: startOffset, end: endOffset },
    chars: block.getCharacterList().slice(startOffset, endOffset),
  };
};
