import { LISTEN_FOR_COMPLETED_EXERCISES, RECEIVED_COMPLETED_EXERCISES } from '../constants/completedExercises';

export const listenForCompletedExercisesAction = data => ( {
  type: LISTEN_FOR_COMPLETED_EXERCISES,
  payload: data,
} );

export const recievedCompletedExercisesAction = data => ( {
  type: RECEIVED_COMPLETED_EXERCISES,
  payload: data,
} );
