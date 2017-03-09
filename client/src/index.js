import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as reduxFormReducer} from 'redux-form';
import reduxThunk from 'redux-thunk';

import allReducers from './reducers';

import { Route, Router, IndexRoute, browserHistory } from 'react-router';
import { createHashHistory } from 'history';
import Routes from './router';

// Variable store for loading all reducers
const store = createStore(allReducers);
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
