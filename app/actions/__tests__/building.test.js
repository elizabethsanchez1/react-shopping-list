import {
  addProgramAction, buildChangeWeekAction,
  buildDeleteExerciseAction,
  buildEditFieldAction, buildSaveWorkoutAction,
  buildUpdateExerciseOrderAction,
  copyBuildObjectAction,
  createProgramAction,
  editProgramAction,
  openDeleteScreenAction,
  storeProgramConfigAction,
  updateDayTitleAction
} from '../building';
import {
  EDIT_PROGRAM,
  ADD_PROGRAM,
  STORE_PROGRAM_CONFIG,
  CREATE_PROGRAM,
  UPDATE_DAY_TITLE,
  BUILD_EDIT_FIELD,
  OPEN_DELETE_SCREEN,
  BUILD_DELETE_EXERCISE,
  COPY_BUILD_OBJECT,
  BUILD_CHANGE_WEEK,
  BUILD_SAVE_WORKOUT
} from '../../constants/building';
import { BUILD_UPDATE_EXERCISE_ORDER } from '../../constants/exercises';


describe( 'Building action creators', () => {

  it( 'editProgramAction() should dispatch EDIT_PROGRAM event', () => {
    const expectedAction = {
      type: EDIT_PROGRAM,
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

  it( 'storeProgramConfigAction() should dispatch STORE_PROGRAM_CONFIG event', () => {
    const expectedAction = {
      type: STORE_PROGRAM_CONFIG,
      payload: 1,
    };

    expect( storeProgramConfigAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'createProgramAction() should dispatch CREATE_PROGRAM event', () => {
    const expectedAction = {
      type: CREATE_PROGRAM,
      payload: undefined,
    };

    expect( createProgramAction() ).toEqual( expectedAction );
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

} );
