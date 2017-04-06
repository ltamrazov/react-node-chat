import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  render () {
    const user = this.props.user;

    return (
      <li key={user}>
        <Link
          to={`message/${user}`}
          className='user-link'
          onClick={(ele) => {
            this.props.userClick(ele, user);
          }}
        >
          <span className="user-avatar"></span>
          {user}
        </Link>
      </li>
    );
  };
}

export default UserList;
