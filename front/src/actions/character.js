import { 
  GET_CHARACTERS, GET_CHARACTERS_SUCCESS, NEW_CHARACTER, NEW_CHARACTER_SUCCESS, DELETE_CHARACTER, EDIT_CHARACTER, EDIT_CHARACTER_SUCCESS, GET_PROFESSIONS, GET_PROFESSIONS_SUCCESS, GET_RACES, GET_RACES_SUCCESS
} from './types';

export const getCharacters = () => ({
  type: GET_CHARACTERS,
});

export const getCharactersSuccess= (data) => ({
  type: GET_CHARACTERS_SUCCESS,
  data
});

export const newCharacter = (values, redirect) => ({
  type: NEW_CHARACTER,
  values, 
  redirect
});

export const newCharacterSuccess = (data) => ({
  type: NEW_CHARACTER_SUCCESS,
  data
});


export const deleteCharacter = (id, redirect) => ({
  type: DELETE_CHARACTER,
  id,
  redirect
});

export const editCharacter = (id, values, closeFunction, redirect) => ({
  type: EDIT_CHARACTER,
  id, 
  values,
  closeFunction,
  redirect
});

export const editCharacterSuccess = (data) => ({
  type: EDIT_CHARACTER_SUCCESS,
  data
});

export const getProfessions = () => ({
  type: GET_PROFESSIONS,
});

export const getProfessionsSuccess= (data) => ({
  type: GET_PROFESSIONS_SUCCESS,
  data
});

export const getRaces = () => ({
  type: GET_RACES,
});

export const getRacesSuccess= (data) => ({
  type: GET_RACES_SUCCESS,
  data
});
