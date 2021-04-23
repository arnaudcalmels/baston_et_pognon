import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import character from './character';

export default combineReducers({
  auth,
  user,
  character,
});