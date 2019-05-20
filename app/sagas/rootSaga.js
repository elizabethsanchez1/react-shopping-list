import { all, fork } from 'redux-saga/effects';
import { watchLoginRequest, watchAuthchanges, watchRegisterRequest, watchLogOut } from './authentication';
import { watchProfileUpdate } from './profile';
import { watchAddCustomExercise, watchOpenExerciseList } from './exercises';
import config from '../config/dev.config';
import { watchBuildSaveWorkoutRequest } from './building';


export default function* rootSaga() {
  if ( !config.devCss ) {
    yield all( [
      fork( watchAuthchanges ),
      fork( watchAddCustomExercise ),
      fork( watchBuildSaveWorkoutRequest ),
      fork( watchLoginRequest ),
      fork( watchLogOut ),
      fork( watchOpenExerciseList ),
      fork( watchProfileUpdate ),
      fork( watchRegisterRequest ),
    ] );
  }
}
