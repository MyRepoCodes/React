import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form } from 'reactstrap';
import {Link} from 'react-router-dom';

import validate from './validate';
import { inputField } from './signinFields'
import { loginAction } from '../../actions/login';

class SigninForm extends Component {

  constructor(props){
    super(props)

  }

  onLogin(formProps){
    this.props.dispatch(loginAction(formProps, this.props.history));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-form">
        <div className="form-box-ttl text-center">
          <h2>Welcome to OpHealth</h2>
          <h3>Please login</h3>
        </div>
        <div className="form-box-inner">{this.props.statusText}
          <Form noValidate onSubmit={handleSubmit(this.onLogin.bind(this))}>
              <Field name="email" type="text" label="Email" component={inputField}/>
              <Field name="password" type="password" label="Password" component={inputField}/>
              <div className="form-box-btn">
                <p>
                  <button className="btn full-width">Login</button>
                </p>
                <p>
                  <Link className="forgot-pass text-center" to="/forgot-password">Forgot your password?</Link>
                </p>
              </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    statusText: state.login.statusText,
    isAuthenticating: state.login.isAuthenticating,
    token: state.login.token,
  };
}

const Signin = reduxForm({
  form: 'SigninForm',
  fields: [
    'email',
    'password'
  ],
  validate
})(SigninForm);

export default connect(mapStateToProps, {loginAction})(Signin);
