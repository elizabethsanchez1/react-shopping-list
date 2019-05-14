import { takeEvery, select, put } from 'redux-saga/effects';
import { OPEN_EXERCISE_LIST } from '../constants/exercises';
import { getExerciseList } from '../selectors/exerciseList';
import { setUpAddingExercisesAction } from '../actions/exercises';


export function* handleOpenExerciseList() {
  const exerciseList = yield select( getExerciseList );
  yield put( setUpAddingExercisesAction( exerciseList ) );
}

export function* watchOpenExerciseList() {
  yield takeEvery( OPEN_EXERCISE_LIST, handleOpenExerciseList );
}
