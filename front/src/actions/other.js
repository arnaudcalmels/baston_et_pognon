import { SET_LOADING_TRUE, SET_LOADING_FALSE } from './types';

export const setLoadingTrue = () => ({
  type: SET_LOADING_TRUE,
});

export const setLoadingFalse = () => ({
  type: SET_LOADING_FALSE,
});
