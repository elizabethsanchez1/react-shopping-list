import { RECEIVED_EXERCISE_LIST } from '../constants/exerciseList';


export default function exerciseList( state = {}, action ) {
  switch ( action.type ) {

    case RECEIVED_EXERCISE_LIST:
      return {
        ...action.payload.exerciseList,
      };

    default: return state;
  }
}
