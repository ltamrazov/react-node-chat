import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PrivateNavigation extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item" key={1}>
          <Link to='/signout' className="nav-link">Sign out</Link>
        </li>
      </ul>
    )
  }
}

export default PrivateNavigation;
