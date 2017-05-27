import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { signupUser } from '../../actions';

import { required, email } from '../../utils/validator';
import { renderField } from '../../templates/FormInput';

class Signup extends Component {
  constructor (props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleFormSubmit (formProps) {
    // Call action creator to sign up the user
    this.props.signupUser(formProps)
      .then(() => {
        if (this.props.token) {
          this.context.router.history.push('/userlist');
        }
      }
    );
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

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <Field
            name="email"
            component={renderField}
            type="text"
            placeholder="Email"
            className="form-control"
            validate={[ required ]}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="password"
            component={renderField}
            type="password"
            placeholder="Password"
            className="form-control"
            validate={[ required ]}
          />
        </fieldset>
        <fieldset className="form-group">
          <Field
            name="confirmPassword"
            component={renderField}
            type="password"
            placeholder="Confirm Password"
            className="form-control"
            validate={[ required ]}
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
  return {
    errorMessage: state.auth.error,
    token: state.auth.token
  };
}

export default connect(mapStateToProps, { signupUser })(form(Signup));
