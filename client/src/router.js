import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import RequireAuth from 'RequireAuth';

import App from 'App';
import Landing from 'Landing';
import Signin from 'Signin';
import Signout from 'Signout';
import Message from 'Message';


const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: Landing },
  childRoutes: [

  ]
};

const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Landing} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="message" component={RequireAuth(Message)} />
      </Route>
    </Router>
  );
};

export default Routes;
