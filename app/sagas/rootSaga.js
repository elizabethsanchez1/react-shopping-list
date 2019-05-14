import { all, fork } from 'redux-saga/effects';
import { watchLoginRequest, watchAuthchanges, watchRegisterRequest, watchLogOut } from './authentication';
import { watchProfileUpdate } from './profile';
import { watchOpenExerciseList } from './exercises';
import config from '../config/dev.config';


export default function* rootSaga() {
  if ( !config.devCss ) {
    yield all( [
      fork( watchAuthchanges ),
      fork( watchLoginRequest ),
      fork( watchLogOut ),
      fork( watchOpenExerciseList ),
      fork( watchRegisterRequest ),
      fork( watchProfileUpdate ),
    ] );
  }
}
