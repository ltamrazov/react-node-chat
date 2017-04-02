import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  render () {
    return (
      <li key={this.props.user}>
        <Link
          to='/chat'
          className='user-link'
        >
          <span className="user-avatar"></span>
          {this.props.user}
        </Link>
      </li>
    );
  };
}

export default UserList;
