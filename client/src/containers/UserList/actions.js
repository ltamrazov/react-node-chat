import { CHAT_REQUESTED } from './constants';

export function requestChat (user) {
  return function (dispatch, getState) {
    const { socket } = getState().auth;

    socket.emit('chat_request', user);
    return dispatch({
      type: CHAT_REQUESTED,
      payload: { user }
    });
  };
}
