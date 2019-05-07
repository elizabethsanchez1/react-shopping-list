import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_FAILED, LOG_OUT,
} from '../constants/authentication';


export const loginRequestAction = data => ( {
  type: LOGIN_REQUEST,
  payload: data,
} );

export const loginFailedAction = data => ( {
  type: LOGIN_FAILED,
  payload: data,
} );

export const loginSuccessAction = data => ( {
  type: LOGIN_SUCCESS,
  payload: data,
} );

export const createUserAction = data => ( {
  type: CREATE_USER_REQUEST,
  payload: data,
} );

export const createUserSuccessAction = data => ( {
  type: CREATE_USER_SUCCESS,
  payload: data,
} );

export const createUserFailedAction = data => ( {
  type: CREATE_USER_FAILED,
  payload: data,
} );

export const logOutAction = data => ( {
  type: LOG_OUT,
  payload: data,
} );
