import React, { Component } from 'react';

class Chat extends Component {
  render () {
    return (
      <li
        key={this.props.message}
        className={this.props.message}
      >
        <p>
          {this.props.message}
        </p>
      </li>
    );
  };
}

export default Chat;
