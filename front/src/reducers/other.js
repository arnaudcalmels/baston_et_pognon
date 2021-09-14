import { SET_LOADING_TRUE, SET_LOADING_FALSE } from '../actions/types';

const initialState = {
  isLoading: {
    character: false,
    scenario: false,
    place: false,
    monster: false,
  },
}

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case SET_LOADING_TRUE:
      return {
        ...oldState,
        isLoading: {...oldState.isLoading, [action.entity]: true},
      }

    case SET_LOADING_FALSE:
      return {
        ...oldState,
        isLoading: {...oldState.isLoading, [action.entity]: false},
      }
  
    default:
      return oldState
  }
};

export default reducer;