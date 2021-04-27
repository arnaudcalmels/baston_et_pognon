import { combineReducers } from 'redux';

import auth from './auth';
import user from './user';
import character from './character';

import { 
  LOGOUT, 
} from "../actions/types";

const appReducer = combineReducers({
  auth,
  user,
  character,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;