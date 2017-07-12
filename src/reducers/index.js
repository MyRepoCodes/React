/**
 * @reducer       : index reducer
 * @description   :
 * @Created by    : smartData
 */

import { combineReducers } from 'redux';
import signupReducer from './signupReducer';
import register from './register';
import questionnaire from './questionnaire';
import login from './login';
import forgotPassword from './forgot_password';

import { reducer as formReducer } from 'redux-form';   //SAYING use redux form reducer as reducer

const rootReducer = combineReducers({
  form: formReducer,
  signup: signupReducer,
  register: register,
  login: login,
  forgotPassword: forgotPassword,
  questionnaire: questionnaire
});

export default rootReducer;
