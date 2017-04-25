import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatTemplate from 'ChatTemplate';
import * as actions from '../../actions';

class Message extends Component {
  constructor (props) {
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);
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
  }

  renderMessage (messageList) {
    const loggedUser = sessionStorage.getItem('username');
    const { from, message, read, when } = messageList;
    let userClass = 'left-msg';

    const a = new Date(when);
    let hours = a.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours || 12;

    const time = hours + ':' + (a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes()) + ' ' + ampm;

    if (from === loggedUser) {
      userClass = 'right-msg';
    }

    return (
      <ChatTemplate when={when} time={time} read={read} userClass={userClass} message={message} />
    );
  }

  renderChat () {
    const room = this.props.match.params.room;
    // const messageList = this.props.chats[room].messages || [];

    const messageList = [
      {
        from: '12345',
        message: 'sfdsdsfdf',
        read: false,
        when: 1493072201405
      },
      {
        from: 'abcdef',
        message: 'awdwadwdad',
        read: false,
        when: 1493073198139
      }
    ];

    if (messageList.length < 1) {
      return (
        <div className='chat-window'>
          <div className='chat-history'>
            No messages found
          </div>
          {this.renderSendMessage(room)}
        </div>
      );
    }

    return (
      <div className='chat-window'>
        <div className='chat-history'>
          <ul>
            {Object.keys(messageList).map(key =>
              this.renderMessage(messageList[key]))}
          </ul>
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
