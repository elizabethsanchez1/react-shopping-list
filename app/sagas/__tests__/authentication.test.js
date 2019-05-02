import { cloneableGenerator } from '@redux-saga/testing-utils';
import { call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  login,
  loginREST,
  watchLoginRequest,
  watchRegisterRequest,
  register,
  registerREST,
  createUserDocumentREST, watchAuthchanges
} from '../authentication';
import { LOGIN_REQUEST, CREATE_USER_REQUEST } from '../../constants/authentication';
import {
  createUserFailedAction,
  createUserSuccessAction,
  loginFailedAction,
  loginSuccessAction
} from '../../actions/authentication';
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

  describe( 'register() saga functionality', () => {
    const action = {
      type: CREATE_USER_REQUEST,
      payload: { email: 'test', password: 'test' },
    };
    const { email, password } = action.payload;
    const gen = cloneableGenerator( register )( action );
    const response = { user: { email: 'test', uid: 1 } };
    const { uid } = response.user;

    it( 'should put showLoadingAction()', () => {
      expect( gen.next().value )
        .toEqual( put( showLoadingAction( { dataType: AUTHENTICATION } ) ) );
    } );

    it( 'should call registerREST', () => {
      expect( gen.next( response ).value ).toEqual( call( registerREST, email, password ) );
    } );

    it( 'should put createUserSuccessAction()', () => {
      expect( gen.next( response ).value )
        .toEqual(
          put( createUserSuccessAction( { email: 'test', uid: 1 } ) ),
        );
    } );

    it( 'should call createUserDocumentREST', () => {
      expect( gen.next().value ).toEqual( call( createUserDocumentREST, uid, email ) );
    } );

    it( 'should handle error by put createUserFailedAction() and put handleErrorAction()', () => {
      const clone = gen.clone();
      const error = {};

      expect( clone.throw( error ).value ).toEqual( put( createUserFailedAction() ) );

      expect( clone.next().value ).toEqual( put(
        handleErrorAction( { error, dataType: AUTHENTICATION } ),
      ) );

    } );

    it( 'should put hideLoadingAction()', () => {
      const payload = { dataType: AUTHENTICATION };
      expect( gen.next().value ).toEqual( put( hideLoadingAction( payload ) ) );
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

    it( 'watchRegisterRequest() should create a saga watcher for CREATE_USER_REQUEST', () => {
      const gen = cloneableGenerator( watchRegisterRequest )();

      expect( JSON.stringify( gen.next().value ) )
        .toEqual( JSON.stringify( fork(
          takeEvery,
          CREATE_USER_REQUEST,
          register,
        ) ) );

    } );

  } );

} );
