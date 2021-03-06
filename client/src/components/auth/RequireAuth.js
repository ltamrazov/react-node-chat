import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount () {
      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate (nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render () {
      if (this.props.connecting) {
        return (<div>Connecting...</div>);
      } else {
        return (<ComposedComponent {...this.props} />);
      }
    }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated,
      connecting: state.auth.connecting
    };
  }

  return connect(mapStateToProps)(Authentication);
}
