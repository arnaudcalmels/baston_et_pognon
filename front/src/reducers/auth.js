import { 
  OPEN_REGISTER_MODAL, OPEN_LOGIN_MODAL, CLOSE_MODAL,  
} from "../actions/types";

const initialState = {
  isRegisterModalOpen: false,
  isLoginModalOpen: false,
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
    default:
      return oldState
  }

};

export default reducer;
