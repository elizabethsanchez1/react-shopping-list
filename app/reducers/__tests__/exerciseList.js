import exerciseList from '../exerciseList';
import { receivedExerciseListAction } from '../../actions/exerciseList';

describe( 'exercise list reducer', () => {

  it( 'should return initial state', () => {
    expect( exerciseList( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle storing exercise in response to RECEIVED_EXERCISE_LIST event', () => {
    const action = receivedExerciseListAction(
      { exerciseList: { abs: 'test' } },
    );
    expect( exerciseList( {}, action ) )
      .toEqual( { abs: 'test' } );
  } );

} );
