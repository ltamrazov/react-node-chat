import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PrivateNavigation extends Component {
  render () {
    return (
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav ml-auto my-2 my-lg-0">
          <li className="nav-item active" key={1}>
            <Link to='/userlist' className="nav-link">User List</Link>
          </li>
          <li className="nav-item active" key={2}>
            <Link to='/signout' className="nav-link">Sign out</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default PrivateNavigation;
