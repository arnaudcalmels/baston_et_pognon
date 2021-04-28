import {
  GET_SCENARIOS_SUCCESS, 
} from '../actions/types';

const initialState = {
  scenarios: [],
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_SCENARIOS_SUCCESS:
      return {
        ...oldState,
        scenarios: action.data
      }
  
    default: 
      return oldState;
  }
};

export default reducer;