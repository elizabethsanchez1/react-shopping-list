import { cloneableGenerator } from '@redux-saga/testing-utils';
import { takeEvery, fork, select, put } from 'redux-saga/effects';
import { OPEN_EXERCISE_LIST } from '../../constants/exercises';
import { watchOpenExerciseList, handleOpenExerciseList } from '../exercises';
import { getExerciseList } from '../../selectors/exerciseList';
import { setUpAddingExercisesAction } from '../../actions/exercises';


describe( 'Exercises saga functionality', () => {


  describe( 'handleOpenExerciseList() saga functionality', () => {

    it( 'watchSelectMuscleGroup() should create a saga watcher for SELECT_MUSCLE_MUSCLE group', () => {
      const gen = cloneableGenerator( watchOpenExerciseList )();

      expect( JSON.stringify( gen.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          OPEN_EXERCISE_LIST,
          handleOpenExerciseList,
        ) ) );
    } );

    it( 'handleOPenExerciseList() should grab a copy of the exerciseList and dispatch another action to store it in the exercises reducer', () => {
      const gen = cloneableGenerator( handleOpenExerciseList )();

      expect( gen.next().value ).toEqual( select( getExerciseList ) );

      expect( gen.next().value ).toEqual( put( setUpAddingExercisesAction() ) );

    } );

  } );


} );
