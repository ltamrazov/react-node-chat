import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PublicNavigation from './PublicNavigation';
import PrivateNavigation from './PrivateNavigation';

class Navigation extends Component {
  renderLinks() {

    if(this.props.authenticated) {
      return (
        <PrivateNavigation />
      );
    } else {
      return (
        <PublicNavigation />
      );
    }
  }

  render() {
    return (
      <nav className="chat-navigation">
        <button
          className="navbar-toggler navbar-toggler-right collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/" className="navbar-brand">Chat App</Link>
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(Navigation);
