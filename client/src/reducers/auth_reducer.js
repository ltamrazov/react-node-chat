import {
  AUTH_USER,
  CONNECT_SOCKET,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', token: action.payload, authenticated: true };
    case CONNECT_SOCKET:
      return { ...state, error: '', socket: action.payload };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
