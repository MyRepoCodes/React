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

export function register(formData, history) {
  return function(dispatch) {
    dispatch(getRequest(AUTH_CONST.REGISTER_REQUEST));
    const postData = {
      email: formData.email,
      password: formData.password,
      profile: {
        fname: formData.fname,
        lname: formData.lname,
        fullname: formData.fname + ' ' + formData.lname,
        lang: formData.lang,
        birthday: formData.dob,
        zip: formData.homezip,
        gender: formData.gender
      }
    }
    let config = {
      'headers': {
        'Content-Type': 'application/json'
      }
    };
    AXIOS.post(SERVER_URL + '/api/register', postData, config).then(checkHttpStatus).then(function(response) {
      let authToken = response.data.tokenObj;
      AXIOS.post(SERVER_URL + '/oauth/token', authToken, config).then(checkHttpStatus).then(function(response) {
        dispatch(getSuccess(AUTH_CONST.REGISTER_SUCCESS, {
          response: {
            statusCode: 200,
            statusText: 'You are logged in successfully.',
            data: response.data
          }
        }));
        handleLoginRedirect(response.data, history);
      });
    }).catch(function(error) {
      console.log(error, "error");
      dispatch(getFailure(AUTH_CONST.REGISTER_FAILURE, {
        error: {
          statusCode: 422,
          statusText: `${formData.email} has already registered with us.`,
          data: null
        }
      }));
    });
  }
}


export function updateEmailErr() {
  return function( dispatch ) {
    dispatch( getRequest( AUTH_CONST.UPDATE_EMAILERROR ) );
  }
}
