import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatTemplate from 'ChatTemplate';
import * as actions from '../../actions';

class Message extends Component {
  renderMessage (message) {
    return (
      <ChatTemplate
        message={message}
        key={message}
      />
    );
  }

  render () {
    const room = this.props.match.params.room;
    const messageList = this.props.chats[room].messages || [];

    return (
      <div className="message-list">
        <ul>
          {messageList.map(message =>
            this.renderMessage(message))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    chats: state.chats
  };
}

export default connect(mapStateToProps, actions)(Message);
