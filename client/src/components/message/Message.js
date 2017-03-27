import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
    const { dispatch, socket, fetchUserList } = this.props;

    dispatch(fetchUserList(socket));
  }

  render () {
    return (
      <div className="message-list">
        {this.props.users}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    socket: state.auth.socket,
    users: state.auth.users
  };
}

export default connect(mapStateToProps, actions)(Message);
