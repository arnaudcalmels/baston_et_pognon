import {
  GET_CATEGORIES, GET_CATEGORIES_SUCCESS, NEW_PLACE, NEW_PLACE_SUCCESS, GET_PLACE, GET_PLACE_SUCCESS, EDIT_PLACE, DELETE_PLACE, 
} from './types';

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = (data) => ({
  type: GET_CATEGORIES_SUCCESS,
  data,
});

export const newPlace = (values) => ({
  type: NEW_PLACE,
  values,
});

export const newPlaceSuccess = (data) => ({
  type: NEW_PLACE_SUCCESS,
  data,
});

export const getPlace = (id) => ({
  type: GET_PLACE,
  id,
});

export const getPlaceSuccess = (data) => ({
  type: GET_PLACE_SUCCESS,
  data,
});

export const editPlace = (id, values, closeFunction) => ({
  type: EDIT_PLACE,
  id,
  values,
  closeFunction
});

export const deletePlace = (id, closeFunction) => ({
  type: DELETE_PLACE,
  id,
  closeFunction
});
