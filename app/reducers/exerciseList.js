import { RECEIVED_CUSTOM_EXERCISES, RECEIVED_EXERCISE_LIST } from '../constants/exerciseList';
import { ADD_CUSTOM_EXERCISE_SUCCESS } from '../constants/exercises';


export const sortAlphabetically = list => {
  const clonedList = JSON.parse( JSON.stringify( list ) );

  const sortedList = {};
  Object.keys( clonedList ).forEach( muscleGroup => {
    const sortedExercises = clonedList[ muscleGroup ];
    sortedExercises.sort( ( a, b ) => ( a.name > b.name ) ? 1 : -1 );
    sortedList[ muscleGroup ] = sortedExercises;
  } );

  return sortedList;
};

export const handleReceivingCustomExercises = ( state, action ) => {
  const exercises = action.payload;

  const updatedExerciseList = JSON.parse( JSON.stringify( state ) );

  exercises.forEach( exercise => {
    updatedExerciseList[ exercise.muscleGroup ] = [
      ...updatedExerciseList[ exercise.muscleGroup ],
      {
        ...exercise,
        selected: false,
      },
    ];
  } );

  return sortAlphabetically( updatedExerciseList );
};

export const handleAddingCustomExercise = ( state, action ) => {
  const exercise = { ...action.payload, selected: false };
  const updatedList = {
    ...state,
    [ action.payload.muscleGroup ]: [
      ...state[ action.payload.muscleGroup ],
      exercise,
    ],
  };

  return sortAlphabetically( updatedList );
};

export default function exerciseList( state = {}, action ) {
  switch ( action.type ) {

    case ADD_CUSTOM_EXERCISE_SUCCESS:
      return handleAddingCustomExercise( state, action );

    case RECEIVED_CUSTOM_EXERCISES:
      return handleReceivingCustomExercises( state, action );

    case RECEIVED_EXERCISE_LIST:
      return sortAlphabetically( action.payload.exerciseList );

    default: return state;
  }
}
