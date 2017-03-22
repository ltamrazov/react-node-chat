import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';

class Message extends Component {
  componentWillMount () {
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
    users: state.auth.users
  };
}

export default connect(mapStateToProps, actions)(Message);
