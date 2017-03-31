import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    const { signoutUser, socket } = this.props;
    signoutUser(socket);
  }

  render() {
    return (
      <div>You have successfully signed out</div>
    )
  }
}

function mapStateToProps (state) {
  return {
    socket: state.auth.socket
  };
}

export default connect(mapStateToProps, actions)(Signout);
