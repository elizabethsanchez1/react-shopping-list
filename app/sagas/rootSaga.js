import { all, fork } from 'redux-saga/effects';
import { watchLoginRequest, watchAuthchanges, watchRegisterRequest, watchLogOut } from './authentication';
import { watchProfileUpdate } from './profile';
import { watchAddCustomExercise } from './exercises';
import config from '../config/dev.config';
import { watchBuildSaveWorkoutRequest } from './building';
import { watchTrackSaveExercisesRequest } from './track';
import { watchUpdateLogRequest } from './logs';


export default function* rootSaga() {
  if ( !config.devCss ) {
    yield all( [
      fork( watchAuthchanges ),
      fork( watchAddCustomExercise ),
      fork( watchBuildSaveWorkoutRequest ),
      fork( watchLoginRequest ),
      fork( watchLogOut ),
      fork( watchProfileUpdate ),
      fork( watchRegisterRequest ),
      fork( watchTrackSaveExercisesRequest ),
      fork( watchUpdateLogRequest ),
    ] );
  }
}
