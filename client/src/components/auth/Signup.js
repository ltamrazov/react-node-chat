import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, placeholder, type, className, meta: { touched, error, warning } }) => (
  <div>
    <label>{placeholder}:</label>
    <input {...input} placeholder={placeholder} type={type} className={className} />
    {touched && ((error && <span className="alert-danger">{error}</span>) || (warning && <span className="alert-danger">{warning}</span>))}
  </div>
);

class Signup extends Component {
  handleFormSubmit (formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps);
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render () {
    const { handleSubmit } = this.props;
    const required = value => value ? undefined : 'Required';
    const minValue = min => value =>
      value && value.length < min ? `Must be at least ${min}` : undefined;
    const minValuePwd = minValue(8);
    const email = value =>
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address' : undefined;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field
            name="email"
            component={renderField}
            type="text"
            placeholder="Email"
            className="form-control"
            validate={[ required, email ]}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder="Password"
            className="form-control"
            validate={[ required, minValuePwd ]}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="confirmPassword"
            component={renderField}
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            validate={[ required, minValuePwd ]}
          />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }
}

const form = reduxForm({
  form: 'signup'
});

function mapStateToProps (state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(form(Signup));
