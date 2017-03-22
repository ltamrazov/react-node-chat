import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_USER
} from './types';
import io from 'socket.io-client';

// Need to update the below with the API rppt URL
const ROOT_URL = 'http://localhost:9494';

export function signinUser ({ username, password }, history) {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  return function (dispatch) {
    // Submit email/password to api server
    axios.post(`${ROOT_URL}/login`, { username, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save JWT token
        localStorage.setItem('token', response.data.token);

        let socket = io.connect(':9494', {
          query: 'token=' + response.data.token
        });

        socket.on('users', users =>
          dispatch(fetchUserList(users)));

        // - redirect to the route '/message'
        history.push('/message');

        return {
          type: AUTH_USER,
          payload: socket
        };
      })
      .catch((...errors) => {
        console.log(...errors);
        // If request is bad...
        // - Show error to the user
        dispatch(authError('Bad login info'));
      });
  };
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser () {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  localStorage.removeItem('token');

  return {
    type: UNAUTH_USER
  };
}

export function fetchUserList (users) {
  console.log('inside fetch user list');
  console.log('users ', users);

  //TODO: emit a 'users' event from the socket stored on connection and get the users list back
  return {
    type: FETCH_USER
  };
}
