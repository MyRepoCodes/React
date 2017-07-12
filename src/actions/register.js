/**
 * @action        : registerChat
 * @description   : Handles actions performed by login users and provide logged in user information
 * @Created by    : smartData
 * @Created       : 30 Jun 2017
 */

 import { checkHttpStatus } from '../utils';

 import { REGISTER_CHAT,
          AXIOS,
          SERVER_URL
        } from './constants';

 //handle state when request is send and resposen is awaited
 export function getRequest(REQUEST) {
    return {
      type: REQUEST
    }
 }

 //handle state in case of resposen is success
 export function getSuccess(SUCCESS, data) {

   return {
     type: SUCCESS,
     payload: data
   }
 }

 //handle state in case of resposen is failure
 export function getFailure(FAILURE, error) {
   return {
     type: FAILURE,
     payload: error
   }
 }

/**
 * [getUserInfo - GET - login user information]
 * @return {[api]} [/users]
 */
export function registerChat() {

    // axios.get('http://localhost:4000/api/registration')
    //   .then(function (response) {
    //     console.log(response);
    //     dispatch(getSuccess(REGISTER_CHAT.REGISTER_CHAT_SUCCESS, {
    //       response: {
    //         statusCode: 200,
    //         statusText: null,
    //         data: response.data.attributes
    //       }
    //     }));
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //      dispatch(getFailure(REGISTER_CHAT.REGISTER_CHAT_FAILURE, {
    //       response: {
    //         statusCode: 403,
    //         statusText: null
    //       }
    //     }));
    //   });
    return function(dispatch) {
      dispatch(getRequest(REGISTER_CHAT.REGISTER_CHAT_REQUEST));

      //let config = { 'headers' : { 'Authorization': '944558cdc33439dc7af48a59a02ce8b6cea53c1fdf966d56176c4183530ef6fa' } };

      AXIOS.get(SERVER_URL + '/api/registration')
      .then(checkHttpStatus)
      .then(function (success) {//console.log(success.data.attributes);
            dispatch(getSuccess(REGISTER_CHAT.REGISTER_CHAT_SUCCESS, {
              response: {
                statusCode: 200,
                statusText: null,
                data: success.data.chatData
              }
            }));
      })
      .catch(function (error) {
          console.log("error - ", error);
          dispatch(getFailure(REGISTER_CHAT.REGISTER_CHAT_FAILURE, {
            response: {
              statusCode: 403,
              statusText: null
            }
          }));
      });
    }
}
