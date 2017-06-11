import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signoutUser } from '../App/actions';

class Signout extends Component {
  componentWillMount () {
    this.props.signoutUser();
  }

  render () {
    return (
      <div>You have successfully signed out</div>
    );
  }
}

export default connect(null, { signoutUser })(Signout);
