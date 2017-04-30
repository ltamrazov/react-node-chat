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

  static contextTypes = {
    router: React.PropTypes.object
  }

  userClick (element, user) {
    element.preventDefault();

    const { requestChat, chats } = this.props;

    const chatsWithUser = Object.keys(chats).filter(room =>
      chats[room].users.includes(user)
    );

    if (!chatsWithUser.length) {
      requestChat(user);
    } else {
      this.context.router.history.push(`/message/${chatsWithUser[0]}`);
    }
  }

  componentWillReceiveProps (nextProps) {
    const prevChats = Object.keys(this.props.chats);
    const currentChats = Object.keys(nextProps.chats);

    if (prevChats.length !== currentChats.length) {
      const newChats = currentChats.filter(room =>
        room !== 'undefined' && !prevChats.includes(room)
      );

      if (newChats.length) {
        this.context.router.history.push(`/message/${newChats[0]}`);
      }
    }
  }

  renderUser (user, index) {
    const username = this.props.username;

    if (username !== user) {
      return (
        <UserListTemplate key={index} user={user} userClick={(ele) => {
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
      <div className="user-list">
        <ul>
          {userList.map((key, index) =>
            this.renderUser(this.props.users[key], index))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    username: state.auth.username,
    users: state.users,
    chats: state.chats
  };
}

function mapDispatchToProps (dispatch) {
  return {
    requestChat: user =>
      dispatch(actions.requestChat(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
