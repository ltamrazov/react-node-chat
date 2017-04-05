import axios from 'axios';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  CONNECT_SOCKET,
  FETCH_USER,
  RECEIVE_USERS,
  CHAT_REQUESTED,
  CHAT_STARTED,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  USER_LEFT,
  LEAVE_ROOM
} from './types';
import io from 'socket.io-client';

// Need to update the below with the API rppt URL
const ROOT_URL = 'http://localhost:9494';

export function authenticate (token) {
  return {
    type: AUTH_USER,
    payload: token
  };
}

export function signinUser ({ username, password }) {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  return function (dispatch) {
    // Submit email/password to api server
    return axios.post(`${ROOT_URL}/login`, { username, password })
      .then(response => {
        const token = response.data.token;
        // - Save JWT token
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);

        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(connectSocket(token));

        return dispatch(authenticate(token));
      })
      .catch(response =>
        // If request is bad...
        // - Show error to the user
        dispatch(authError('Bad login info'))
      );
  };
}

export function connectSocket (token) {
  return function (dispatch, getState) {
    let { socket } = getState();

    if (!socket) {
      socket = io.connect(':9494', {
        query: 'token=' + token
      });

      socket.on('users', users =>
        dispatch(updateUserList(users)));

      socket.on('chat_ready', (...data) =>
        dispatch(chatStarted(...data)));

      socket.on('new_msg', data =>
        dispatch(receiveMessage(...data)));

      socket.on('user_left', data =>
        dispatch(userLeft(...data)));
    }

    return dispatch({
      type: CONNECT_SOCKET,
      payload: socket
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
  return function (dispatch, getState) {
    const { socket } = getState();
    localStorage.removeItem('token');

    if (socket) {
      socket.close();
    }

    return dispatch({
      type: UNAUTH_USER
    });
  };
}

export function signupUser ({ email, password }) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        const token = response.data.token;

        localStorage.setItem('token', token);
        localStorage.setItem('username', email);

        dispatch(connectSocket(token));

        return dispatch(authenticate(token));
      })
      .catch(response =>
        dispatch(authError(response.response.data))
      );
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

export function requestChat (user) {
  return function (dispatch, getState) {
    const { socket } = getState();

    socket.emit('chat_request', user, () =>
      dispatch({
        type: CHAT_REQUESTED,
        payload: { user }
      })
    );
  };
}

export function chatStarted (room, users) {
  //TODO: add username to the store
  return function (dispatch, getState) {
    const { username } = getState();
    return {
      type: CHAT_STARTED,
      payload: { room, users: users.filter(user => user != username) }
    };
  }
}

export function sendMessage (room, message) {
  //TODO: add username to the store
  return function (dispatch, getState) {
    const { socket, username } = getState();

    socket.emit('new_msg', room, message, username, () =>
      dispatch({
        type: MESSAGE_SENT,
        payload: { room, message, from: username }
      })
    );
  };
}

export function receiveMessage (room, message, from) {
  return {
    type: MESSAGE_RECEIVED,
    payload: { room, message, from }
  };
}

export function userLeft (user, room) {
  return {
    type: USER_LEFT,
    payload: { user, room }
  };
}

export function leaveRoom (room) {
  return function (dispatch, getState) {
    const { socket } = getState();

    socket.emit('user_left', room, () =>
      dispatch({
        type: LEAVE_ROOM,
        payload: { room }
      })
    );
  };
}
