import { NEW_MONSTER } from './types';

export const newMonster = (slug, values) => ({
  type: NEW_MONSTER,
  slug,
  values,
});
