import {
  LISTEN_FOR_SAVED_WORKOUTS,
  RECEIVED_SAVED_WORKOUTS,
} from '../../constants/savedWorkouts';
import {
  listenForSavedWorkoutsAction,
  receivedSavedWorkoutsAction,
  updateProgramAttemptAction
} from '../savedWorkouts';


describe( 'Program action creators', () => {

  it( 'listenForSavedWorkoutsAction() should dispatch a LISTEN_FOR_SAVED_WORKOUTS event', () => {
    const expectedAction = {
      type: LISTEN_FOR_SAVED_WORKOUTS,
      payload: 1,
    };

    expect( listenForSavedWorkoutsAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'receivedSavedWorkoutsAction() should dispatch a RECEIVED_SAVED_WORKOUTS event', () => {
    const expectedAction = {
      type: RECEIVED_SAVED_WORKOUTS,
      payload: 1,
    };

    expect( receivedSavedWorkoutsAction( 1 ) ).toEqual( expectedAction );
  } );

} );
