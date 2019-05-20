import {
  addProgramAction, addWorkoutAction, buildChangeWeekAction,
  buildDeleteExerciseAction,
  buildEditFieldAction, buildSaveWorkoutAction,
  buildUpdateExerciseOrderAction,
  copyBuildObjectAction,
  createBuildObjectAction,
  editProgramAction, editWorkoutAction,
  openDeleteScreenAction,
  storeBuildObjectConfigAction,
  updateDayTitleAction
} from '../building';
import {
  BUILD_EDIT_PROGRAM,
  ADD_PROGRAM,
  STORE_BUILD_OBJECT_CONFIG,
  CREATE_BUILD_OBJECT,
  UPDATE_DAY_TITLE,
  BUILD_EDIT_FIELD,
  OPEN_DELETE_SCREEN,
  BUILD_DELETE_EXERCISE,
  COPY_BUILD_OBJECT,
  BUILD_CHANGE_WEEK,
  BUILD_SAVE_WORKOUT, ADD_WORKOUT, BUILD_EDIT_WORKOUT
} from '../../constants/building';
import { BUILD_UPDATE_EXERCISE_ORDER } from '../../constants/exercises';


describe( 'Building action creators', () => {

  it( 'editProgramAction() should dispatch BUILD_EDIT_PROGRAM event', () => {
    const expectedAction = {
      type: BUILD_EDIT_PROGRAM,
      payload: 1,
    };

    expect( editProgramAction( 1 ) )
      .toEqual( expectedAction );
  } );

  it( 'addProgramAction() should dispatch ADD_PROGRAM event', () => {
    const expectedAction = {
      type: ADD_PROGRAM,
      payload: 1,
    };

    expect( addProgramAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'storeBuildObjectConfigAction() should dispatch STORE_BUILD_OBJECT_CONFIG event', () => {
    const expectedAction = {
      type: STORE_BUILD_OBJECT_CONFIG,
      payload: 1,
    };

    expect( storeBuildObjectConfigAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'createBuildObjectAction() should dispatch CREATE_BUILD_OBJECT event', () => {
    const expectedAction = {
      type: CREATE_BUILD_OBJECT,
      payload: undefined,
    };

    expect( createBuildObjectAction() ).toEqual( expectedAction );
  } );

  it( 'updateDayTitleAction() should dispatch UPDATE_DAY_TITLE event', () => {
    const expectedAction = {
      type: UPDATE_DAY_TITLE,
      payload: 1,
    };

    expect( updateDayTitleAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildEditFieldAction() should dispatch BUILD_EDIT_FIELD event', () => {
    const expectedAction = {
      type: BUILD_EDIT_FIELD,
      payload: 1,
    };

    expect( buildEditFieldAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildUpdateExerciseOrderAction() should dispatch BUILD_UPDATE_EXERCISE_ORDER event', () => {
    const expectedAction = {
      type: BUILD_UPDATE_EXERCISE_ORDER,
      payload: 1,
    };

    expect( buildUpdateExerciseOrderAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'openDeleteScreenAction() should dispatch OPEN_DELETE_SCREEN event', () => {
    const expectedAction = {
      type: OPEN_DELETE_SCREEN,
      payload: 1,
    };

    expect( openDeleteScreenAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildDeleteExerciseAction() should dispatch BUILD_DELETE_EXERCISE event', () => {
    const expectedAction = {
      type: BUILD_DELETE_EXERCISE,
      payload: 1,
    };

    expect( buildDeleteExerciseAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'copyBuildObjectAction() should dispatch COPY_BUILD_OBJECT event', () => {
    const expectedAction = {
      type: COPY_BUILD_OBJECT,
      payload: 1,
    };

    expect( copyBuildObjectAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildChangeWeekAction() should dispatch BUILD_CHANGE_WEEK event', () => {
    const expectedAction = {
      type: BUILD_CHANGE_WEEK,
      payload: 1,
    };

    expect( buildChangeWeekAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildSaveWorkoutAction() should dispatch BUILD_SAVE_WORKOUT event', () => {
    const expectedAction = {
      type: BUILD_SAVE_WORKOUT,
      payload: 1,
    };

    expect( buildSaveWorkoutAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'addWorkoutAction() should dispatch ADD_WORKOUT event', () => {
    const expectedAction = {
      type: ADD_WORKOUT,
      payload: 1,
    };

    expect( addWorkoutAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'editWorkoutAction() should dispatch BUILD_EDIT_WORKOUT event', () => {
    const expectedAction = {
      type: BUILD_EDIT_WORKOUT,
      payload: 1,
    };

    expect( editWorkoutAction( 1 ) ).toEqual( expectedAction );
  } );

} );
