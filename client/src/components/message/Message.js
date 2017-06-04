import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import RenderNewAlert from 'NewAlertTemplate';
import ChatTemplate from 'ChatTemplate';
import * as actions from '../../actions';

class Message extends Component {
  constructor (props) {
    super(props);

    this.handleSendMessage = this.handleSendMessage.bind(this);

    this.state = {
      room: this.props.match.params.room
    };
  }

  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    if (!this.props.chats.hasOwnProperty(this.state.room)) {
      this.context.router.history.push('/userlist');
      this.setState({ room: null });
    }
  }

  componentDidMount() {
    const { room } = this.state;
    if (room) {
      this.props.dismissNewChat(room);
    }
  }

  renderSendMessage () {
    return (
      <div className='new-message-div'>
        <input
          type='text'
          id='newMessage'
          name='newMessage'
          className='new-message'
          ref='newMessage'
          onKeyPress={this.clickSendMessage}
        />
        <button
          name='sendMessage'
          id='sendMessage'
          data-roomId={this.state.room}
          className='btn btn-primary send-message'
          onClick={this.handleSendMessage}
        >
          Send
        </button>
      </div>
    );
  }

  handleSendMessage () {
    const newMessage = this.refs.newMessage.value;
    const { sendMessage } = this.props;

    sendMessage(this.state.room, newMessage);

    this.refs.newMessage.value = '';
  }

  renderMessage (messageList, index) {
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
      <ChatTemplate key={index} when={when} time={time} read={read} userClass={userClass} message={message} />
    );
  }

  renderChat () {
    const chat = this.props.chats[this.state.room];
    const messageList = chat && chat.messages || [];

    if (messageList.length < 1) {
      return (
        <div className='chat-window'>
          <div className='chat-history'>
            No messages found
          </div>
          {this.renderSendMessage()}
        </div>
      );
    }

    return (
      <div className='chat-window'>
        <div className='chat-history'>
          <ul>
            {Object.keys(messageList).map((key, index) =>
              this.renderMessage(messageList[key], index))}
          </ul>
        </div>

        {this.renderSendMessage()}
      </div>
    );
  }

  render () {
    const chats = this.props.chats;
    const newChats = Object.keys(chats)
      .filter(room => room && chats[room].isNew)
      .map(room => Object.assign({ room }, chats[room]));

    return (
      <div className="message-list">
        <RenderNewAlert newChats={newChats} />
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
