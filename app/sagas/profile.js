import { takeEvery, call, put, take, select, fork } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { UPDATE_FIELD_REQUEST } from '../constants/profile';
import { getUid } from '../selectors/user';
import { updateProfileFieldFailedAction, updateProfileFieldSuccessAction } from '../actions/profile';
import { LOG_OUT } from '../constants/authentication';

export function* updateProfileFieldREST( uid, update ) {
  const collection = firebase.firestore().collection( 'users' ).doc( uid );
  return yield call( [ collection, collection.set ], update, { merge: true } );
}

export function* updateProfileField( action ) {
  try {
    const uid = select( getUid );
    yield call( updateProfileFieldREST, uid, action.payload.data );
    yield put( updateProfileFieldSuccessAction() );
  }
  catch ( e ) {
    console.log('profile update failed: ', e);
    yield put( updateProfileFieldFailedAction( e ) );
  }
}

export function* watchProfileUpdate() {
  yield takeEvery( UPDATE_FIELD_REQUEST, updateProfileField ); 
}



