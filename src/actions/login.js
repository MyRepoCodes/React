import { checkHttpStatus, handleLoginRedirect } from '../utils';
import {AUTH_CONST, SERVER_URL, AXIOS} from './constants';

//handle state when request is send and resposen is awaited
export function getRequest(REQUEST) {
  return {type: REQUEST}
}

//handle state and redirection if user is successfully logged in
export function getSuccess(SUCCESS, data) {
  return { type: SUCCESS, payload: data }
}

//handle state in case of failure of user login
export function getFailure(FAILURE, error) {
  return {type: FAILURE, payload: error}
}

export function loginAction(formData, history) {
  return function(dispatch) {
    dispatch(getRequest(AUTH_CONST.LOGIN_REQUEST));
    let postData = {
      email: formData.email,
      password: formData.password
    };

    let config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    AXIOS.post(`${SERVER_URL}/api/login`, postData, config).then(checkHttpStatus).then(function(response) {
      let tokenObj = {
        username: postData.email,
        password: postData.password,
        client_id: 'bluePSCIE',
        client_secret: 'bluePSCIE-secret',
        grant_type: 'password'
      }
      AXIOS.post(`${SERVER_URL}/oauth/token`, tokenObj, config).then(checkHttpStatus).then(function(res) {
        dispatch(getSuccess(AUTH_CONST.LOGIN_SUCCESS, {
          response: {
            statusCode: 200,
            statusText: 'You are logged in successfully.',
            token: res.data.access_token
          }
        }));
        handleLoginRedirect(res.data, history);
      });
    }).catch(function(error) {
      dispatch(getFailure(AUTH_CONST.LOGIN_FAILURE, {
        error: {
          statusCode: 404,
          statusText: 'Incorrect email or password',
          token: null
        }
      }));
    });
  }
}


export function forgotPassword(formData, history) {
  return function(dispatch) {
    dispatch(getRequest(AUTH_CONST.FORGOT_REQUEST));
    let config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };

    AXIOS.post(`${SERVER_URL}/api/forgot_password`, formData, config).then(function(response) {
      dispatch(getSuccess(AUTH_CONST.FORGOT_SUCCESS, {
        response: {
          statusCode: response.status,
          statusText: response.data.msg
        }
      }));
    }).catch(function(error) {
      dispatch(getFailure(AUTH_CONST.FORGOT_FAILURE, {
        error: {
          statusCode: error.response.status,
          statusText: error.response.data.msg
        }
      }));
    });
  }
}
