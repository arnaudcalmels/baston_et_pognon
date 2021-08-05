import {
  GET_SCENARIOS_SUCCESS, NEW_SCENARIO_SUCCESS, EDIT_SCENARIO_SUCCESS, SET_ITEM, 
} from '../actions/types';

const initialState = {
  scenarios: [],
  currentItem: {}
};

const reducer = (oldState = initialState, action) => {
  let newState = {...oldState};

  switch (action.type) {
    case GET_SCENARIOS_SUCCESS:
      return {
        ...oldState,
        scenarios: action.data
      }
    case NEW_SCENARIO_SUCCESS:
      return {
        ...oldState,
        scenarios: [...oldState.scenarios, action.data]
      }
    case EDIT_SCENARIO_SUCCESS:
      // on filtre le tableau des scénarios en ne gardant que les éléments qui n'ont pas été modifiés
      const filteredScenarios = newState.scenarios.filter(scenario => scenario.id !== action.data.id);
      // on rajoute l'élément modifié puis on trie par id
      filteredScenarios.push(action.data);
      filteredScenarios.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));

      newState = {
        ...oldState,
        scenarios: filteredScenarios,
      }
      return newState
      
    case SET_ITEM:
      return {
        ...oldState,
        currentItem: action.data
      }
    default: 
      return oldState;
  }
};

export default reducer;