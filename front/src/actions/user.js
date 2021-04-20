import {
  GET_PROFILE, GET_PROFILE_SUCCESS, EDIT_PROFILE, DELETE_PROFILE
} from './types';

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data
});

export const editProfile = () => ({
  type: EDIT_PROFILE,
});

export const deleteProfile = (id) => ({
  type: DELETE_PROFILE,
  id
});