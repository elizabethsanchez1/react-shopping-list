import { LISTEN_FOR_EXERCISE_LIST, RECEIVED_CUSTOM_EXERCISES, RECEIVED_EXERCISE_LIST } from '../constants/exerciseList';


export const listenForExerciseListAction = data => ( {
  type: LISTEN_FOR_EXERCISE_LIST,
  payload: data,
} );

export const receivedExerciseListAction = data => ( {
  type: RECEIVED_EXERCISE_LIST,
  payload: data,
} );

export const receivedCustomExercisesAction = data => ( {
  type: RECEIVED_CUSTOM_EXERCISES,
  payload: data,
} );
