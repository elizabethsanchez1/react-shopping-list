import exercises from '../completedExercises';
import { recievedCompletedExercisesAction } from '../../actions/completedExercises';

describe( 'Exercises reducer logic', () => {

  it( 'should return initial state', () => {
    expect( exercises( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle RECEIVED_EXERCISES event', () => {
    const savedExercises = [ 1, 2 ];
    const action = recievedCompletedExercisesAction( savedExercises );

    expect( exercises( {}, action ) )
      .toEqual( { exercises: savedExercises } );
  } );

} );
