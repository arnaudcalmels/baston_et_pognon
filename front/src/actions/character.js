import { 
  GET_CHARACTERS, GET_CHARACTERS_SUCCESS, NEW_CHARACTER, NEW_CHARACTER_SUCCESS, DELETE_CHARACTER, EDIT_CHARACTER, EDIT_CHARACTER_SUCCESS, 
} from './types';

export const getCharacters = () => ({
  type: GET_CHARACTERS,
});

export const getCharactersSuccess= (data) => ({
  type: GET_CHARACTERS_SUCCESS,
  data
});

export const newCharacter = (values) => ({
  type: NEW_CHARACTER,
  values
});

export const newCharacterSuccess = (data) => ({
  type: NEW_CHARACTER_SUCCESS,
  data
});


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
