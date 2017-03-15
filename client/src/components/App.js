import React, {Component} from 'react';
import Navigation from 'Navigation';
import { Route } from 'react-router-dom';
import Landing from 'Landing';
import Signin from 'Signin';
import Signout from 'Signout';
import Message from 'Message';
import RequireAuth from 'RequireAuth';

const App = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="container">
        {children}
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signout" component={Signout} />
        <Route path="/message" component={RequireAuth(Message)} />
      </div>
    </div>
  );
};


export default App;
