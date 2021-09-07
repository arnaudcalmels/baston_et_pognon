import {
  GET_CATEGORIES, GET_CATEGORIES_SUCCESS, NEW_PLACE, GET_PLACE, GET_PLACE_SUCCESS, EDIT_PLACE, DELETE_PLACE, DELETE_PLACE_SUCCESS
} from './types';

export const getCategories = () => ({
  type: GET_CATEGORIES,
});

export const getCategoriesSuccess = (data) => ({
  type: GET_CATEGORIES_SUCCESS,
  data,
});

export const newPlace = (values, closeFunction) => ({
  type: NEW_PLACE,
  values,
  closeFunction
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

export const deletePlaceSuccess = () => ({
  type: DELETE_PLACE_SUCCESS,
});
