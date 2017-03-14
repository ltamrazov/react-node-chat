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
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Simple Chat App</Link>
        {this.renderLinks()}
      </nav>
    );
  }
}

function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps)(Navigation);
