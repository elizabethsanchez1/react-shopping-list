import {
  TRACK_SELECTED_PROGRAM,
  TRACK_SELECTED_WORKOUT,
  TRACK_SELECTED_PROGRAM_DAY,
  TRACK_EDIT_FIELD,
  MODIFY_SETS,
  TRACK_ADD_EXERCISE_INDEX,
  TRACK_ADD_EXERCISES,
  TRACK_REMOVE_EXERCISE, TRACK_SAVE_EXERCISES
} from '../../constants/track';
import {
  trackSelectedProgramAction,
  trackSelectedWorkoutAction,
  trackSelectedDayAction,
  trackEditFieldAction,
  modifySetsAction,
  trackAddExerciseIndexAction,
  trackAddExercisesAction,
  trackRemoveExerciseAction, trackSaveExercisesAction
} from '../track';


describe( 'Track action creators', () => {

  it( 'trackSelectedProgramAction() should dispatch TRACK_SELECTED_PROGRAM', () => {
    const expectedAction = {
      type: TRACK_SELECTED_PROGRAM,
      payload: 1,
    };

    expect( trackSelectedProgramAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackSelectedWorkoutAction() should dispatch TRACK_SELECTED_WORKOUT', () => {
    const expectedAction = {
      type: TRACK_SELECTED_WORKOUT,
      payload: 1,
    };

    expect( trackSelectedWorkoutAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackSelectedDayAction() should dispatch TRACK_SELECTED_PROGRAM_DAY', () => {
    const expectedAction = {
      type: TRACK_SELECTED_PROGRAM_DAY,
      payload: 1,
    };

    expect( trackSelectedDayAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackEditFieldAction() should dispatch TRACK_EDIT_FIELD', () => {
    const expectedAction = {
      type: TRACK_EDIT_FIELD,
      payload: 1,
    };

    expect( trackEditFieldAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'modifySetsAction() should dispatch MODIFY_SETS', () => {
    const expectedAction = {
      type: MODIFY_SETS,
      payload: 1,
    };

    expect( modifySetsAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackAddExerciseIndex() should dispatch TRACK_ADD_EXERCISE_INDEX', () => {
    const expectedAction = {
      type: TRACK_ADD_EXERCISE_INDEX,
      payload: 1,
    };

    expect( trackAddExerciseIndexAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackAddExercisesAction() should dispatch TRACK_ADD_EXERCISES', () => {
    const expectedAction = {
      type: TRACK_ADD_EXERCISES,
      payload: 1,
    };

    expect( trackAddExercisesAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackRemoveExerciseAction() should dispatch TRACK_REMOVE_EXERCISES', () => {
    const expectedAction = {
      type: TRACK_REMOVE_EXERCISE,
      payload: 1,
    };

    expect( trackRemoveExerciseAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'trackSaveExercisesAction() should dispatch TRACK_SAVE_EXERCISES', () => {
    const expectedAction = {
      type: TRACK_SAVE_EXERCISES,
      payload: 1,
    };

    expect( trackSaveExercisesAction( 1 ) ).toEqual( expectedAction );
  } );
} );
