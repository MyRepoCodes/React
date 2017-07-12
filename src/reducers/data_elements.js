import { FETCH_DATAELEMENTS } from '../actions/constants';

const INITIAL_STATE = { elements: {}};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case FETCH_DATAELEMENTS:
      return { ...state, elements: action.payload.data.res.data}
    default:
      return state;
  }
}
