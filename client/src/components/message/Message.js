import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserList from 'UserList';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
    const { dispatch, connectSocket, socket } = this.props;
    const token = localStorage.getItem('token');

    dispatch(connectSocket(token, socket));
  }

  renderUser(user) {
    const username = localStorage.getItem('username');
    if (username !== user) {
      return (
        <UserList
          user={user}
          key={user}
        />
      );
    }
  }

  render () {
    return (
      <div className="message-list">
        <ul>
          {Object.keys(this.props.users).map(key =>
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

export default connect(mapStateToProps, actions)(Message);
