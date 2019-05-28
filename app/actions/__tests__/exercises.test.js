import {
  ADD_CUSTOM_EXERCISE_FAILURE,
  ADD_CUSTOM_EXERCISE_REQUEST, ADD_CUSTOM_EXERCISE_SUCCESS,
  BUILDING_ADD_EXERCISES,
  FILTER_EXERCISE_LIST, OPEN_CUSTOM_SET,
  OPEN_EXERCISE_LIST, SAVE_CUSTOM_SET,
  SELECT_EXERCISE,
  SELECT_MUSCLE_GROUP, SETUP_EXERCISE_LIST
} from '../../constants/exercises';
import {
  addCustomExerciseFailedAction,
  addCustomExerciseRequestAction, addCustomExerciseSuccessAction,
  buildingAddExercisesAction,
  filterExerciseListAction, openCustomSetAction,
  openExerciseListAction, saveCustomSetAction,
  selectExerciseAction,
  selectMuscleGroupAction, setUpExerciseListAction
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

  it( 'setUpExerciseListAction() should dispatch SETUP_EXERCISE_LIST event', () => {
    const expectedAction = {
      type: SETUP_EXERCISE_LIST,
      payload: 1,
    };

    expect( setUpExerciseListAction( 1 ) ).toEqual( expectedAction );
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

  it( 'addCustomExerciseRequestAction() should dispatch ADD_CUSTOM_EXERCISE_REQUEST event', () => {
    const expectedAction = {
      type: ADD_CUSTOM_EXERCISE_REQUEST,
      payload: 1,
    };

    expect( addCustomExerciseRequestAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'addCustomExerciseSuccessAction() should dispatch ADD_CUSTOM_EXERCISE_SUCCESS event', () => {
    const expectedAction = {
      type: ADD_CUSTOM_EXERCISE_SUCCESS,
      payload: 1,
    };

    expect( addCustomExerciseSuccessAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'addCustomExerciseFailedAction() should dispatch ADD_CUSTOM_EXERCISE_FAILURE event', () => {
    const expectedAction = {
      type: ADD_CUSTOM_EXERCISE_FAILURE,
      payload: 1,
    };

    expect( addCustomExerciseFailedAction( 1 ) ).toEqual( expectedAction );
  } );

} );
