import { GET_CATEGORIES_SUCCESS, GET_PLACE_SUCCESS } from "../actions/types";

const initialState = {
  categories: [],
  currentPlace: {},
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...oldState,
        categories: action.data
      }

    case GET_PLACE_SUCCESS:
      return {
        ...oldState,
        currentPlace: action.data
      }
  
    default:
      return oldState;
  }
};

export default reducer;