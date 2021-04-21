import {
  GET_PROFILE, GET_PROFILE_SUCCESS, EDIT_PROFILE, EDIT_PROFILE_SUCCESS, DELETE_PROFILE
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