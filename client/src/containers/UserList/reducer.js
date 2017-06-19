import {
  RECEIVE_USERS
} from '../App/constants';

export default function (state = [], action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return { ...state, ...action.payload };
  }

  return state;
}
