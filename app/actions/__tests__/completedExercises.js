import { LISTEN_FOR_COMPLETED_EXERCISES, RECEIVED_COMPLETED_EXERCISES } from '../../constants/completedExercises';
import { listenForCompletedExercisesAction, recievedCompletedExercisesAction } from '../completedExercises';


describe( 'exercises action creators', () => {

  it( 'listenForCompletedExercisesAction() should dispatch LISTEN_FOR_COMPLETED_EXERCISES event', () => {
    const expectedAction = {
      type: LISTEN_FOR_COMPLETED_EXERCISES,
      payload: 1,
    };

    expect( listenForCompletedExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'recievedCompletedExercisesAction() should dispatch RECEIVED_COMPLETED_EXERCISES  event', () => {
    const expectedAction = {
      type: RECEIVED_COMPLETED_EXERCISES,
      payload: 1,
    };

    expect( recievedCompletedExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

} );
