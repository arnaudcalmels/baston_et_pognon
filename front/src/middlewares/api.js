import axios from 'axios';

// actions
import { signUpSuccess, loginSuccess } from '../actions/auth';
import { getProfile, getProfileSuccess } from '../actions/user';

import { SIGN_UP, LOGIN, GET_PROFILE, DELETE_PROFILE, } from '../actions/types';


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
          store.dispatch(getProfile());
          console.log(response);
        })
        .catch ((error) => {
          console.log(error)
        });

      break;
    }

    case GET_PROFILE: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/user/profile',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getProfileSuccess(response.data));
        console.log(response);
      })
      .catch ((error) => {
        console.log(error)
      });

      break;
    }
    
    case DELETE_PROFILE: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_URL_API + `api/user/delete/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        console.log('Suppression effectuée');
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
