import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {Button, Form} from 'reactstrap';
import {renderField, radioField, selectField, workField, renderError} from './renderFields';
import validate from './validate';
import {register, updateEmailErr} from '../../actions/signupActions';
class signupForm extends Component {

  constructor(props){
    super(props)

  }

  //Rgister submit hook
  onSubmit(formProps) {
    this.props.dispatch(register(formProps, this.props.history));
  }

  onChange(){
    this.props.dispatch(updateEmailErr());
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <div className="signup-form">
        <div className="form-box-ttl text-center">
          <h2>Welcome to OpHealth</h2>
          <h3>Register</h3>
        </div>
        <div className="form-box-inner">
          <Form noValidate onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field name="lang" component={selectField}/>
            <Field name="fname" type="text" label="First Name" component={renderField}/>
            <Field name="lname" type="text" label="Last Name" component={renderField}/>
            <Field name="dob" type="text" label="DOB" component={renderField}/>
            <Field name="email" type="text" label="Email" component={renderField} emailErr={this.props.statusText} onChange={this.onChange.bind(this)}/>
            <Field name="homezip" type="number" label="Home ZipCode" component={renderField}/>
            <Field name="workzip" type="number" label="Work ZipCode" component={workField}/>
            <div className="form-group radiobtn-rw layout-row layout-wrap">
              <label className="radio-inline"><Field name="gender" type="radio" component={radioField} value="male"/> Male</label>
              <label className="radio-inline"><Field name="gender" type="radio" component={radioField} value="female"/> Female</label>
              <Field name="gender" component={renderError}/>
            </div>

            <Field name="password" type="password" label="Password" component={renderField}/>
            <div className="form-box-btn">
              <p>
                <Button type="submit" className="btn full-width">Register</Button>
              </p>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {statusText: state.signup.statusText, isAuthenticating: state.signup.isAuthenticating, isAuthenticated: state.signup.isAuthenticated}
}

const Signup = reduxForm({
  form: 'SignupForm',
  fields: [
    'lang',
    'fname',
    'lname',
    'dob',
    'email',
    'homezip',
    'workzip',
    'gender',
    'password'
  ],
  validate
})(signupForm);

export default connect(mapStateToProps, {register, updateEmailErr})(Signup);
