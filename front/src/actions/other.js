import { SET_LOADING_TRUE, SET_LOADING_FALSE } from './types';

export const setLoadingTrue = (entity) => ({
  type: SET_LOADING_TRUE,
  entity
});

export const setLoadingFalse = (entity) => ({
  type: SET_LOADING_FALSE,
  entity
});
