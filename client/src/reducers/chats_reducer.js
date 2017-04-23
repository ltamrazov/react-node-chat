import {
  CHAT_REQUESTED,
  CHAT_STARTED,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  USER_LEFT,
  LEAVE_CHAT
} from '../actions/types';

export default function (state = {}, action) {
  const { user, users, room, message, from, read, when } = (action.payload || {});
  let newState = { ...state };

  switch (action.type) {
    case CHAT_REQUESTED:
      newState[room] = { users: [ user ], messages: [] };
      return newState;
    case CHAT_STARTED:
      newState[room] = { users, messages: [] };
      return newState;
    case MESSAGE_SENT:
      console.log('room', room);
      console.log('message', message);
      newState[room].messages = newState[room].messages.concat({ from, message });
      return newState;
    case MESSAGE_RECEIVED:
      newState[room].messages = newState[room].messages.concat({ from, message });
      return newState;
    case USER_LEFT:
      newState[room].users = newState[room].users.filter(username => username != user);
      return newState;
    case LEAVE_CHAT:
      return {};
  }

  return state;
}
