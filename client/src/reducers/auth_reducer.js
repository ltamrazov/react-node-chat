import {
  AUTH_USER,
  CONNECT_SOCKET,
  CONNECTING_SOCKET,
  AUTH_ERROR
} from '../containers/App/constants';

import {
  UNAUTH_USER
} from '../containers/Signout/constants';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, error: '', ...action.payload, authenticated: true };
    case CONNECT_SOCKET:
      return { ...state, error: '', ...action.payload };
    case CONNECTING_SOCKET:
      return { ...state, error: '', connecting: action.payload };
    case UNAUTH_USER:
      return { ...state, error: '', authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
