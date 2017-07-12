/**
 * @reducer       : signup reducer
 * @description   :
 * @Created by    : smartData
 */

import { createReducer } from '../utils';
import { REGISTER_CHAT } from '../actions/constants';

 const initialState = {
     data: null,
     isAuthenticated: false,
     isAuthenticating: false

 };

 export default createReducer(initialState, {

     [REGISTER_CHAT.REGISTER_CHAT_REQUEST]: (state, payload) => {
         return Object.assign({}, state, {
             'isAuthenticating': true,
             'isAuthenticated': false,
             'statusText': null,
             'data': null
         });
     },
     [REGISTER_CHAT.REGISTER_CHAT_SUCCESS]: (state, payload) => {
         //console.log("payload",payload.response.data[0].st_text);
         return Object.assign({}, state, {
             'isAuthenticating': false,
             'isAuthenticated': true,
             'data': payload.response.data,
             'statusText': null
         });

     },
     [REGISTER_CHAT.REGISTER_CHAT_FAILURE]: (state, payload) => {
         return Object.assign({}, state, {
             'isAuthenticating': false,
             'isAuthenticated': false,
             //'statusText': payload.error.statusText,
             'data': null
        });
    }
 });
