import axios from 'axios';
import { ROOT_URL } from '../App/constants';
import { connectSocket, authenticate, authError } from '../App/actions';

export function signinUser ({ username, password }) {
  // Actions generally return an object but when we use redux-thunk we return a function that allows us to use the dispatch method
  return function (dispatch) {
    // Submit email/password to api server
    return axios.post(`${ROOT_URL}/login`, { username, password })
      .then(response => {
        const token = response.data.token;
        // - Save JWT token
        sessionStorage.setItem('chattoken', token);
        sessionStorage.setItem('username', username);

        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch(authenticate(token, username));

        return dispatch(connectSocket());
      })
      .catch(response =>
        // If request is bad...
        // - Show error to the user
        dispatch(authError('Bad login info'))
      );
  };
}
