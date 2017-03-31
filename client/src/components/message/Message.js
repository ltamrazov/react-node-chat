import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
    const { dispatch, connectSocket, socket } = this.props;
    const token = localStorage.getItem('token');

    dispatch(connectSocket(token, socket));
  }

  renderUser(user) {
    return (
      <div className="card card-block" key={user}>
        <h4 className="card-title">{user}</h4>
      </div>
    );
  }

  render () {
    console.log("users", this.props.users);

    return (
      <div className="message-list">
        {Object.keys(this.props.users).map(key =>
          this.renderUser(this.props.users[key]))}
      </div>
    );
  }
}

function mapStateToProps (state) {
  console.log("User state: ", state.users);

  return {
    socket: state.auth.socket,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(Message);
