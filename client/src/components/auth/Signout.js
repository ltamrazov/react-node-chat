import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOut();
  }

  render() {
    return (
      <div>You have successfully signed out</div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    signOut: () => dispatch(actions.signoutUser())
  };
};

export default connect(null, mapDispatchToProps)(Signout);
