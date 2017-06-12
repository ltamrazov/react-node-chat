import { LEAVE_CHAT, UNAUTH_USER } from './constants';

export function leaveChat () {
  return function (dispatch, getState) {
    const { socket, username } = getState().auth;

    socket.emit('user_left', username);
    return dispatch({ type: LEAVE_CHAT });
  };
}

export function signoutUser () {
  return function (dispatch, getState) {
    const { socket } = getState().auth;
    sessionStorage.removeItem('chattoken');
    sessionStorage.removeItem('username');

    if (socket) {
      dispatch(leaveChat());
      socket.close();
    }

    return dispatch({
      type: UNAUTH_USER
    });
  };
}
