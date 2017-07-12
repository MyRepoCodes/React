import axios from 'axios';

//Define and Export Constants
export const AUTH_CONST = {
  //Rgistration constants
  REGISTER_REQUEST: 'REGISTER_REQUEST',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  UPDATE_EMAILERROR: 'UPDATE_EMAILERROR',
  //login constants
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  //Forgot password constants
  FORGOT_REQUEST: 'FORGOT_REQUEST',
  FORGOT_SUCCESS: 'FORGOT_SUCCESS',
  FORGOT_FAILURE: 'FORGOT_FAILURE',
  //logout constants
  LOGOUT: 'LOGOUT',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED'
};

export const REGISTER_CHAT = {
  REGISTER_CHAT_REQUEST: 'REGISTER_CHAT_REQUEST',
  REGISTER_CHAT_SUCCESS: 'REGISTER_CHAT_SUCCESS',
  REGISTER_CHAT_FAILURE: 'REGISTER_CHAT_FAILURE'
};

//Fetch questionnaire constants
export const FETCH_QUEST = 'FETCH_QUEST';
//Fetch particular dataelement.
export const FETCH_DATAELEMENTS = 'FETCH_DATAELEMENTS';
//Constant for save answers given by the user
export const SAVE_ANSWER = 'SAVE_ANSWER';

//Axios instance
export const AXIOS = axios.create();
AXIOS.defaults.headers['Accept'] = 'application/json';
AXIOS.defaults.headers['Content-Type'] = 'application/json';

//Export auth token from localStorage
export const AUTHTOKEN = localStorage.getItem('authToken') ? localStorage.getItem('authToken'): null;

// Export server url
export const SERVER_URL = '*****************************';
