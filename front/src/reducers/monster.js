import { GET_MONSTER_SUCCESS  } from "../actions/types";

const initialState = {
  currentMonster : {}
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_MONSTER_SUCCESS:
      return {
        ...oldState,
        currentMonster: action.data
      }

    default:
      return oldState;
  }
};

export default reducer;