import { 
  DELETE_CHARACTER, EDIT_CHARACTER, EDIT_CHARACTER_SUCCESS
} from './types';

export const deleteCharacter = (id) => ({
  type: DELETE_CHARACTER,
  id
});

export const editCharacter = (id, values) => ({
  type: EDIT_CHARACTER,
  id, 
  values
});

export const editCharacterSuccess = (data) => ({
  type: EDIT_CHARACTER_SUCCESS,
  data
});
