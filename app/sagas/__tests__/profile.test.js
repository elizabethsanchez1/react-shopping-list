import { takeEvery, fork, select, call, put } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import { updateProfileField, updateProfileFieldREST, watchProfileUpdate } from '../profile';
import { UPDATE_FIELD_REQUEST } from '../../constants/profile';
import { getUid } from '../../selectors/user';
import {
  updateProfileFieldFailedAction,
  updateProfileFieldRequestAction,
  updateProfileFieldSuccessAction
} from '../../actions/profile';
import { PROFILE } from '../../constants/reducerObjects';
import { handleErrorAction } from '../../actions/errors';

describe( 'Profile saga functionality', () => {

  it( 'updateProfileField() saga logic', () => {
    // const action = {
    //   type: UPDATE_FIELD_REQUEST,
    //   payload: { firstName: 'Jose' },
    // };

    const action = updateProfileFieldRequestAction( { firstName: 'Jose' } );

    const gen = cloneableGenerator( updateProfileField )( action );
    const uid = 1;

    expect( gen.next().value ).toEqual( select( getUid ) );
    expect( gen.next( uid ).value )
      .toEqual( call( updateProfileFieldREST, uid, { firstName: 'Jose' } ) );

    // Error Flow
    const clone = gen.clone();
    const error = {};
    expect( clone.throw( error ).value )
      .toEqual( put( updateProfileFieldFailedAction() ) );

    expect( clone.next().value )
      .toEqual( put( handleErrorAction( { error, dataType: PROFILE } ) ) );

    // Resume success flow
    expect( gen.next().value ).toEqual( put( updateProfileFieldSuccessAction() ) );


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
