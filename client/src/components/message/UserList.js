import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UserListTemplate from 'UserListTemplate';
import { requestChat } from '../../actions';

class UserList extends Component {
  constructor (props) {
    super(props);
    this.userClick = this.userClick.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
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

  renderUser (user, isNew) {
    const username = this.props.username;

    if (username !== user) {
      return (
        <UserListTemplate key={user} user={user} newChat={isNew} userClick={(ele) => {
          this.userClick(ele, user);
        }} />
      );
    }
  }

  render () {
    const { users, chats } = this.props;
    const { newChatUsers, others } = sortUsers(Object.keys(users).map(user =>
      users[user]), chats);

    if (newChatUsers.length + others.length <= 1) {
      return (
        <div className="no-user">
          No user found
        </div>
      );
    }

    return (
      <div className="user-list">
        <ul>
          {newChatUsers.map(user =>
            this.renderUser(user, true))
          }
          {others.map(user =>
            this.renderUser(user, false))
          }
        </ul>
      </div>
    );
  }
}

function sortUsers (users, chats) {
  const newChatUsers = Object.keys(chats)
    .filter(room => chats[room].isNew)
    .map(room => chats[room].users)
    .reduce((newUsers, users) =>
      newUsers.concat(users.filter(user =>
        !newUsers.includes(users))
      ),
    [])
    .sort();

  const others = users
    .filter(user =>
      !newChatUsers.includes(user))
    .sort();

  return { newChatUsers, others };
}

function mapStateToProps (state) {
  return {
    username: state.auth.username,
    users: state.users,
    chats: state.chats
  };
}

export default connect(mapStateToProps, { requestChat })(UserList);
