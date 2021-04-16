import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// rootReducer = résultat de combineReducers
import rootReducer from '../reducers';

// middlewares
import apiMiddleware from '../middlewares/api';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(apiMiddleware),
  ),
);

export default store;
