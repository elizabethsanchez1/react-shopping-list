import firebase from 'react-native-firebase';
import { takeEvery, call, put, take, select, fork } from 'redux-saga/effects';
import { LOGIN_REQUEST } from '../constants/authentication';
import { loginFailedAction, loginSuccessAction } from '../actions/authentication';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { AUTHENTICATION } from '../constants/reducerObjects';
import { handleErrorAction } from '../actions/errors';


export function* loginREST( email, password ) {
  return yield call(
    [ firebase.auth(), firebase.auth().signInWithEmailAndPassword ],
    email,
    password,
  );
}


export function* login( action ) {
  try {
    yield put( showLoadingAction( { dataType: AUTHENTICATION } ) );
    const response = yield call(
      loginREST,
      action.payload.email,
      action.payload.password,
    );

    const { email, uid } = response.user;
    yield put( loginSuccessAction( { email, uid } ) );
  }
  catch ( error ) {
    console.log( 'error logging in', error );
    yield put( loginFailedAction() );
    yield put( handleErrorAction( { error, dataType: AUTHENTICATION } ) );
  }

  yield put( hideLoadingAction( { dataType: AUTHENTICATION } ) );
}

export function* watchLoginRequest() {
  yield takeEvery( LOGIN_REQUEST, login );
}
