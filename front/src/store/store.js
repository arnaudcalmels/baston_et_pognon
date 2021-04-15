import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// rootReducer = résultat de combineReducers
import rootReducer from '../reducers';

// on crée le store
const store = createStore(
  rootReducer,
  composeWithDevTools(),
);

export default store;
