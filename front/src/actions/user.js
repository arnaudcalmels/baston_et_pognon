import {
  GET_PROFILE, GET_PROFILE_SUCCESS, EDIT_PROFILE, EDIT_PROFILE_SUCCESS, DELETE_PROFILE, CHANGE_PASSWORD, CHANGE_PASSWORD_SUCCESS, 
} from './types';

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data
});

export const editProfile = (id, values, closeFunction) => ({
  type: EDIT_PROFILE,
  id,
  values,
  closeFunction
});

export const editProfileSuccess = (data) => ({
  type: EDIT_PROFILE_SUCCESS,
  data
});

export const deleteProfile = (id, logout, redirect) => ({
  type: DELETE_PROFILE,
  id,
  logout, 
  redirect
});

export const changePassword = (values, closeFunction) => ({
  type: CHANGE_PASSWORD,
  values,
  closeFunction
});

export const changePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  data
});