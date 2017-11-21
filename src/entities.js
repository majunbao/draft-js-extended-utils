import { EditorState, Modifier, CharacterMetadata } from 'draft-js';
import { getSelectedBlocksAsList } from './contentBlock';
import { sliceSelectedBlockCharacters, mapSelectedCharacters } from './characters';

const selectionHasEntityType = entityType => editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  // Handle a collapsed selection
  if (selection.isCollapsed()) {
    const startOffset = selection.getStartOffset();
    const startKey = selection.getStartKey();
    const entityKey = contentState
      .getBlockForKey(startKey)
      .getEntityAt(startOffset);

    if (!entityKey) {
      return false;
    }

    return contentState.getEntity(entityKey).getType() === entityType;
  }

  const selectedBlocks = getSelectedBlocksAsList(editorState);

  // Handle a non-collapsed selection
  return selectedBlocks
    .some(block => {
      return sliceSelectedBlockCharacters(block, selection)
        .chars
        .some(character => {
          const entity = character.getEntity();

          if (!entity) {
            return false;
          }

          const entityInstance = contentState.getEntity(entity);

          return entityInstance.getType() === entityType;
        });
    });
};

const findEntitiesOfType = type => (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(
    character => {
      const entityKey = character.getEntity();
      if (!entityKey) {
        return false;
      }

      return contentState.getEntity(entityKey).getType() === type;
    },
    callback,
  );
};

const entityKeyHasType = (contentState, key, entityType = []) => {
  if (!key) {
    return false;
  }

  return [].concat(entityType).some(
    type => type === contentState.getEntity(key).getType());
};

const entityKeyData = (contentState, entityKey) => {
  if (!entityKey) {
    return null;
  }

  return contentState.getEntity(entityKey).getData();
};

const entityKeyType = (contentState, entityKey) => {
  if (!entityKey) {
    return null;
  }

  return contentState.getEntity(entityKey).getType();
};

const findFirstEntityOfTypeInRange = entityType => editorState => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedBlocks = getSelectedBlocksAsList(editorState);

  let found = {};
  selectedBlocks.some(block => {
    const { offset, blockKey } = sliceSelectedBlockCharacters(block, selection);
    let charOffset = offset.start - 1;
    // quality check is < and not <= because we decreased the offset by 1
    // eslint-disable-next-line no-plusplus
    while (charOffset++ < offset.end) {
      const entityKey = block.getEntityAt(charOffset);

      if (!entityKey || !entityKeyHasType(contentState, entityKey, entityType)) {
        // eslint-disable-next-line no-continue
        continue;
      }

      const data = entityKeyData(contentState, entityKey);
      const type = entityKeyType(contentState, entityKey);
      found = { blockKey, charOffset, data, type, entityKey, offset };

      return true;
    }

    return false;
  });

  return found;
};

const createEntity = (editorState, entity, data = {}) => {
  const mutability = entity.mutability;
  const type = entity.type;
  const entityData = data || entity.data;
  const contentStateWithEntity = editorState
    .getCurrentContent()
    .createEntity(type, mutability, entityData);
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newContentState = Modifier.applyEntity(
    contentStateWithEntity,
    editorState.getSelection(),
    entityKey,
  );

  return EditorState.push(editorState, newContentState);
};

const mergeEntityData = (editorState, entityKey, newObj) => {
  const contentState = editorState.getCurrentContent();
  const newContentState = contentState.mergeEntityData(entityKey, newObj);

  return EditorState.push(editorState, newContentState, 'apply-entity');
};

const removeCharEntityOfType = (types = []) => (character, editorState) => {
  const entityKey = character.getEntity();

  if (!entityKey) {
    return character;
  }

  const hasEntity = []
    .concat(types)
    .some(type => entityKeyHasType(editorState.getCurrentContent(), entityKey, type));

  if (hasEntity) {
    return CharacterMetadata.applyEntity(character, null);
  }

  return character;
};

// Removes an entity with the type from the selection, as opposed to removing all entities.
const removeEntity = (editorState, types = []) => {
  const selection = editorState.getSelection();
  if (!selection.isCollapsed()) {
    return mapSelectedCharacters(removeCharEntityOfType(types))(editorState);
  }

  const contentState = editorState.getCurrentContent();
  const offset = selection.getStartOffset();
  const startKey = selection.getStartKey();
  const blockLength = contentState.getBlockForKey(startKey).getLength();

  if (!blockLength || !(offset < blockLength)) {
    return editorState;
  }

  const newEditorState = EditorState.acceptSelection(
    editorState,
    editorState.getSelection().merge({
      anchorOffset: offset,
      focusOffset: offset + 1,
    }),
  );

  const newerEditorState = mapSelectedCharacters(removeCharEntityOfType(types))(newEditorState);

  // we want to make a selection back to what it originally was so we can apply
  return EditorState.forceSelection(newerEditorState, newerEditorState.getSelection().merge({
    focusOffset: offset,
  }));
};

const removeEntityOfType = (types = []) => editorState => {
  return removeEntity(editorState, types);
};

const returnStartOffset = (isBackward, offset, key) => {
  if (isBackward) {
    return {
      focusOffset: offset,
      focusKey: key,
    };
  }

  return {
    anchorOffset: offset,
    anchorKey: key,
  };
};

const findEntityStartOffsetMatchingTypes = (editorState, types = []) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const startKey = selection.getStartKey();
  const startOffset = selection.getStartOffset();
  const contentBlock = contentState.getBlockForKey(startKey);
  const entityKey = contentBlock.getEntityAt(startOffset);
  const isBackward = selection.isBackward;

  // first character offset does not have an entity key
  if (!entityKey) {
    return returnStartOffset(isBackward, startOffset, startKey);
  }

  // check that the type of the entity is valid
  if (!entityKeyHasType(contentState, entityKey, types)) {
    return returnStartOffset(isBackward, startOffset, startKey);
  }

  // first character offset does have an entity key and we want to check if the
  // previous char has the same an entity key
  const characters = contentBlock.getCharacterList().slice(0, startOffset).reverse();
  const { offset } = characters.reduce((acc, character, index) => {
    // entity key was not the same
    if (!acc.same) {
      return acc;
    }

    // entity is the same
    if (character.getEntity() === entityKey) {
      return {
        same: true,
        offset: (characters.size - 1) - index,
      };
    }

    // entity is not the same
    return { same: false, offset: acc.offset };
  }, { same: true, offset: startOffset });

  return returnStartOffset(isBackward, offset, startKey);
};

const returnEndOffset = (isBackward, offset, key) => {
  if (isBackward) {
    return {
      anchorOffset: offset,
      anchorKey: key,
    };
  }

  return {
    focusOffset: offset,
    focusKey: key,
  };
};

const findEntityEndOffsetMatchingTypes = (editorState, types = []) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const endKey = selection.getEndKey();
  const endOffset = selection.getEndOffset();
  const contentBlock = contentState.getBlockForKey(endKey);
  const entityKey = contentBlock.getEntityAt(endOffset);
  const isBackward = selection.isBackward;

  // first character offset does not have an entity key
  if (!entityKey) {
    return returnEndOffset(isBackward, endOffset, endKey);
  }

  // check that the type of the entity is valid
  if (!entityKeyHasType(contentState, entityKey, types)) {
    return returnEndOffset(isBackward, endOffset, endKey);
  }

  // first character offset does have an entity key and we want to check if the
  // next char has the same an entity key
  const characters = contentBlock.getCharacterList().slice(endOffset, contentBlock.getLength());
  const newOffset = characters.reduce((acc, character, index) => {
    // entity key was not the same
    if (!acc.same) {
      return acc;
    }

    // entity is the same
    if (character.getEntity() === entityKey) {
      return {
        same: true,
        offset: endOffset + index,
      };
    }

    // entity is not the same
    return { same: false, offset: acc.offset };
  }, { same: true, offset: endOffset });

  return returnEndOffset(isBackward, newOffset.offset + 1, endKey);
};

const changeSelectionToEntityTypeInRange = (type = []) => editorState => {
  const types = [].concat(type);
  const startOffsets = findEntityStartOffsetMatchingTypes(editorState, types);
  const endOffsets = findEntityEndOffsetMatchingTypes(editorState, types);

  const newSelection = {
    ...startOffsets,
    ...endOffsets,
  };
  const newOffsets = editorState.getSelection().merge(newSelection);

  return EditorState.acceptSelection(editorState, newOffsets, 'apply-selection');
};
