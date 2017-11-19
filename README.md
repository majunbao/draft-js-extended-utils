[![Build Status](https://travis-ci.org/webdeveloperpr/draft-js-raw-utils.svg?branch=master)](https://travis-ci.org/webdeveloperpr/draft-js-utils)
# draft-js-utils

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

```sh
  npm i draft-js-utils --save
```

## Usage

```javascript
import utils from 'draft-js-utils';
```

### API

### contentBlock
- [x] getBlockByIndex
- [x] getSelectedBlocks
- [x] getSelectedBlockKeys
- [x] getBlockByKey
- [x] removeBlockWithKey
- [x] getFirstBlock 
- [x] getLastBlock
- [x] getBlockLength
- [ ] addBlockAfterKey
- [ ] addBlockBeforeKey
- [T] changeBlockDepth
- [ ] changeBlockType
- [ ] addDataToSelectedBlocks
- [ ] addDataToBlockWithKey
- [ ] removeDataFromBlockWithKey
- [ ] removeSelectedBlocks
- [ ] removeBlockDataFromSelectedBlocks
- [ ] splitBlock
- [ ] getBlockDataProp
- [ ] getRangesForInlineStyle
- [ ] getBlockEntityRanges
- [ ] removeEmptyBlocks
- [ ] increaseBlockDepth
- [ ] decreaseBlockDepth
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

Please [open an issue](https://github.com/webdeveloperpr/draft-js-utils/issues) for support.

## Contributing

Feel free to fork this project, make changes and submit pull requests.
