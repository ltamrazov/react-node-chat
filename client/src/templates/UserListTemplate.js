import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserList extends Component {
  render () {
    const { user, userClick, newChat } = this.props;
    const classes = (newChat ? ['bold'] : []).concat('user-link').join(' ');

    return (
      <li key={user}>
        <Link
          to={`message/${user}`}
          className={classes}
          onClick={(ele) => {
            userClick(ele, user);
          }}
        >
          <span className='user-avatar'></span>
          {user}
        </Link>
      </li>
    );
  };
}

export default UserList;
