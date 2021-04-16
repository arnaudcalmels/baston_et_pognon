import {
  OPEN_REGISTER_MODAL, OPEN_LOGIN_MODAL, CLOSE_MODAL,
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
