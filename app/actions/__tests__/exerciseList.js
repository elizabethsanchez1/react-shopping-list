import {
  LISTEN_FOR_EXERCISE_LIST,
  RECEIVED_CUSTOM_EXERCISES,
  RECEIVED_EXERCISE_LIST
} from '../../constants/exerciseList';
import {
  listenForExerciseListAction,
  receivedCustomExercisesAction,
  receivedExerciseListAction
} from '../exerciseList';


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

  it( 'receivedCustomExercisesAction() should dispatch RECEIVED_CUSTOM_EXERCISES event', () => {
    const expectedAction = {
      type: RECEIVED_CUSTOM_EXERCISES,
      payload: 1,
    };

    expect( receivedCustomExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

} );
