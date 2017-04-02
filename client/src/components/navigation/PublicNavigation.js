import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PublicNavigation extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav ml-auto my-2 my-lg-0">
          <li className="nav-item active" key={1}>
            <Link to='/signin' className="nav-link">Sign in</Link>
          </li>
          <li className="nav-item active" key={2}>
            <Link to='/signup' className="nav-link">Sign up</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default PublicNavigation;
