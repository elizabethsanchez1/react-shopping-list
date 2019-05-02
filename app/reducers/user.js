import { CREATE_USER_SUCCESS, LOGIN_SUCCESS } from '../constants/authentication';
import { RECEIVED_USER_DOCUMENT } from '../constants/user';

const initialState = {
  preferredWeightMeasurement: 'lbs',
};

export default function user( state = initialState, action ) {
  switch ( action.type ) {

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case RECEIVED_USER_DOCUMENT:
      return {
        ...state,
        ...action.payload,
      };

    default: return state;
  }
}
