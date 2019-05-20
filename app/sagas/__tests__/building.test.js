import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, put, call, select } from 'redux-saga/effects';
import { BUILD_SAVE_WORKOUT } from '../../constants/building';
import {
  watchBuildSaveWorkoutRequest,
  buildSaveWorkout,
  buildSaveWorkoutREST,
  buildUpdateWorkoutREST
} from '../building';
import { buildDeleteExerciseAction, buildSaveWorkoutAction } from '../../actions/building';
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
    const mockedDate = new Date( 2017, 11, 10 );
    const originalDate = Date;
    global.Date = jest.fn( () => mockedDate );
    global.Date.setDate = originalDate.setDate;

    const action = buildSaveWorkoutAction();

    it( 'should handle success flow for created a program', () => {
      const gen = cloneableGenerator( buildSaveWorkout )( action );
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

    it( 'should handle success flow for creating a workout', () => {
      const gen = cloneableGenerator( buildSaveWorkout )( action );
      const buildInfo = { uid: 15, type: 'workout', buildObject: {} };
      const completedBuildInfo = {
        ...buildInfo,
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

    it( 'should handle success flow for editing a program', () => {
      const gen = cloneableGenerator( buildSaveWorkout )( action );
      const buildInfo = { editing: true, uid: 15, name: 'test', type: 'program', buildObject: {} };
      const completedBuildInfo = {
        ...buildInfo,
        activeAttempt: '',
        attempts: [],
        created: new Date(),
      };
      delete completedBuildInfo.editing;

      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: BUILDING } ) ) );

      expect( gen.next().value ).toEqual( select( getBuildSaveInfo ) );

      // expect( gen.next( buildInfo ).value )
      //   .toEqual( call( buildUpdateWorkoutREST, completedBuildInfo ) );


    } );


  } );

} );
