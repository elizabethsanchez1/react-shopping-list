import { takeEvery, fork } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { updateProfileField, watchProfileUpdate } from '../profile';
import { UPDATE_FIELD_REQUEST } from '../../constants/profile';

describe( 'Profile saga functionality', () => {

  it( 'updateProfileField() saga logic', () => {
    const action = {
      type: UPDATE_FIELD_REQUEST,
      payload: { firstName: 'Jose' },
    };
    const gen = cloneableGenerator( updateProfileField )( action );
  } );


  describe( 'saga watchers', () => {

    it( 'watchProfileUpdate() should create a saga watcher for UPDATE_FIELD_REQUEST', () => {
      const gen = cloneableGenerator( watchProfileUpdate )();

      expect( JSON.stringify( gen.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          UPDATE_FIELD_REQUEST,
          updateProfileField,
        ) ) );
    } );

  } );

} );
