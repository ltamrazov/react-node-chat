import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PublicNavigation extends Component {
  render() {
    return (
      <div className="collapse navbar-collapse" id="navbarMenu">
        <ul className="navbar-nav mr-auto mt-2 mt-md-0">
          <li className="nav-item active" key={1}>
            <Link to='/signin' className="nav-link">Sign in</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default PublicNavigation;
