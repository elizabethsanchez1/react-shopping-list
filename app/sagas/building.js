import { takeEvery, put, select, call } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { Alert } from 'react-native';
import { BUILD_SAVE_WORKOUT } from '../constants/building';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { BUILDING } from '../constants/reducerObjects';
import { getBuildSaveInfo } from '../selectors/building';
import NavigationService from '../utilities/navigationService';

export function* buildSaveWorkoutREST( buildInfo ) {
  const collection = firebase.firestore().collection( 'savedWorkouts' );
  return yield call( [ collection, collection.add ], buildInfo );
}

export function* buildSaveWorkout() {
  yield put( showLoadingAction( { dataType: BUILDING } ) );
  const buildInfo = yield select( getBuildSaveInfo );

  try {
    let completedBuildInfo;

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
  catch ( error ) {
    console.log( 'build save workout error: ', error );
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
