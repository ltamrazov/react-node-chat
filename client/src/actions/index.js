import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CONNECT_SOCKET,
  FETCH_USER,
  RECEIVE_USERS
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
        const token = response.data.token;
        // - Save JWT token
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(connectSocket(token));

        dispatch({
          type: AUTH_USER,
          payload: token
        });

        // - redirect to the route '/message'
        history.push('/userlist');

        return {
          type: AUTH_USER,
          payload: token
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

export function connectSocket (token, socket) {
  return function (dispatch) {
    if (!socket) {
      socket = io.connect(':9494', {
        query: 'token=' + token
      });

      socket.on('users', users =>
        dispatch(updateUserList(users)));
    }

    dispatch({
      type: CONNECT_SOCKET,
      payload: socket
    });

    return {
      type: CONNECT_SOCKET,
      payload: socket
    };
  };
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser (socket) {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  localStorage.removeItem('token');

  if (socket) {
    socket.close();
  }

  return {
    type: UNAUTH_USER
  };
}

export function signupUser ({ email, password }, history) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        const token = response.data.token;

        localStorage.setItem('token', token);
        localStorage.setItem('username', email);

        dispatch(connectSocket(token));

        dispatch({
          type: AUTH_USER,
          payload: token
        });

        // - redirect to the route '/message'
        history.push('/userlist');

        return {
          type: AUTH_USER,
          payload: token
        };
      })
      .catch(response => {
        dispatch(authError(response.response.data.error));
      });
  };
}

export function fetchUserList (socket) {
  console.log('inside fetch user list');

  socket.emit('users', users =>
    dispatch(updateUserList(users))
  );

  return {
    type: FETCH_USER
  };
}

export function updateUserList (users) {
  return {
    type: RECEIVE_USERS,
    payload: users
  };
}
