import axios from 'axios';

import { setErrorToasts, setSuccessToast } from '../utils/toasts';

// actions
import { signUpSuccess, loginSuccess } from '../actions/auth';
import { editProfileSuccess, getProfile, getProfileSuccess, } from '../actions/user';
import { editCharacterSuccess, getCharactersSuccess, newCharacterSuccess, getCharacters } from '../actions/character';
import { getScenariosSuccess, newScenarioSuccess, editScenarioSuccess,  } from '../actions/scenario';

// types
import { 
  SIGN_UP, LOGIN, GET_PROFILE, DELETE_PROFILE, EDIT_PROFILE, CHANGE_PASSWORD, DELETE_CHARACTER, EDIT_CHARACTER, NEW_CHARACTER, GET_CHARACTERS, GET_SCENARIOS, NEW_SCENARIO, EDIT_SCENARIO, 
 } from '../actions/types';

 
 const api = (store) => (next) => (action) => {
  switch (action.type) {

    // ----- REGISTER -----

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

    // ----- LOGIN -----

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

    // ----- USER -----

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

    // ----- CHARACTER -----

    case GET_CHARACTERS: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/character',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getCharactersSuccess(response.data));
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case NEW_CHARACTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + `api/character/new`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(newCharacterSuccess(response.data));
        setSuccessToast('Personnage créé !');
        action.redirect(`/personnage/${response.data.id}`);
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
        store.dispatch(getCharacters());
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case EDIT_CHARACTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'put',
        url: process.env.REACT_APP_BASE_URL_API + `api/character/edit/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(editCharacterSuccess(response.data));
        setSuccessToast('Modification effectuée');
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    // ----- SCENARIO -----

    case GET_SCENARIOS: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/scenario',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getScenariosSuccess(response.data));
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }
    
    case NEW_SCENARIO: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + 'api/scenario/new',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(newScenarioSuccess(response.data));
        setSuccessToast('Scénario créé !');
        action.redirect(`/scenario/${response.data.id}`);
      })
      .catch ((error) => {
        setErrorToasts(error.response.data);
      });

      break;
    }

    case EDIT_SCENARIO: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'put',
        url: process.env.REACT_APP_BASE_URL_API + `api/scenario/edit/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(editScenarioSuccess(response.data));
        setSuccessToast('Modification effectuée');
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
