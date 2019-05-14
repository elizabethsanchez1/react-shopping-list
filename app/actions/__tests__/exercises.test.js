import {
  BUILDING_ADD_EXERCISES,
  FILTER_EXERCISE_LIST, OPEN_CUSTOM_SET,
  OPEN_EXERCISE_LIST, SAVE_CUSTOM_SET,
  SELECT_EXERCISE,
  SELECT_MUSCLE_GROUP, SETUP_ADDING_EXERCISES
} from '../../constants/exercises';
import {
  buildingAddExercisesAction,
  filterExerciseListAction, openCustomSetAction,
  openExerciseListAction, saveCustomSetAction,
  selectExerciseAction,
  selectMuscleGroupAction, setUpAddingExercisesAction
} from '../exercises';


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

  it( 'openExerciseListAction() should dispatch OPEN_EXERCISE_LIST event', () => {
    const expectedAction = {
      type: OPEN_EXERCISE_LIST,
      payload: 1,
    };

    expect( openExerciseListAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'setUpAddingExercisesAction() should dispatch SETUP_ADDING_EXERCISES event', () => {
    const expectedAction = {
      type: SETUP_ADDING_EXERCISES,
      payload: 1,
    };

    expect( setUpAddingExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildingAddExercisesAction() should dispatch BUILDING_ADD_EXERCISES event', () => {
    const expectedAction = {
      type: BUILDING_ADD_EXERCISES,
      payload: 1,
    };

    expect( buildingAddExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'openCustomSetAction() should dispatch OPEN_CUSTOM_SET event', () => {
    const expectedAction = {
      type: OPEN_CUSTOM_SET,
      payload: 1,
    };

    expect( openCustomSetAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'saveCustomSetAction() should dispatch SAVE_CUSTOM_SET event', () => {
    const expectedAction = {
      type: SAVE_CUSTOM_SET,
      payload: 1,
    };

    expect( saveCustomSetAction( 1 ) ).toEqual( expectedAction );
  } );


} );
