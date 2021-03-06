import axios from 'axios';

import { setErrorToasts, setSuccessToast } from '../utils/toasts';
import { findMonster, findNewMonster, findPlace, findNewPlace } from '../utils/findItem';

// actions
import { signUpSuccess, loginSuccess } from '../actions/auth';
import { editProfileSuccess, getProfile, getProfileSuccess, } from '../actions/user';
import { editCharacterSuccess, getCharactersSuccess, newCharacterSuccess, getProfessionsSuccess, getRacesSuccess } from '../actions/character';
import { getScenariosSuccess, newScenarioSuccess, editScenarioSuccess} from '../actions/scenario';
import { deletePlaceSuccess, getCategoriesSuccess, getPlaceSuccess } from '../actions/place';
import { getMonsterSuccess, deleteMonsterSuccess } from '../actions/monster';
import { setLoadingTrue, setLoadingFalse } from '../actions/other';

// types
import { 
  SIGN_UP, LOGIN, GET_PROFILE, DELETE_PROFILE, EDIT_PROFILE, CHANGE_PASSWORD, DELETE_CHARACTER, EDIT_CHARACTER, NEW_CHARACTER, GET_CHARACTERS, GET_SCENARIOS, NEW_SCENARIO, EDIT_SCENARIO, DELETE_SCENARIO, GET_CATEGORIES, NEW_PLACE, GET_PLACE, EDIT_PLACE, DELETE_PLACE, NEW_MONSTER, GET_MONSTER, EDIT_MONSTER, DELETE_MONSTER, GET_PROFESSIONS, GET_RACES
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
          setErrorToasts(error.response?.data);
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
          setErrorToasts(error.response?.data);
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
        setErrorToasts(error.response?.data);
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
        action.logout();
        action.redirect('/');
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
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
        store.dispatch(editProfileSuccess(response.data));
        setSuccessToast('Modification effectuée !');
        action.closeFunction();
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
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
        action.closeFunction();
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    // ----- CHARACTER -----

    case GET_PROFESSIONS: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/profession',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getProfessionsSuccess(response.data));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case GET_RACES: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/race',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getRacesSuccess(response.data));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case GET_CHARACTERS: {
      store.dispatch(setLoadingTrue('character'));
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
        store.dispatch(setLoadingFalse('character'));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
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
        setErrorToasts(error.response?.data);
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
        action.redirect('/personnage');
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
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
        action.closeFunction();
        action.redirect(`/personnage/${response.data.id}`);
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    // ----- SCENARIO -----

    case GET_SCENARIOS: {
      store.dispatch(setLoadingTrue('scenario'));
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
        store.dispatch(setLoadingFalse('scenario'));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }
    
    case NEW_SCENARIO: {
      const { auth: { token } } = store.getState();
      console.log(action.values);
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
        setErrorToasts(error.response?.data);
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
        action.closeFunction();
        action.redirect(`/scenario/${response.data.id}`);

      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case DELETE_SCENARIO: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_URL_API + `api/scenario/delete/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        setSuccessToast('Suppression effectuée');
        action.redirect('/scenario');
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    // ----- PLACE -----

    case GET_CATEGORIES: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + 'api/categoriesPlaces',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getCategoriesSuccess(response.data));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case NEW_PLACE: {
      const { auth: { token } } = store.getState();
      console.log(action.values);
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + 'api/place/new',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(editScenarioSuccess(response.data));
        const place = findNewPlace(response.data.id);
        if (Object.keys(place).length > 0) {
          store.dispatch(getPlaceSuccess(place));
          setSuccessToast('Lieu créé !');
          action.closeFunction();
        } else {
          setErrorToasts(['Lieu non créé']);
        }
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case GET_PLACE: {
      store.dispatch(setLoadingTrue('place'));
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + `api/place/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getPlaceSuccess(response.data));
        store.dispatch(setLoadingFalse('place'));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case EDIT_PLACE: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'put',
        url: process.env.REACT_APP_BASE_URL_API + `api/place/edit/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(editScenarioSuccess(response.data));
        const place = findPlace(action.id, response.data.id);
        if (place) {
          store.dispatch(getPlaceSuccess(place));
          setSuccessToast('Modification effectuée');
          action.closeFunction();
        } else {
          setErrorToasts(['Modification non effectuée']);
        }
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case DELETE_PLACE: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_URL_API + `api/place/delete/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        setSuccessToast('Suppression effectuée');
        store.dispatch(editScenarioSuccess(response.data));
        store.dispatch(deletePlaceSuccess());
        store.dispatch(deleteMonsterSuccess('currentMonsterInPlace'));
        action.closeFunction();
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

      // ----- MONSTER -----

    case NEW_MONSTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'post',
        url: process.env.REACT_APP_BASE_URL_API + `api/monster/new/${action.slug}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };
      axios(config)
      .then ((response) => { 
        store.dispatch(editScenarioSuccess(response.data));
        const monster = findNewMonster(JSON.parse(action.values).placeId, JSON.parse(action.values).wanderGroupId, response.data.id);
        console.log('new monster');
        console.log(monster);
        if (Object.keys(monster).length > 0) {
          store.dispatch(getMonsterSuccess(monster, action.context));
          setSuccessToast('Monstre créé !');
          action.closeFunction();
          // si le monstre a été créé dans un lieu, on met à jour le lieu également
          if (JSON.parse(action.values).placeId) {
            const place = findPlace(JSON.parse(action.values).placeId, response.data.id)
            store.dispatch(getPlaceSuccess(place));
          }
        } else {
        setErrorToasts(['Monstre non créé']);
        }
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }
  
    case GET_MONSTER: {
      store.dispatch(setLoadingTrue('monster'));
      const { auth: { token } } = store.getState();
      const config = {
        method: 'get',
        url: process.env.REACT_APP_BASE_URL_API + `api/monster/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(getMonsterSuccess(response.data, action.context));
        store.dispatch(setLoadingFalse('monster'));
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case EDIT_MONSTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'put',
        url: process.env.REACT_APP_BASE_URL_API + `api/monster/edit/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        data: action.values     
      };

      axios(config)
      .then ((response) => { 
        store.dispatch(editScenarioSuccess(response.data));
        const monster = findMonster(action.id, response.data.id);
        if (Object.keys(monster).length > 0) {
          store.dispatch(getMonsterSuccess(monster, action.context));
          setSuccessToast('Modification effectuée');
          //si le monstre est rattaché à un lieu, on met à jour le lieu
          if (action.placeId) {
            const place = findPlace(action.placeId, response.data.id)
            store.dispatch(getPlaceSuccess(place));
          }
          action.closeFunction();
        } else {
          setErrorToasts(['Modification non effectuée']);
        }
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    case DELETE_MONSTER: {
      const { auth: { token } } = store.getState();
      const config = {
        method: 'delete',
        url: process.env.REACT_APP_BASE_URL_API + `api/monster/delete/${action.id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }     
      };

      axios(config)
      .then ((response) => { 
        setSuccessToast('Suppression effectuée');
        store.dispatch(deleteMonsterSuccess(action.context));
        store.dispatch(editScenarioSuccess(response.data));
        //si le monstre était rattaché à un lieu, on met à jour le lieu
        if (action.placeId) {
          const place = findPlace(action.placeId, response.data.id)
          store.dispatch(getPlaceSuccess(place));
        }
        action.closeFunction();
      })
      .catch ((error) => {
        setErrorToasts(error.response?.data);
      });

      break;
    }

    default:
      next(action);
  }
}

export default api;
