import { takeEvery, put, select, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { BUILD_SAVE_WORKOUT } from '../constants/building';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { BUILDING } from '../constants/reducerObjects';
import { getBuildSaveInfo } from '../selectors/building';
import NavigationService from '../utilities/navigationService';
import { handleErrorAction } from '../actions/errors';

export function* buildSaveWorkoutREST( buildObject ) {
  const collection = firebase.firestore().collection( 'savedWorkouts' );
  return yield call( [ collection, collection.add ], buildObject );
}

export function* buildUpdateWorkoutREST( buildObject ) {
  const collection = firebase.firestore()
    .collection( 'savedWorkouts' )
    .doc( buildObject.documentId );

  const updateObject = { ...buildObject };
  delete updateObject.documentId;
  return yield call( [ collection, collection.set ], updateObject, { merge: true } );
}

export function* buildSaveWorkout() {
  yield put( showLoadingAction( { dataType: BUILDING } ) );
  const buildInfo = yield select( getBuildSaveInfo );
  let completedBuildInfo = { ...buildInfo };

  try {
    if ( buildInfo.editing ) {
      delete completedBuildInfo.editing;
      yield call( buildUpdateWorkoutREST, completedBuildInfo );
    }

    if ( !buildInfo.editing ) {

      if ( buildInfo.type === 'program' ) {
        completedBuildInfo = {
          ...buildInfo,
          activeAttempt: '',
          attempts: [],
          created: new Date(),
        };
      }

      if ( buildInfo.type === 'workout' ) {
        completedBuildInfo = {
          ...buildInfo,
          created: new Date(),
        };
      }

      yield call( buildSaveWorkoutREST, completedBuildInfo );
    }
  }
  catch ( error ) {
    yield put( handleErrorAction( { error, dataType: BUILDING } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: BUILDING } ) );
  Alert.alert(
    `Successfully saved your ${ buildInfo.type }`,
    '',
    [ {
      text: 'OK',
      onPress: () => NavigationService.navigate( 'BuildDashboard' ),
    } ],
  );
}

export function* watchBuildSaveWorkoutRequest() {
  yield takeEvery( BUILD_SAVE_WORKOUT, buildSaveWorkout );
}
