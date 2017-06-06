import React from 'react';
import Navigation from './navigation/Navigation';
import { Route } from 'react-router-dom';
import Landing from './Landing';
import Signin from './auth/Signin';
import Signup from './auth/Signup';
import Signout from './auth/Signout';
import Message from './message/Message';
import UserList from './message/UserList';
import RequireAuth from './auth/RequireAuth';

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
