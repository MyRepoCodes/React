import { FETCH_QUEST, SAVE_ANSWER } from '../actions/constants';

const INITIAL_STATE = { all: {}, userData: {}, dataElements: [], save: false };

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_QUEST:
      return { ...state, all: action.payload.data.res.data, userData: action.payload.data.user, dataElements: action.payload.data.dataElements }
    case SAVE_ANSWER:
      return { ...state, save: true, status: action.payload.status};
    default:
      return state;
  }
}
