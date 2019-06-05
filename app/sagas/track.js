import { takeEvery, put, select, call, fork } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { TRACK_SAVE_EXERCISES } from '../constants/track';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { TRACK } from '../constants/reducerObjects';
import { getTrackSaveInfo } from '../selectors/track';
import { handleErrorAction } from '../actions/errors';
import NavigationService from '../utilities/navigationService';
import { calculateProgramAttemptInfo } from '../selectors/savedWorkouts';

// REDUX THUNK, BATCH WRITE NOT SUPPORTED EASILY IN REDUX SAGAS
export const saveTrackedExercisesREST = exercises => () => {
  const exercisesCollection = firebase.firestore().collection( 'completedExercises' );
  const batch = firebase.firestore().batch();
  exercises.forEach( exercise => batch.set( exercisesCollection.doc(), exercise ) );
  return batch.commit();
};

export function* updateProgramAttemptInfo() {
  const { update, program, documentId } = yield select( calculateProgramAttemptInfo );

  if ( update ) {
    const collection = firebase.firestore()
      .collection( 'savedWorkouts' )
      .doc( documentId );

    return yield call(
      [ collection, collection.set ],
      program,
      { merge: true },
    );
  }

  return true;
}

export function* trackSaveExercises() {
  yield put( showLoadingAction( { dataType: TRACK } ) );
  const trackExercises = yield select( getTrackSaveInfo );

  try {
    yield put( saveTrackedExercisesREST( trackExercises ) );
    yield fork( updateProgramAttemptInfo );
  }
  catch ( error ) {
    yield put( handleErrorAction( { error, dataType: TRACK } ) );
    yield put( hideLoadingAction( { dataType: TRACK } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: TRACK } ) );
  Alert.alert(
    'Successfully tracked your exercises',
    '',
    [ {
      text: 'OK',
      onPress: () => NavigationService.navigate( 'TrackSummary' ),
    } ],
  );
}

export function* watchTrackSaveExercisesRequest() {
  yield takeEvery( TRACK_SAVE_EXERCISES, trackSaveExercises );
}
