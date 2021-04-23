import { 
  DELETE_CHARACTER,
} from './types';

export const deleteCharacter = (id) => ({
  type: DELETE_CHARACTER,
  id
});