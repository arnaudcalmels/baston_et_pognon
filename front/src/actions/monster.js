import { NEW_MONSTER, GET_MONSTER, GET_MONSTER_SUCCESS } from './types';

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
