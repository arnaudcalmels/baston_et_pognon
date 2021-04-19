import axios from 'axios';

// actions
import { signUpSuccess, loginSuccess } from '../actions/auth';

import { SIGN_UP, LOGIN } from '../actions/types';


const api = (store) => (next) => (action) => {
  switch (action.type) {
    case SIGN_UP: {
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + 'user/new',
        headers: {
          'Content-Type': 'application/json',
        },
        data: action.values,
      };

      axios(config)
        .then ((response) => {
          store.dispatch(signUpSuccess(response.data)); 
        })
        .catch ((error) => {
          console.log(error)
        });

      break;
    }

    case LOGIN: {
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + 'login_check',
        headers: {
          'Content-Type': 'application/json',
        },
        data: action.values,
      };

      axios(config)
        .then ((response) => {
          store.dispatch(loginSuccess(response.data)); 
        })
        .catch ((error) => {
          console.log(error)
        });

      break;
    }
    
    default:
      next(action);
  }
}

export default api;
