[![Build Status](https://travis-ci.org/webdeveloperpr/draft-js-raw-content-state.svg?branch=master)](https://travis-ci.org/webdeveloperpr/draft-js-raw-content-state)
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

### character
- [x] mapSelectedCharacters

### contentBlock
- [ ] removeBlockWithKey
- [ ] addBlockAfterBlockKey
- [ ] addBlockBeforeBlockKey
- [ ] addBlockDataToSelectedBlocks
- [ ] addDataToBlockWithKey
- [ ] removeDataFromBlockWithKey
- [ ] removeSelectedBlocks
- [ ] removeBlockDataFromSelectedBlocks
- [ ] splitBlock
- [ ] changeBlockType
- [ ] getSelectedBlocks
- [ ] getSelectedBlockKeys
- [ ] getBlockDataProp
- [ ] getRangesForInlineStyle
- [ ] getBlockByIndex
- [ ] getBlockByKey
- [ ] getFirstBlock
- [ ] getLastBlock
- [ ] getBlockEntityRanges
- [ ] getBlockLength
- [ ] removeEmptyBlocks
- [ ] changeBlockDepth
- [ ] increaseBlockDepth
- [ ] decreaseBlockDepth
- [ ] getStyleRanges
- [ ] getStyleRangesWhere
- [ ] getEntityRanges
- [ ] getEntityRangesWhere

#### editorState
- [x] setUndo
- [x] getUndoStack
- [x] getRedoStack

### contentState
- [x] getBlockMap
- [x] getSelectionBefore
- [x] getSelectionAfter 

### selection
- [ ] selectionHasStyles
- [x] collapsedOnEndOffset
- [x] collapsedOnStartOffset
- [x] selectAllBlocks
- [ ] selectFirstEntityOfTypeInRange
- [ ] findFirstEntityOfTypeInRange
- [ ] selectFirstOverlappingEntitiesOfTypeInRange
- [ ] selectionHasEntityType
- [x] mergeSelection
- [x] getSelection

### entity
- [ ] entityKeyData
- [ ] entityKeyType
- [ ] firstEntityOfTypeInRange
- [ ] createEntity
- [ ] mergeEntityData
- [ ] removeEntity
- [ ] removeEntityOfType
- [ ] selectionHasEntityType

#### data
- [x] toRaw
- [x] toRawString
- [x] fromRaw
- [x] logRaw

## Support

Please [open an issue](https://github.com/webdeveloperpr/draft-js-raw-content-state/issues) for support.

## Contributing

Feel free to fork this project, make changes and submit pull requests.
