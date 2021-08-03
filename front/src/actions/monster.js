import { NEW_MONSTER, GET_MONSTER, GET_MONSTER_SUCCESS, EDIT_MONSTER, DELETE_MONSTER } from './types';

export const newMonster = (slug, values, closeFunction) => ({
  type: NEW_MONSTER,
  slug,
  values,
  closeFunction
});

export const getMonster = (id) => ({
  type: GET_MONSTER,
  id,
});

export const getMonsterSuccess = (data) => ({
  type: GET_MONSTER_SUCCESS,
  data,
});

export const editMonster = (id, values, closeFunction) => ({
  type: EDIT_MONSTER,
  id,
  values,
  closeFunction
});

export const deleteMonster = (id, closeFunction) => ({
  type: DELETE_MONSTER,
  id,
  closeFunction
});
