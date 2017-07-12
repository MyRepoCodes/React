/**
 * @reducer: Forgot password reducer
 */

import { createReducer } from '../utils';
import { AUTH_CONST } from '../actions/constants';

const initialState = {
  emailSent: false,
  emailSending: false
};

export default createReducer(initialState, {
  [AUTH_CONST.FORGOT_REQUEST]: (state, payload) => {
    return Object.assign({}, state, {
      'emailSending': true,
      'emailSent': false,
      'statusText': null
    });
  },
  [AUTH_CONST.FORGOT_SUCCESS]: (state, payload) => {
    return Object.assign({}, state, {
      'emailSending': false,
      'emailSent': true,
      'statusText': payload.response.statusText
    });

  },
  [AUTH_CONST.FORGOT_FAILURE]: (state, payload) => {
    return Object.assign({}, state, {
      'emailSending': false,
      'emailSent': false,
      'statusText': payload.error.statusText
    });
  }
});
