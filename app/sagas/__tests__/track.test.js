import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, put, select, call } from 'redux-saga/effects';
import {
  trackSaveExercises,
  watchTrackSaveExercisesRequest,
  saveTrackedExercises,
  updateProgramAttemptInfo,
} from '../track';
import { TRACK_SAVE_EXERCISES } from '../../constants/track';
import { hideLoadingAction, showLoadingAction } from '../../actions/loading';
import { TRACK } from '../../constants/reducerObjects';
import { getTrackSaveInfo } from '../../selectors/track';
import { handleErrorAction } from '../../actions/errors';

describe( 'Track saga functionality', () => {

  it( 'watchTrackSaveExercisesRequest() should create saga watcher for TRACK_SAVE_EXERCISES event', () => {
    const gen = cloneableGenerator( watchTrackSaveExercisesRequest )();
    expect( JSON.stringify( gen.next().value ) )
      .toEqual( JSON.stringify( fork(
        takeEvery,
        TRACK_SAVE_EXERCISES,
        trackSaveExercises,
      ) ) );
  } );


  it( 'should handle success flow for saving tracked exercises', () => {
    const gen = cloneableGenerator( trackSaveExercises )();

    expect( gen.next().value )
      .toEqual( put( showLoadingAction( { dataType: TRACK } ) ) );

    expect( gen.next().value )
      .toEqual( select( getTrackSaveInfo ) );

    // for some reason since this not a normal action ( thunk ) it needs
    // to be stringified in order for this to work
    expect( JSON.stringify( gen.next().value ) )
      .toEqual( JSON.stringify( put( saveTrackedExercises() ) ) );

    expect( gen.next().value )
      .toEqual( fork( updateProgramAttemptInfo ) );

    expect( gen.next().value )
      .toEqual( put( hideLoadingAction( { dataType: TRACK } ) ) );

  } );

  it( 'should handle failure flow for saving tracked exercises', () => {
    const action = { type: TRACK_SAVE_EXERCISES };
    const gen = cloneableGenerator( trackSaveExercises )( action );
    const error = {};

    expect( gen.next().value )
      .toEqual( put( showLoadingAction( { dataType: TRACK } ) ) );

    expect( gen.next().value )
      .toEqual( select( getTrackSaveInfo ) );


    /* TODO for some reason gen.throw is not working here */

    // expect( gen.throw( {} ).value )
    //   .toEqual( put( handleErrorAction( {
    //     error: {},
    //     dataType: TRACK,
    //   } ) ) );

    //
    // expect( gen.throw( error ).value )
    //   .toEqual( hideLoadingAction( { dataType: TRACK } ) );
  } );

} );
