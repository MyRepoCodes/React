import React, {Component} from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Button, Form } from 'reactstrap';
import {Link} from 'react-router-dom';

import validate from './validate';
import { inputField } from './signinFields'
import { forgotPassword } from '../../actions/login';

class ForgotPassword extends Component {
  constructor(props){
    super(props)
  }

  onForgotPassword(formProps){
    this.props.dispatch(forgotPassword(formProps, this.props.history));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="signup-form">
        <div className="form-box-ttl text-center">
          <h2>Enter your email address.</h2>
          <h3>We'll send you an email</h3>
        </div>
        { this.props.emailSending ? 'Sening email..' : this.props.statusText}
        <div className="form-box-inner">
          <Form noValidate onSubmit={handleSubmit(this.onForgotPassword.bind(this))}>
            <Field name="email" type="text" label="Email" component={inputField}/>
            <div className="form-box-btn">
              <p>
                <button className="btn full-width">Send Reset Email</button>
              </p>
              <p>
                <Link className="forgot-pass text-center" to="/signin">Cancel, and go back to login page</Link>
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
    statusText: state.forgotPassword.statusText,
    emailSending: state.forgotPassword.emailSending
  };
}

const forgot = reduxForm({
  form: 'forgotForm',
  fields: [
    'email'
  ],
  validate
})(ForgotPassword);

export default connect(mapStateToProps, {forgotPassword})(forgot);
