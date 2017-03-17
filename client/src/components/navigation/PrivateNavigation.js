import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PrivateNavigation extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
          <li className="nav-item active" key={1}>
            <Link to='/signout' className="nav-link">Sign out</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default PrivateNavigation;
