import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, put, call, select } from 'redux-saga/effects';
import { BUILD_SAVE_WORKOUT } from '../../constants/building';
import { watchBuildSaveWorkoutRequest, buildSaveWorkout, buildSaveWorkoutREST } from '../building';
import { buildSaveWorkoutAction } from '../../actions/building';
import { hideLoadingAction, showLoadingAction } from '../../actions/loading';
import { BUILDING } from '../../constants/reducerObjects';
import { getBuildSaveInfo } from '../../selectors/building';


describe( 'Building saga functionality', () => {

  describe( 'buildSaveWorkout() saga functionality', () => {

    it( 'watchBuildSaveWorkoutRequest() should create a saga watcher for BUILD_SAVE_WORKOUT_REQUEST event', () => {
      const gen = cloneableGenerator( watchBuildSaveWorkoutRequest )();

      expect( JSON.stringify( gen.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          BUILD_SAVE_WORKOUT,
          buildSaveWorkout,
        ) ) );
    } );

    const action = buildSaveWorkoutAction();
    const gen = cloneableGenerator( buildSaveWorkout )( action );

    it( 'should handle success flow', () => {
      // Date.now = jest.fn( () => 1487076708000 );
      const mockedDate = new Date( 2017, 11, 10 );
      const originalDate = Date;
      global.Date = jest.fn( () => mockedDate );
      global.Date.setDate = originalDate.setDate;


      const buildInfo = { uid: 15, name: 'test', type: 'program', buildObject: {} };
      const completedBuildInfo = {
        ...buildInfo,
        activeAttempt: '',
        attempts: [],
        created: new Date(),
      };

      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: BUILDING } ) ) );

      expect( gen.next().value ).toEqual( select( getBuildSaveInfo ) );

      expect( gen.next( completedBuildInfo ).value )
        .toEqual( call( buildSaveWorkoutREST, completedBuildInfo ) );

      expect( gen.next().value )
        .toEqual( put( hideLoadingAction( { dataType: BUILDING } ) ) );

    } );

  } );

} );
