import {
  GET_PROFILE, GET_PROFILE_SUCCESS
} from './types';

export const getProfile = () => ({
  type: GET_PROFILE,
});

export const getProfileSuccess = (data) => ({
  type: GET_PROFILE_SUCCESS,
  data
});
