import {
  AUTH_USER,
  AUTH_ERROR,
  CONNECT_SOCKET,
  CONNECTING_SOCKET,
  RECEIVE_USERS,
  CHAT_STARTED,
  MESSAGE_RECEIVED,
  SENT_MESSAGE_RECEIVED,
  USER_LEFT,
  API_PORT
} from './constants';
import io from 'socket.io-client';

export function authenticate (token, username) {
  return {
    type: AUTH_USER,
    payload: { token, username }
  };
}

export function socketConnecting (connecting) {
  return {
    type: CONNECTING_SOCKET,
    payload: connecting
  };
}

export function socketConnected (socket) {
  return {
    type: CONNECT_SOCKET,
    payload: { socket }
  };
}

export function connectSocket () {
  return function (dispatch, getState) {
    let { socket, connecting, token } = getState().auth;

    if (!socket && !connecting) {
      return new Promise((resolve, reject) => {
        dispatch(socketConnecting(true));

        socket = io.connect(`:${API_PORT}`, {
          query: 'token=' + token
        });

        socket.on('connect_error', error => reject(error));

        socket.once('connect', () => {
          dispatch(socketConnecting(false));
          resolve(dispatch(socketConnected(socket)));
        });

        socket.on('users', users =>
          dispatch(updateUserList(users)));

        socket.on('chat_ready', (...data) =>
          dispatch(chatStarted(...data)));

        socket.on('new_msg', data =>
          dispatch(receiveMessage(data)));

        socket.on('user_left', data =>
          dispatch(userLeft(...data)));
      });
    }

    return dispatch(socketConnected(socket));
  };
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function updateUserList (users) {
  return {
    type: RECEIVE_USERS,
    payload: users
  };
}

export function chatStarted (room, users) {
  return function (dispatch, getState) {
    const { username } = getState().auth;
    return dispatch({
      type: CHAT_STARTED,
      payload: { room, users: users.filter(user => user !== username) }
    });
  };
}

export function receiveMessage (data) {
  return function (dispatch, getState) {
    const { username } = getState().auth;

    return dispatch(
      data.from !== username ? {
        type: MESSAGE_RECEIVED,
        payload: {
          room: data.roomId,
          message: data.msg,
          from: data.from,
          read: false,
          when: new Date().getTime()
        }
      } : {
        type: SENT_MESSAGE_RECEIVED
      }
    );
  };
}

export function userLeft (user, room) {
  return {
    type: USER_LEFT,
    payload: { user, room }
  };
}
