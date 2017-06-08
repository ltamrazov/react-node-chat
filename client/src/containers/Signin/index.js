import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signinUser } from '../../actions';

import { required } from '../../utils/validator';
import { renderField } from '../../templates/FormInput';

class Signin extends Component {
  constructor (props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object
  }

  handleFormSubmit ({ username, password }) {
    this.props.signinUser({ username, password })
      .then(() => {
        if (this.props.token) {
          this.context.router.history.push('/userlist');
        }
      }
    );
  }

  renderError () {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render () {
    const { handleSubmit, submitting } = this.props;

    return (
      <div className="signin-section">
        <form className="signin-form" onSubmit={handleSubmit(this.handleFormSubmit)}>
          <fieldset className="form-group">
            <div>
              <Field
                name="username"
                component={renderField}
                type="text"
                placeholder="Username"
                className="form-control"
                validate={[ required ]}
              />
            </div>
          </fieldset>
          <fieldset className="form-group">
            <div>
              <Field
                name="password"
                component={renderField}
                type="password"
                placeholder="Password"
                className="form-control"
                validate={[ required ]}
              />
            </div>
          </fieldset>
          {this.renderError()}
          <button className="btn btn-primary" disabled={submitting}>Sign in</button>
        </form>
      </div>
    );
  }
}

const form = reduxForm({
  form: 'signin'
});

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, { signinUser })(form(Signin));
