import {
  FETCH_USER,
  RECEIVE_USERS
} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      return { ...state };
    case RECEIVE_USERS:
      return { ...state, ...action.payload };
  }

  return state;
}
