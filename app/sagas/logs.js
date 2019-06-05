import { takeLatest, put, select, fork, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { SAVE_LOGS } from '../constants/logs';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { LOGS } from '../constants/reducerObjects';
import { getBodyLogsinSaveFormat, getLogChangeFlags } from '../selectors/logs';
import { handleErrorAction } from '../actions/errors';
import { getUid } from '../selectors/user';

export function* SaveBodyLogsREST( uid ) {
  const bodyLogs = yield select( getBodyLogsinSaveFormat );
  const data = {
    ...bodyLogs,
    trackedOn: new Date(),
    userId: uid,
  };

  const collection = firebase.firestore().collection( 'bodyLogs' );
  return yield call( [ collection, collection.add ], data );
}

export function* SaveWorkoutLogsREST( uid ) {
  //const workoutLogs = yield select();

}

export function* SaveLogs( action ) {
  try {
    yield put( showLoadingAction( { dataType: LOGS } ) );
    const { changedBodyLogs, changedExercises } = yield select( getLogChangeFlags );
    const uid = yield select( getUid );

    if ( changedBodyLogs ) {
      yield fork( SaveBodyLogsREST, uid );
    }

    if ( changedExercises ) {
      yield fork( SaveWorkoutLogsREST, uid );
    }

    Alert.alert( 'Saved Logs', '', [ { text: 'OK' } ] );
  }
  catch ( error ) {
    yield put( handleErrorAction( { error, dataType: LOGS } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: LOGS } ) );
}

export function* watchSaveLogRequest() {
  yield takeLatest( SAVE_LOGS, SaveLogs );
}
