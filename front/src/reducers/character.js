import {
  EDIT_CHARACTER_SUCCESS, GET_CHARACTERS_SUCCESS, NEW_CHARACTER_SUCCESS
} from '../actions/types';

const initialState = {
  characters: [],
};

const reducer = (oldState = initialState, action) => {
  let newState = {...oldState};

  switch (action.type) {
    case GET_CHARACTERS_SUCCESS:
      return {
        ...oldState,
        characters: action.data
      }

    case EDIT_CHARACTER_SUCCESS:
      // on filtre le tableau des personnages en ne gardant que les éléments qui n'ont pas été modifiés
      const filteredCharacters = newState.characters.filter(character => character.id !== action.data.id);
      // on rajoute l'élément modifié puis on trie par id
      filteredCharacters.push(action.data);
      filteredCharacters.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

      newState = {
        ...oldState,
        characters: filteredCharacters,
      }
      return newState

    case NEW_CHARACTER_SUCCESS:
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