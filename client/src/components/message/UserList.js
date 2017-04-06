import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserListTemplate from 'UserListTemplate';
import * as actions from '../../actions';

class UserList extends Component {
  constructor (props) {
    super(props);
    this.userClick = this.userClick.bind(this);
  }

  componentWillMount () {
    const { dispatch, connectSocket, token } = this.props;

    dispatch(connectSocket(token));
  }

  userClick (element, user) {
    element.preventDefault();

    const { dispatch, requestChat } = this.props;

    dispatch(requestChat(user));
  }

  renderUser (user) {
    const username = this.props.username;

    if (username !== user) {
      return (
        <UserListTemplate key={user} user={user} userClick={(ele) => {
          this.userClick(ele, user);
        }} />
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
    token: state.auth.token,
    username: state.auth.username,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(UserList);
