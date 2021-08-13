import {
  OPEN_REGISTER_MODAL, OPEN_LOGIN_MODAL, CLOSE_MODAL, SIGN_UP, SIGN_UP_SUCCESS, LOGIN, LOGIN_SUCCESS, LOGOUT,
} from './types';

export const isRegisterModalOpen = () => ({
  type: OPEN_REGISTER_MODAL,
});

export const isLoginModalOpen = () => ({
  type: OPEN_LOGIN_MODAL,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const signUp = (values) => ({
  type: SIGN_UP,
  values
});

export const signUpSuccess = (data) => ({
  type: SIGN_UP_SUCCESS,
  data
});

export const login = (values) => ({
  type: LOGIN,
  values
});

export const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data
});

export const logout = () => ({
  type: LOGOUT,
});
