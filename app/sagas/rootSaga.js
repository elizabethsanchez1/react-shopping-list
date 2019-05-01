import { all, fork } from 'redux-saga/effects';
import { watchLoginRequest, watchAuthchanges, watchRegisterRequest } from './authentication';

export default function* rootSaga() {
  yield all( [
    fork( watchAuthchanges ),
    fork( watchLoginRequest ),
    fork( watchRegisterRequest ),
  ] );
}
