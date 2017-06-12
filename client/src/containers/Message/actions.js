import { DISMISS_NEW_CHAT, MESSAGE_SENT } from './constants';

export function dismissNewChat (room) {
  return {
    type: DISMISS_NEW_CHAT,
    payload: { room }
  };
}

export function sendMessage (room, message) {
  return function (dispatch, getState) {
    const { socket, username } = getState().auth;

    socket.emit('new_msg', {
      roomId: room,
      msg: message,
      from: username
    });

    return dispatch({
      type: MESSAGE_SENT,
      payload: {
        room,
        message,
        from: username,
        read: true,
        when: new Date().getTime()
      }
    });
  };
}
