/**
 * @reducer       : login reducer
 */

import {createReducer} from '../utils';
import {AUTH_CONST} from '../actions/constants';

const initialState = {
  token: null,
  isAuthenticated: false,
  isAuthenticating: false

};

export default createReducer(initialState, {
  [AUTH_CONST.REGISTER_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': true,
      'isAuthenticated': false,
      'statusText': null,
      'token': null
    });
  },
  [AUTH_CONST.REGISTER_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': true,
      'token': payload.response.data,
      'statusText': null
    });

  },
  [AUTH_CONST.REGISTER_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'isAuthenticating': false,
      'isAuthenticated': false,
      'statusText': payload.error.statusText,
      'token': null
    });
  },
  [AUTH_CONST.UPDATE_EMAILERROR]: (state, payload) => {
    return Object.assign({}, state, {
      'statusText': null
    });
  }
});
