import {
  EDIT_CHARACTER_SUCCESS, GET_CHARACTERS_SUCCESS, NEW_CHARACTER_SUCCESS
} from '../actions/types';

const initialState = {
  characters: [],
  currentId: 10,
};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS_SUCCESS:
      return {
        ...oldState,
        characters: action.data
      }

    case EDIT_CHARACTER_SUCCESS:
      return {
        ...oldState,
        // characters: action.data
      }

    case NEW_CHARACTER_SUCCESS:
      let newState = {...oldState};
      // ajout du nouveau personnage dans le tableau des personnages
      newState = {
        ...oldState,
        characters: [...oldState.characters, action.data]
      }
      return newState
  
    default: 
      return oldState;
  }
};

export default reducer;