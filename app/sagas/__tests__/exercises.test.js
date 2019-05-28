import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, select, put, call } from 'redux-saga/effects';
import { ADD_CUSTOM_EXERCISE_REQUEST } from '../../constants/exercises';
import {
  watchAddCustomExercise,
  addCustomExercise,
  addCustomExerciseREST,
} from '../exercises';
import {
  addCustomExerciseFailedAction,
  addCustomExerciseRequestAction,
  addCustomExerciseSuccessAction,
} from '../../actions/exercises';
import { hideLoadingAction, showLoadingAction } from '../../actions/loading';
import { EXERCISE_LIST } from '../../constants/reducerObjects';
import { handleErrorAction } from '../../actions/errors';
import { getCustomExercises, getUid } from '../../selectors/user';


describe( 'Exercises saga functionality', () => {

  describe( 'addCustomExercise() saga functionality', () => {
    const data = {
      compound: false,
      isolation: true,
      muscleGroup: 'Shoulders',
      name: 'test',
    };
    const action = addCustomExerciseRequestAction( data );
    const uid = 1;
    const customExercises = [ { text: true } ];
    const exercises = [ ...customExercises, data ];


    it( 'watchAddCustomExercise() should create a saga watcher for ADD_CUSTOM_EXERCISES', () => {
      const gen1 = cloneableGenerator( watchAddCustomExercise )();

      expect( JSON.stringify( gen1.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          ADD_CUSTOM_EXERCISE_REQUEST,
          addCustomExercise,
        ) ) );
    } );

    it( 'should handle success flow', () => {
      const gen = cloneableGenerator( addCustomExercise )( action );

      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: EXERCISE_LIST } ) ) );

      expect( gen.next().value )
        .toEqual( select( getUid ) );

      expect( gen.next( uid ).value )
        .toEqual( select( getCustomExercises ) );

      expect( gen.next( customExercises ).value )
        .toEqual( call( addCustomExerciseREST, uid, exercises ) );

      expect( gen.next().value )
        .toEqual( put( addCustomExerciseSuccessAction( action.payload ) ) );

      expect( gen.next().value )
        .toEqual( put( hideLoadingAction( { dataType: EXERCISE_LIST } ) ) );
    } );

    it( 'should handle error flow', () => {
      const gen = cloneableGenerator( addCustomExercise )( action );
      const error = {};

      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: EXERCISE_LIST } ) ) );

      expect( gen.next().value )
        .toEqual( select( getUid ) );

      expect( gen.next( uid ).value )
        .toEqual( select( getCustomExercises ) );

      expect( gen.next( customExercises ).value )
        .toEqual( call( addCustomExerciseREST, uid, exercises ) );

      expect( gen.throw( error ).value )
        .toEqual( put( addCustomExerciseFailedAction() ) );

      expect( gen.next().value )
        .toEqual( put( handleErrorAction( { error, dataType: EXERCISE_LIST } ) ) );

      expect( gen.next().value )
        .toEqual( put( hideLoadingAction( { dataType: EXERCISE_LIST } ) ) );

    } );

  } );


} );
