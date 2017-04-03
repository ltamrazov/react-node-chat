import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserListTemplate from 'UserListTemplate';
import * as actions from '../../actions';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount () {
    const { dispatch, connectSocket, socket } = this.props;
    const token = localStorage.getItem('token');

    dispatch(connectSocket(token));
  }

  handleClick (element) {
    element.preventDefault();
    console.log('clicked', element);
    // this.props.createRoom();
  }

  renderUser (user) {
    const username = localStorage.getItem('username');

    if (username !== user) {
      return (
        <li key={user}>
          <Link
            to='#'
            className='user-link'
            onClick={this.handleClick}
          >
            <span className="user-avatar"></span>
            {user}
          </Link>
        </li>
      );
    }
  }

  render () {
    const userList = Object.keys(this.props.users);

    if (userList < 1) {
      return (
        <div className="no-user">
          No user found
        </div>
      );
    }

    return (
      <div className="message-list">
        <ul>
          {userList.map(key =>
            this.renderUser(this.props.users[key]))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    socket: state.auth.socket,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(UserList);
