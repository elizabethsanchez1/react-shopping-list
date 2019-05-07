import firebase from 'react-native-firebase';
import { takeEvery, call, put, take, select, fork } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { eventChannel } from 'redux-saga';
import { CREATE_USER_REQUEST, LOG_OUT, LOGIN_REQUEST } from '../constants/authentication';
import {
  createUserFailedAction,
  createUserSuccessAction,
  loginFailedAction,
  loginSuccessAction,
} from '../actions/authentication';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { AUTHENTICATION, BODY_LOGS, EXERCISES, USER } from '../constants/reducerObjects';
import { handleErrorAction } from '../actions/errors';
import { getUser } from '../selectors/user';
import { userDocumentListener } from './user';
import { bodyLogsListener } from './bodyLogs';
import { completedExerciseListener } from './completedExercises';
import { savedWorkoutsListener } from './savedWorkouts';
import { exerciseListListener } from './exerciseList';
import NavigationService from '../utilities/navigationService';

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
    yield put( loginFailedAction() );
    yield put( handleErrorAction( { error, dataType: AUTHENTICATION } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: AUTHENTICATION } ) );
}

export function* watchLoginRequest() {
  yield takeEvery( LOGIN_REQUEST, login );
}

export function* logOutREST() {
  return yield call( [ firebase.auth(), firebase.auth().signOut ] );
}

export function* logOut() {
  try {
    yield call( logOutREST );
    NavigationService.navigate( 'Register' );
    console.log('finished doing log out');
  }
  catch( e ) {
    console.log( 'error logging out', e );
  }
}

export function* watchLogOut() {
  yield takeEvery( LOG_OUT, logOut );
}


export function* createUserDocumentREST( uid, email ) {
  const collection = firebase.firestore().collection( 'users' ).doc( uid );
  return yield call( [ collection, collection.set ], { email } );
}

export function* registerREST( email, password ) {
  return yield call(
    [ firebase.auth(), firebase.auth().createUserWithEmailAndPassword ],
    email,
    password,
  );
}

export function* register( action ) {
  try {
    yield put( showLoadingAction( { dataType: AUTHENTICATION } ) );
    const response = yield call(
      registerREST,
      action.payload.email,
      action.payload.password,
    );

    console.log('what is inside of response after register: ', response);
    const { email, uid } = response.user;
    yield put( createUserSuccessAction( { email, uid } ) );
    yield call( createUserDocumentREST, uid, email );
  }
  catch ( error ) {
    yield put( createUserFailedAction() );
    yield put( handleErrorAction( { error, dataType: AUTHENTICATION } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: AUTHENTICATION } ) );
}

export function* watchRegisterRequest() {
  yield takeEvery( CREATE_USER_REQUEST, register );
}


export function* watchAuthchanges() {

  // #1
  const channel = new eventChannel( emiter => {
    const listener = firebase.auth().onAuthStateChanged( user => {

      if ( user ) {
        emiter( user );
      }
      else {
        emiter( { uid: undefined } );
      }
    } );

    //#2
    return () => listener.off();
  } );

  // #3
  while ( true ) {
    const response = yield take( channel );
    const { email, uid } = response;

    // #4
    const user = yield select( getUser );
    if ( user.uid === undefined && uid ) {
      yield put( loginSuccessAction( { email, uid } ) );

      /*
      * If user logged in token is still there show loading for these data
      * types since the navigation changes faster then the first loading widget
      * can be displayed which causes a weird flicker on the main screens  */
      // yield put( showLoadingAction( { dataType: USER } ) );
      // yield put( showLoadingAction( { dataType: BODY_LOGS } ) );
      // yield put( showLoadingAction( { dataType: BODY_LOGS } ) );
    }

    if ( uid ) {
      yield fork( bodyLogsListener, uid );
      yield fork( userDocumentListener, uid );
      yield fork( completedExerciseListener, uid );
      yield fork( savedWorkoutsListener, uid );
      yield fork( exerciseListListener, uid );
    }

    if ( !uid ) {
      NavigationService.navigate( 'Register' );
    }
    else {
      NavigationService.navigate( 'Profile' );
    }

  }
}
