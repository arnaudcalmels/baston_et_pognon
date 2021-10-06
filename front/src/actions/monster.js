import { NEW_MONSTER, GET_MONSTER, GET_MONSTER_SUCCESS, EDIT_MONSTER, DELETE_MONSTER, DELETE_MONSTER_SUCCESS } from './types';

export const newMonster = (slug, values, closeFunction, context) => ({
  type: NEW_MONSTER,
  slug,
  values,
  closeFunction,
  context
});

export const getMonster = (id, context) => ({
  type: GET_MONSTER,
  id,
  context
});

export const getMonsterSuccess = (data, context) => ({
  type: GET_MONSTER_SUCCESS,
  data,
  context
});

export const editMonster = (id, values, closeFunction, context, placeId) => ({
  type: EDIT_MONSTER,
  id,
  values,
  closeFunction, 
  context,
  placeId
});

export const deleteMonster = (id, closeFunction, context, placeId) => ({
  type: DELETE_MONSTER,
  id,
  closeFunction,
  context, 
  placeId
});

export const deleteMonsterSuccess = (context) => ({
  type: DELETE_MONSTER_SUCCESS,
  context
});
