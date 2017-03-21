import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR
} from './types';
import io from 'socket.io-client';

// Need to update the below with the API rppt URL
const ROOT_URL = 'http://localhost:9494';

export function signinUser({ username, password }, history) {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  return function(dispatch) {
    // Submit email/password to api server
    axios.post(`${ROOT_URL}/login`, { username, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save JWT token
        localStorage.setItem('token', response.data.token);
        // - reidirect to the route '/feature'
        io.connect(':9494', {
          query: 'token=' + response.data.token
        });

        history.push('/message');

        return {
          type: AUTH_USER,
          payload: io
        }
      })
      .catch(() => {
        // If request is bad...
        // - Show error to the user
        dispatch(authError('Bad login info'));
      });
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  }
}
