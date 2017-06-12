import axios from 'axios';
import { authenticate, authError, connectSocket } from '../App/actions';
import { ROOT_URL } from '../App/constants';

export function signupUser ({ email, password }) {
  return function (dispatch) {
    return axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        const token = response.data.token;

        sessionStorage.setItem('chattoken', token);
        sessionStorage.setItem('username', email);

        dispatch(authenticate(token, email));

        return dispatch(connectSocket());
      })
      .catch(response =>
        dispatch(authError(response.response.data))
      );
  };
}
