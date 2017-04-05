import {
  CHAT_REQUESTED,
  CHAT_STARTED,
  MESSAGE_SENT,
  MESSAGE_RECEIVED,
  USER_LEFT,
  LEAVE_ROOM
} from '../actions/types';

export default function (state = {}, action) {
  const { user, users, room, message, from } = (action.payload || {});
  let newState = { ...state };

  switch (action.type) {
    case CHAT_REQUESTED:
      newState[room] = { users: [ user ] };
      return newState;
    case CHAT_STARTED:
      newState[room] = { users, messages: [] };
      return newState;
    case MESSAGE_SENT:
      newState[room].messages.concat({ from,  message });
      return newState;
    case MESSAGE_RECEIVED:
      newState[room].messages.concat({ from, message });
      return newState;
    case USER_LEFT:
      newState[room].users = newState[room].users.filter(username => username != user);
      return newState;
    case LEAVE_ROOM:
      delete newState[room];
      return newState;
  }

  return state;
}
