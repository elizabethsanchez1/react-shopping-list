import { LISTEN_FOR_SAVED_WORKOUTS, RECEIVED_SAVED_WORKOUTS } from '../constants/savedWorkouts';


export const listenForSavedWorkoutsAction = data => ( {
  type: LISTEN_FOR_SAVED_WORKOUTS,
  payload: data,
} );

export const receivedSavedWorkoutsAction = data => ( {
  type: RECEIVED_SAVED_WORKOUTS,
  payload: data,
} );
