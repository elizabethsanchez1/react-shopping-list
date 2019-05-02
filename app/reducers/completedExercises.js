import { RECEIVED_COMPLETED_EXERCISES } from '../constants/completedExercises';


const completedExercises = ( state = {}, action ) => {
  switch ( action.type ) {
    case RECEIVED_COMPLETED_EXERCISES:
      return {
        ...state,
        exercises: action.payload,
      };

    default: return state;
  }
};

export default completedExercises;
