import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewAlert extends Component {
  render () {
    const { newChats } = this.props;

    if (newChats.length > 0) {
      return (
        <div className="new-alert">
          {newChats.map((chat) => {
            const { room, users } = chat;
            return (
              <Link
                to={`/message/${room}`}
                key={room}
                className="alert alert-success"
              >
                New chat with {users}
              </Link>
            );
          })
          }
        </div>
      );
    }

    return (
      null
    );
  };
}

export default NewAlert;
