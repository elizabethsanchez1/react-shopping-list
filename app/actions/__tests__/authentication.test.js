import {
  CREATE_USER_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS, LOG_OUT,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from '../../constants/authentication';
import {
  createUserAction, createUserFailedAction,
  createUserSuccessAction,
  loginFailedAction,
  loginRequestAction,
  loginSuccessAction, logOutAction,
} from '../authentication';


describe( 'authentication creators', () => {

  it( 'loginRequestAction() should dispatch a LOGIN_REQUEST event', () => {
    const expectedAction = {
      type: LOGIN_REQUEST,
      payload: { email: 'test', password: 'test' },
    };

    expect( loginRequestAction( { email: 'test', password: 'test' } ) )
      .toEqual( expectedAction );

  } );

  it( 'loginSuccessAction() should dispatch a LOGIN_SUCCESS event', () => {
    const expectedAction = {
      type: LOGIN_SUCCESS,
      payload: { email: 'test', password: 'test' },
    };

    expect( loginSuccessAction( { email: 'test', password: 'test' } ) )
      .toEqual( expectedAction );
  } );

  it( 'loginFailedAction() should dispatch a LOGIN_FAILED event', () => {
    const expectedAction = {
      type: LOGIN_FAILED,
      payload: undefined,
    };

    expect( loginFailedAction() )
      .toEqual( expectedAction );
  } );

  it( 'createUserAction() should dispatch a CREATE_USER_REQUEST event', () => {
    const expectedAction = {
      type: CREATE_USER_REQUEST,
      payload: { email: 'test', password: 'test' },
    };

    expect( createUserAction( { email: 'test', password: 'test' } ) )
      .toEqual( expectedAction );
  } );

  it( 'createUserSuccess() should dispatch a CREATE_USER_SUCCESS event', () => {
    const expectedAction = {
      type: CREATE_USER_SUCCESS,
      payload: { email: 'test' },
    };

    expect( createUserSuccessAction( { email: 'test' } ) )
      .toEqual( expectedAction );
  } );

  it( 'createUserFailedAction() should dispatch a CREATE_USER_FAILED event', () => {
    const expectedAction = {
      type: CREATE_USER_FAILED,
      payload: { email: 'test' },
    };

    expect( createUserFailedAction( { email: 'test' } ) )
      .toEqual( expectedAction );
  } );

  it( 'logOutAction() should dispatch a LOG_OUT event', () => {
    const expectedAction = {
      type: LOG_OUT,
      payload: undefined,
    };

    expect( logOutAction() )
      .toEqual( expectedAction );
  } );

} );
