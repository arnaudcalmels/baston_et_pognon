import { GET_MONSTER_SUCCESS, DELETE_MONSTER_SUCCESS  } from "../actions/types";

const initialState = {
  currentWanderingMonster: {},
  currentMonsterInPlace: {}
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_MONSTER_SUCCESS:
      return {
        ...oldState,
        [action.context]: action.data
      }
    case DELETE_MONSTER_SUCCESS:
      return {
        ...oldState,
        [action.context]: {}
      }
  
    default:
      return oldState;
  }
};

export default reducer;