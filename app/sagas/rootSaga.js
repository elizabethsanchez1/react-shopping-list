import { all, fork } from 'redux-saga/effects';
import { watchLoginRequest, watchAuthchanges, watchRegisterRequest, watchLogOut } from './authentication';
import { watchProfileUpdate } from './profile';

export default function* rootSaga() {
  yield all( [
    fork( watchAuthchanges ),
    fork( watchLoginRequest ),
    fork( watchRegisterRequest ),
    fork( watchProfileUpdate ),
    fork( watchLogOut ),
  ] );
}
