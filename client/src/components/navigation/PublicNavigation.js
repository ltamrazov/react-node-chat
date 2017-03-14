import React, { Component } from 'react';
import { Link } from 'react-router';

class PublicNavigation extends Component {
  render() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item" key={1}>
          <Link to='/signin' className="nav-link">Sign in</Link>
        </li>
      </ul>
    )
  }
}

export default PublicNavigation;
