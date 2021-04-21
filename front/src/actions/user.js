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

export const editProfile = (id, values) => ({
  type: EDIT_PROFILE,
  id,
  values
});

export const editProfileSuccess = (data) => ({
  type: EDIT_PROFILE_SUCCESS,
  data
});

export const deleteProfile = (id) => ({
  type: DELETE_PROFILE,
  id
});

export const changePassword = (values) => ({
  type: CHANGE_PASSWORD,
  values
});

export const changePasswordSuccess = (data) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  data
});