import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../actions/types';

const initialState = {
  isLoading: false,
}

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return {
        ...oldState,
        isLoading: true,
      }

    case SET_LOADING_FALSE:
      return {
        ...oldState,
        isLoading: false,
      }
  
    default:
      return oldState
  }
};

export default reducer;