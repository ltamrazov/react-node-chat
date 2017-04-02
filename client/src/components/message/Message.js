import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatTemplate from 'ChatTemplate';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
    const { dispatch, connectSocket, socket } = this.props;
    const token = localStorage.getItem('token');

    dispatch(connectSocket(token, socket));
  }

  renderMessage (message) {
    return (
      <ChatTemplate
        message={message}
        key={message}
      />
    );
  }

  render () {
    const messageList = Object.keys(this.props.messages);

    return (
      <div className="message-list">
        <ul>
          {messageList.map(key =>
            this.renderMessage(this.props.messages[key]))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    socket: state.auth.socket,
    messages: state.messages
  };
}

export default connect(mapStateToProps, actions)(Message);
