import { takeEvery, call, put, select } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { UPDATE_FIELD_REQUEST } from '../constants/profile';
import { getUid } from '../selectors/user';
import { updateProfileFieldFailedAction, updateProfileFieldSuccessAction } from '../actions/profile';
import { handleErrorAction } from '../actions/errors';
import { PROFILE } from '../constants/reducerObjects';

export function* updateProfileFieldREST( uid, update ) {
  const collection = firebase.firestore().collection( 'users' ).doc( uid );
  return yield call( [ collection, collection.set ], update, { merge: true } );
}

export function* updateProfileField( action ) {
  try {
    const uid = yield select( getUid );
    yield call( updateProfileFieldREST, uid, action.payload );
    yield put( updateProfileFieldSuccessAction() );
  }
  catch ( error ) {
    yield put( updateProfileFieldFailedAction() );
    yield put( handleErrorAction( { error, dataType: PROFILE } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }
}

export function* watchProfileUpdate() {
  yield takeEvery( UPDATE_FIELD_REQUEST, updateProfileField ); 
}
