import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import { login, loginREST, watchLoginRequest } from '../authentication';
import { LOGIN_REQUEST } from '../../constants/authentication';
import { loginFailedAction, loginSuccessAction } from '../../actions/authentication';
import { hideLoadingAction, showLoadingAction } from '../../actions/loading';
import { AUTHENTICATION } from '../../constants/reducerObjects';
import { handleErrorAction } from '../../actions/errors';

/*
*
* What is the unit under test? ( module, function, class )
* What should it do?
* What was the actual output?
* What was the expected output?
* How do your reproduce the failure?
*
* */


describe( 'Authentication saga functionality', () => {

  describe( 'login() saga functionality', () => {
    const action = {
      type: LOGIN_REQUEST,
      payload: { email: 'test', password: 'test' },
    };
    const { email, password } = action.payload;
    const gen = cloneableGenerator( login )( action );

    it( 'should put showLoadingAction()', () => {
      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: AUTHENTICATION } ) ) );
    } );

    it( 'should call loginREST', () => {
      const response = {};
      expect( gen.next( response ).value ).toEqual( call( loginREST, email, password ) );
    } );

    it( 'should handle error by put loginFailedAction() and put handleErrorAction()', () => {
      const clone = gen.clone();
      const error = {};
      const user = { email: '', user: '' };

      clone.next( user );

      expect( clone.throw( error ).value ).toEqual( put( loginFailedAction() ) );

      expect( clone.next().value ).toEqual( put(
        handleErrorAction( { error, dataType: AUTHENTICATION } ),
      ) );

    } );

    it( 'should put loginSuccesstAction()', () => {
      const response = { user: { email: '', uid: '' } };
      expect( gen.next( response ).value )
        .toEqual(
          put( loginSuccessAction( { email: '', uid: '' } ) ),
        );
    } );

    it( 'should put hideLoadingAction()', () => {
      const payload = { dataType: AUTHENTICATION };
      expect( gen.next().value ).toEqual( put( hideLoadingAction( payload ) ) );
    } );

    it( 'login() saga should be finished', () => {
      expect( gen.next().done ).toEqual( true );
    } );

  } );


  describe( 'saga watcher', () => {
    it( 'watchLoginRequest() should create a saga watcher for LOGIN_REQUEST', () => {
      const gen = cloneableGenerator( watchLoginRequest )();

      expect( JSON.stringify( gen.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          LOGIN_REQUEST,
          login,
        ) ) );
    } );


    // it( 'watchAuthChange() should create a saga watcher for auth event emitter', () => {
    //   const gen = cloneableGenerator( watchAuthChanges )();
    //
    //   expect( JSON.stringify( gen.next().value ) )
    //     .toEqual( JSON.stringify( fork(
    //       takeEvery,
    //     ) ) )
    // } );
  } );

} );
