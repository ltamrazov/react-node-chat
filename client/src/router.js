import React from 'react';
import { Route, Router, IndexRoute, browserHistory } from 'react-router';

import App from 'App';
import Landing from 'Landing';

const componentRoutes = {
  component: App,
  path: '/',
  indexRoute: { component: Landing },
  childRoutes: [

  ]
};

const Routes = () => {
  return (
    <Router history={browserHistory} routes={componentRoutes} />
  );
};

export default Routes;
