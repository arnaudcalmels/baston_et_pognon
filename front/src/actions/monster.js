import { NEW_MONSTER, GET_MONSTER, GET_MONSTER_SUCCESS, EDIT_MONSTER, DELETE_MONSTER } from './types';

export const newMonster = (slug, values) => ({
  type: NEW_MONSTER,
  slug,
  values,
});

export const getMonster = (id) => ({
  type: GET_MONSTER,
  id,
});

export const getMonsterSuccess = (data) => ({
  type: GET_MONSTER_SUCCESS,
  data,
});

export const editMonster = (id, values) => ({
  type: EDIT_MONSTER,
  id,
  values,
});

export const deleteMonster = (id) => ({
  type: DELETE_MONSTER,
  id,
});
