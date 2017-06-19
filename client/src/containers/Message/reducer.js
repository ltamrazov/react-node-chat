import {
  CHAT_STARTED,
  MESSAGE_RECEIVED,
  USER_LEFT
} from '../App/constants';

import {
  MESSAGE_SENT,
  DISMISS_NEW_CHAT
} from './constants';

import {
  LEAVE_CHAT
} from '../Signout/constants';

export default function (state = {}, action) {
  const { user, users, room, message, from, read, when } = (action.payload || {});
  let newState = { ...state };

  switch (action.type) {
    case CHAT_STARTED:
      newState[room] = { users, messages: [], isNew: true };
      return newState;
    case MESSAGE_SENT:
      newState[room].messages = newState[room].messages.concat({ from, message, read, when });
      return newState;
    case MESSAGE_RECEIVED:
      newState[room].messages = newState[room].messages.concat({ from, message, read, when });
      return newState;
    case USER_LEFT:
      newState[room].users = newState[room].users.filter(username => username !== user);
      return newState;
    case LEAVE_CHAT:
      return {};
    case DISMISS_NEW_CHAT:
      newState[room].isNew = false;
      return newState;
  }

  return state;
}
