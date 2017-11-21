[![Build Status](https://travis-ci.org/webdeveloperpr/draft-js-extended-utils.svg?branch=master)](https://travis-ci.org/webdeveloperpr/draft-js-extended-utils)
# draft-js-extended-utils

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

```sh
  npm i draft-js-extended-utils --save
```

## Usage

```javascript
import utils from 'draft-js-extended-utils';
```

### API

### contentBlock
- [x] getBlockByIndex
- [x] getSelectedBlocks
- [x] getSelectedBlockKeys
- [x] getBlockByKey
- [x] getFirstBlock 
- [x] getLastBlock
- [x] getBlockLength
- [x] addBlockAfterKey
- [x] addBlockBeforeKey
- [x] removeBlockWithKey
- [x] changeSelectionBlockDepth
- [x] increaseBlockDepth
- [x] decreaseBlockDepth
- [x] setSelectedBlockData
- [x] mergeSelectedBlockData
- [ ] changeBlockType
- [ ] removeSelectedBlocks
- [ ] splitBlock
- [ ] getBlockDataProp
- [ ] getRangesForInlineStyle
- [ ] getBlockEntityRanges
- [ ] removeEmptyBlocks
- [ ] getStyleRanges
- [ ] getStyleRangesWhere
- [ ] getEntityRanges
- [ ] getEntityRangesWhere

### selection
- [ ] selectionHasStyles
- [ ] selectionHasEntityType
- [x] collapsedOnEndOffset
- [x] collapsedOnStartOffset
- [x] selectAllBlocks
- [ ] selectFirstEntityOfTypeInRange
- [ ] findFirstEntityOfTypeInRange
- [ ] selectFirstOverlappingEntitiesOfTypeInRange
- [x] mergeSelection
- [x] getSelection

### entity
- [ ] createEntity
- [ ] getEntityKeyData
- [ ] entityKeyType
- [ ] getEntityKeyRange
- [ ] removeEntity
- [ ] mergeEntityData
- [ ] removeEntityOfType
- [ ] firstEntityOfTypeInRange
- [ ] selectionHasEntityType

#### editorState
- [x] setUndo
- [x] getUndoStack
- [x] getRedoStack

### contentState
- [x] getBlockMap
- [x] getSelectionBefore
- [x] getSelectionAfter 

### character
- [x] mapSelectedCharacters

#### data
- [x] toRaw
- [x] toRawString
- [x] fromRaw
- [x] logRaw

## Support

Please [open an issue](https://github.com/webdeveloperpr/draft-js-extended-utils/issues) for support.

## Contributing

Feel free to fork this project, make changes and submit pull requests.
