import { SELECT_EXERCISE, SELECT_MUSCLE_GROUP } from '../../constants/exercises';
import { selectExerciseAction, selectMuscleGroupAction } from '../exercises';


describe( 'exercises action creators', () => {

  it( 'selectMuscleGroupAction() should dispatch  SELECT_MUSCLE_GROUP event', () => {
    const expectedAction = {
      type: SELECT_MUSCLE_GROUP,
      payload: 1,
    };

    expect( selectMuscleGroupAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'selectExerciseAction() should dispatch SELECT_EXERCISE event', () => {
    const expectedAction = {
      type: SELECT_EXERCISE,
      payload: 1,
    };

    expect( selectExerciseAction( 1 ) ).toEqual( expectedAction );
  } );

} );
