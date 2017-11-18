## character fns
- [x] mapSelectedCharacters

## contentBlock fns
removeBlockWithKey
addBlockAfterBlockKey
addBlockBeforeBlockKey
addBlockDataToSelectedBlocks
addDataToBlockWithKey
removeDataFromBlockWithKey
removeSelectedBlocks
removeBlockDataFromSelectedBlocks
splitBlock
changeBlockType
getSelectedBlocks
getSelectedBlockKeys
getBlockDataProp
- [] getRangesForInlineStyle
getBlockByIndex
getBlockByKey
getFirstBlock
getLastBlock
getBlockEntityRanges
getBlockLength
removeEmptyBlocks
changeBlockDepth
increaseBlockDepth
decreaseBlockDepth
getStyleRanges
getStyleRangesWhere
getEntityRanges
getEntityRangesWhere

## data conversion
toRaw
fromRaw

## editorState fns
- setUndo
- getBlockMap
- setEditorState

// contentState fns
- getBlockMap

// selection fns
selectionHasStyles
- [x] collapsedOnEndOffset
- [x] collapsedOnStartOffset
- [x] selectAllBlocks
selectEntityInRange
selectOverlappingEntities
selectionHasEntityType
mergeSelection
getSelection

// entity fns
entityKeyData
entityKeyType
firstEntityOfTypeInRange
createEntity
mergeEntityData
removeEntity
removeEntityOfType
selectionHasEntityType
