import { GET_CATEGORIES_SUCCESS } from "../actions/types";

const initialState = {
  categories: [],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS:
      return {
        ...oldState,
        categories: action.data
      }

    default:
      return oldState;
  }
};

export default reducer;