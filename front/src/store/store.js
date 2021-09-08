import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

// rootReducer = résultat de combineReducers
import rootReducer from '../reducers';

// middlewares
import apiMiddleware from '../middlewares/api';

// persistance du store
const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(apiMiddleware),
));

export const persistor = persistStore(store);
