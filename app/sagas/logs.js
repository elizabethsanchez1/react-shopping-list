import { takeEvery } from 'redux-saga/effects';
import { UPDATE_LOGS_REQUEST } from '../constants/logs';

export function* updateSpecificLog( action ) {
  try {
    
  }
  catch ( error ) {
    
  }
}

export function* watchUpdateLogRequest() {
  yield takeEvery( UPDATE_LOGS_REQUEST, updateSpecificLog );
}
