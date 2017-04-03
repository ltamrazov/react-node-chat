import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

const renderField = ({ input, placeholder, type, className, meta: { touched, error, warning }}) => (
  <div>
    <input
      {...input}
      placeholder={placeholder}
      type={type}
      className={className}
    />
  {touched && ((error && <span className="alert alert-danger">{error}</span>) || (warning && <span className="alert alert-danger">{warning}</span>))}
  </div>
);

class Signin extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  handleFormSubmit({ username, password }) {
    this.props.signIn({ username, password })
      .then(() => {
        if (this.props.token) {
          this.context.router.history.push('/userlist');
        }
      }
    );
  }

  renderError() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;
    const required = value => value ? undefined : 'This is a required field';
    const email = value => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Invalid email address' : undefined;

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
          <button className="btn btn-primary">Sign in</button>
        </form>
      </div>
    );
  }
}

const form = reduxForm({
  form: 'signin'
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    token: state.auth.token
  };
};

function mapDispatchToProps(dispatch) {
  return {
    signIn: credentials => dispatch(actions.signinUser(credentials))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(form(Signin));
