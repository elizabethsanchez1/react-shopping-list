import { CLEAR_ERROR, HANDLE_ERROR } from '../constants/errors';


export default function errors( state = {}, action ) {
  switch ( action.type ) {

    case CLEAR_ERROR:
      return {};

    case HANDLE_ERROR:
      return {
        ...state,
        [ action.payload.dataType ]: {
          ...action.payload,
        },
      };

    default: return state;
  }
}
