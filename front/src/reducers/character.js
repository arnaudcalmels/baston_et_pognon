import {
  EDIT_CHARACTER_SUCCESS
} from '../actions/types';

const initialState = {
  id: '',
  name: '',
  sex: '',
  level: '',
  profession: [],
  race: [],
  inventory: []

};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case EDIT_CHARACTER_SUCCESS:
      return {
        ...oldState,
        name: action.data.name,
        sex: action.data.sex,
        profession: action.data.profession,
        race: action.data.race,      
      }
    default: 
      return oldState;
  }
};

export default reducer;