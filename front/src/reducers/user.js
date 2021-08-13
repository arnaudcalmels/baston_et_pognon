import {
  GET_PROFILE_SUCCESS, EDIT_PROFILE_SUCCESS, 
} from '../actions/types';

const initialState = {
  id: '',
  email: '',
  pseudo: '',
  avatar: '',
}

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...oldState,
        id: action.data.id,
        email: action.data.email,
        pseudo: action.data.pseudo,
        avatar: action.data.avatar
      }
    case EDIT_PROFILE_SUCCESS:
      return {
        ...oldState,
        email: action.data.email,
        pseudo: action.data.pseudo,
        avatar: action.data.avatar
      }
  
    default:
      return oldState
  }
};

export default reducer;
