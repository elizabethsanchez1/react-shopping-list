import { LISTEN_FOR_EXERCISE_LIST, RECEIVED_EXERCISE_LIST } from '../../constants/exerciseList';
import { listenForExerciseListAction, receivedExerciseListAction } from '../exerciseList';


describe( 'exercise list action creators', () => {

  it( 'listenForExerciseListAction() should dispatch LISTEN_FOR_EXERCISE_LIST event', () => {
    const expectedAction = {
      type: LISTEN_FOR_EXERCISE_LIST,
      payload: 1,
    };

    expect( listenForExerciseListAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'receivedExerciseListAction() should dispatch RECEIVED_EXERCISE_LIST event', () => {
    const expectedAction = {
      type: RECEIVED_EXERCISE_LIST,
      payload: 1,
    };

    expect( receivedExerciseListAction( 1 ) ).toEqual( expectedAction );
  } );

} );
