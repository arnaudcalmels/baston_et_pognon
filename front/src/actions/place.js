import {
  GET_CATEGORIES, GET_CATEGORIES_SUCCESS, NEW_PLACE, NEW_PLACE_SUCCESS,
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
