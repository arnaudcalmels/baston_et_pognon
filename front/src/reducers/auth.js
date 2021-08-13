import { 
  OPEN_REGISTER_MODAL, OPEN_LOGIN_MODAL, CLOSE_MODAL, SIGN_UP_SUCCESS, LOGIN_SUCCESS,  
} from "../actions/types";

const initialState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
  id: '',
  email: '',
  pseudo: '',
  avatar: '',
  token: ''

};

const reducer = (oldState = initialState, action) => {
  switch (action.type) {
    case OPEN_REGISTER_MODAL: 
      return {
        ...oldState,
        isRegisterModalOpen: true
      }
    case OPEN_LOGIN_MODAL: 
      return {
        ...oldState,
        isLoginModalOpen: true
      }
    case CLOSE_MODAL: 
      return {
        ...oldState,
        isRegisterModalOpen: false,
        isLoginModalOpen: false
      }
    case SIGN_UP_SUCCESS: 
      return {
        ...oldState,
        id: action.data.id,
        email: action.data.email,
        pseudo: action.data.pseudo,
        avatar: action.data.avatar
      }
    case LOGIN_SUCCESS: 
      return {
        ...oldState,
        token: action.data.token,
      }
    // case LOGOUT:
    //   return {
    //     ...oldState,
    //     token: ''
    //   }
    default:
      return oldState
  }

};

export default reducer;
