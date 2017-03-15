import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.redirect = true;
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.redirect = true;
      }
    }

    render() {
      return this.redirect ? (
        <Redirect push to="/" />
      ) : (
        <ComposedComponent {...this.props} />
      );
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
