import {
  FETCH_QUEST,
  FETCH_DATAELEMENTS,
  AXIOS,
  SERVER_URL,
  SAVE_ANSWER,
  AUTHTOKEN
} from './constants';

export function fetchQuestionnaire() {
  const config = { 'headers' : { 'Authorization': 'Bearer ' + AUTHTOKEN } };
  const request = AXIOS.get(`${SERVER_URL}/quest/questionnaire/lifescore`, config);

  return {
    type: FETCH_QUEST,
    payload: request
  }
}

export function fetchDataElements(attribute){
  const config = { 'headers' : { 'Authorization': 'Bearer ' + AUTHTOKEN } };
  const request = AXIOS.get(`${SERVER_URL}/quest/dataelements/${attribute}`, config);

  return {
    type: FETCH_DATAELEMENTS,
    payload: request
  }
}

//Call api to save answers given by userData
export function saveAnswer(data){
  const config = { 'headers' : { 'Authorization': 'Bearer ' + AUTHTOKEN } };
  const request = AXIOS.post(`${SERVER_URL}/quest/user_questionnaire`, data, config);

  return {
    type: SAVE_ANSWER,
    payload: request
  }
}
