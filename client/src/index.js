import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import allReducers from './reducers';

import Routes from './router';

import { AUTH_USER } from './actions/types';
import { connectSocket } from './actions';

// Variable store for loading all reducers
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(allReducers);
const token = localStorage.getItem('token');
const username = localStorage.getItem('username');

// If we have a token, consider user to be logged in
if (token) {
  // we need to update the application state
  store.dispatch({
    type: AUTH_USER,
    payload: { token, username }
  });

  store.dispatch(connectSocket());
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
