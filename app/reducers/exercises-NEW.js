import { LISTEN_FOR_EXERCISE_LIST } from '../constants/exerciseList';
import { baseExerciseList } from '../config/baseExerciseList';
import { SELECT_EXERCISE, SELECT_MUSCLE_GROUP } from '../constants/exercises';


export const handleExerciseSelection = ( state, action ) => {
  const { muscleGroup } = action.payload;
  // const updatedSelections = JSON.parse( JSON.stringify( state.selectedExercises ) );
  //
  // updatedSelections[ muscleGroup ].push( action.payload );

  return {
    ...state,
    selectedExercises: [ ...state.selectedExercises, action.payload ],
  };
};

const exercisesNEW = ( state = {}, action ) => {
  switch ( action.type ) {

    case LISTEN_FOR_EXERCISE_LIST:
      return {
        selectedExercises: [],
      };

    case SELECT_EXERCISE:
      return handleExerciseSelection( state, action );

    case SELECT_MUSCLE_GROUP:
      return {
        ...state,
        selectedMuscleGroup: action.payload,
      };

    default: return state;
  }
};

export default exercisesNEW;
