import React from 'react';
import Navigation from 'Navigation';
import { Route } from 'react-router-dom';
import Landing from 'Landing';
import Signin from 'Signin';
import Signup from 'Signup';
import Signout from 'Signout';
import Message from 'Message';
import UserList from 'UserList';
import RequireAuth from 'RequireAuth';

const App = ({ children }) => {
  return (
    <div>
      <Navigation />
      <div className="container main-container">
        {children}
        <Route exact path="/" component={Landing} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/userlist" component={RequireAuth(UserList)} />
        <Route path="/message/:room" component={RequireAuth(Message)} />
      </div>
    </div>
  );
};

export default App;
