import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatTemplate from 'ChatTemplate';
import * as actions from '../../actions';

class Message extends Component {
  constructor (props) {
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
  }

  renderMessage (message) {
    return (
      <ChatTemplate
        message={message}
        key={message}
      />
    );
  }

  renderSendMessage (room) {
    return (
      <div className='new-message-div'>
        <input
          type='text'
          id='newMessage'
          name='newMessage'
          className='new-message'
        />
        <button
          name='sendMessage'
          id='sendMessage'
          data-roomId={room}
          className='btn btn-primary send-message'
          onClick={this.handleSendMessage}
        >
          Send
        </button>
      </div>
    );
  }

  handleSendMessage () {
    const roomId = this.props.match.params.room;
    const newMessage = document.getElementById('newMessage').value;

    const { sendMessage } = this.props;

    sendMessage(roomId, newMessage);
    console.log('method dispatched');
  }

  renderChat () {
    const room = this.props.match.params.room;
    const messageList = this.props.chats[room].messages || [];
    let messages = 'No messages found';

    // if (messageList.length) {
    //   <ul>
    //     {messageList.map(message =>
    //       this.renderMessage(message))}
    //   </ul>
    // }

    if (messageList.length) {
      messages = 'See all your messages here';
    }

    return (
      <div className='chat-window'>
        <div className='chat-history'>
          {messages}
        </div>

        {this.renderSendMessage(room)}
      </div>
    );
  }

  render () {
    return (
      <div className="message-list">
        {this.renderChat()}
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
