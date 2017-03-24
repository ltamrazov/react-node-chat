import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
    //TODO: pass the socket in here?
    this.props.fetchUserList();
  }

  render () {
    console.log(this.props.users);

    return (
      <div className="message-list">
        {this.props.users}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    socket: state.socket,
    users: state.auth.users
  };
}

export default connect(mapStateToProps, actions)(Message);
