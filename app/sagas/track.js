import { takeEvery, put, select, call, fork } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { TRACK_SAVE_EXERCISES } from '../constants/track';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { TRACK } from '../constants/reducerObjects';
import { calculateActiveAttempt, getTrackDocumentId, getTrackSaveInfo } from '../selectors/track';
import { handleErrorAction } from '../actions/errors';
import NavigationService from '../utilities/navigationService';
import { getProgramByDocumentId } from '../selectors/savedWorkouts';

export const saveTrackedExercisesREST = exercises => {
  const exercisesCollection = firebase.firestore().collection( 'completedExercises' );
  const batch = firebase.firestore().batch();
  exercises.forEach( exercise => batch.set( exercisesCollection.doc(), exercise ) );
  return batch.commit();
};

export const saveTrackedExercises = exercises => async () => {
  await saveTrackedExercisesREST( exercises );
};

export function* updateProgramAttemptInfo() {
  const documentId = yield select( getTrackDocumentId );
  const program = yield select( getProgramByDocumentId, documentId );
  const activeAttempt = yield select( calculateActiveAttempt );
  let updatedProgram = {};

  if ( !program.attempts.includes( activeAttempt ) ) {
    const attempt = {
      attempt: activeAttempt,
      startedTracking: new Date(),
      finishedTracking: '',
    };

    updatedProgram = {
      ...program,
      activeAttempt,
      attempts: [ ...program.attempts, attempt ],
    };

    const collection = firebase.firestore()
      .collection( 'savedWorkouts' )
      .doc( documentId );

    return yield call(
      [ collection, collection.set ],
      updatedProgram,
      { merge: true },
    );
  }

  return true;
}

export function* trackSaveExercises() {
  yield put( showLoadingAction( { dataType: TRACK } ) );
  const trackExercises = yield select( getTrackSaveInfo );

  try {
    yield put( saveTrackedExercises( trackExercises ) );
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
