import axios from 'axios';

import { setErrorToasts, setSuccessToast } from '../utils/toasts';

// actions
import { signUpSuccess, loginSuccess } from '../actions/auth';
import { editProfileSuccess, getProfile, getProfileSuccess, } from '../actions/user';
import { 
  SIGN_UP, LOGIN, GET_PROFILE, DELETE_PROFILE, EDIT_PROFILE, CHANGE_PASSWORD, DELETE_CHARACTER,
 } from '../actions/types';


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
          setSuccessToast('Inscription réussie !');
        })
        .catch ((error) => {
          setErrorToasts(error.response.data);
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
        })
        .catch ((error) => {
          setErrorToasts(error.response.data);
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
        setSuccessToast('Connecté !');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
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
        setSuccessToast('Suppression effectuée');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case EDIT_PROFILE: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'patch',
        url: process.env.REACT_APP_BASE_URL_API + `api/user/edit/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }, 
        data: action.values,   
      };

      axios(config)
      .then ((response) => { 
        console.log(response);
        store.dispatch(editProfileSuccess(response.data));
        setSuccessToast('Modification effectuée !');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case CHANGE_PASSWORD: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'patch',
        url: process.env.REACT_APP_BASE_URL_API + `api/user/edit-password`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }, 
        data: action.values,   
      };

      axios(config)
      .then (() => { 
        setSuccessToast('Modification effectuée !');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case DELETE_CHARACTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_URL_API + `api/character/delete/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        setSuccessToast('Suppression effectuée');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }


    default:
      next(action);
  }
}

export default api;
