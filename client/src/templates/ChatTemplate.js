import React, { Component } from 'react';

class Chat extends Component {
  render () {
    return (
      <li className="message-li" key={this.props.when}>
        <div className={this.props.userClass}>
          {this.props.message}
          <span>{this.props.time}</span>
        </div>
      </li>
    );
  };
}

export default Chat;
