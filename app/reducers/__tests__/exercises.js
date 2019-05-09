import exercisesNEW from '../exercises-NEW';
import { listenForExerciseListAction } from '../../actions/exerciseList';
import { selectExerciseAction, selectMuscleGroupAction } from '../../actions/exercises';

describe( 'exercises-NEW reducer unit tests', () => {

  it( 'should return initial state', () => {
    expect( exercisesNEW( {}, {} ) ).toEqual( {} );
  } );

  it( 'listenForExerciseListAction() should create a base exercise list from the baseExerciseList variable inside of a config file to handle adding exercise in response to LISTEN_FOR_EXERCISE_LIST event from the server', () => {
    const action = listenForExerciseListAction();
    const expectedState = {
      selectedExercises: [],
    };

    expect( exercisesNEW( {}, action ) ).toEqual( expectedState );
  } );

  it( 'selectMusclegroupAction()  should store selected muscle group in response to SELECT_MUSCLE_GROUP event', () => {

    const action = selectMuscleGroupAction( 'Abs' );
    const expectedState = {
      selectedMuscleGroup: 'Abs',
    };

    expect( exercisesNEW( {}, action ) ).toEqual( expectedState );
  } );

  it( 'selectExercise() should store selected exercise', () => {
    const action = selectExerciseAction( {
      'compound': false,
      'name': 'Situps',
      'muscleGroup': 'Abs',
      'isolation': true,
      'selected': false,
    } );

    const previousState = {
      selectedExercises: [],
    };

    const expectedState = {
      selectedExercises: [ {
        'compound': false,
        'name': 'Situps',
        'muscleGroup': 'Abs',
        'isolation': true,
        'selected': false,
      } ],
    };

    expect( exercisesNEW( previousState, action ) ).toEqual( expectedState );

  } );


} );
