/**
 * @reducer: login reducer
 */

import { createReducer } from '../utils';
import {AUTH_CONST} from '../actions/constants';

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false
};

export default createReducer(initialState, {
  [AUTH_CONST.LOGIN_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'isAuthenticated': false,
      'statusText': null,
      'token': null
    });
  },
  [AUTH_CONST.LOGIN_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.response.data,
      'statusText': null
    });

  },
  [AUTH_CONST.LOGIN_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'statusText': payload.error.statusText,
      'token': null
    });
  }
});
