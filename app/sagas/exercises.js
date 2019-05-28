import { takeEvery, select, put, call } from 'redux-saga/effects';
import { Alert } from 'react-native';
import firebase from 'react-native-firebase';
import { ADD_CUSTOM_EXERCISE_REQUEST } from '../constants/exercises';
import {
  addCustomExerciseFailedAction,
  addCustomExerciseSuccessAction,
} from '../actions/exercises';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { EXERCISE_LIST } from '../constants/reducerObjects';
import { handleErrorAction } from '../actions/errors';
import { getCustomExercises, getUid } from '../selectors/user';
import NavigationService from '../utilities/navigationService';


export function* addCustomExerciseREST( uid, exercises ) {
  const collection = firebase.firestore().collection( 'users' ).doc( uid );
  const data = { customExercises: exercises };
  return yield call( [ collection, collection.set ], data, { merge: true } );
}

export function* addCustomExercise( action ) {
  try {
    yield put( showLoadingAction( { dataType: EXERCISE_LIST } ) );
    const uid = yield select( getUid );
    const customExercises = yield select( getCustomExercises );
    const exercises = [ ...customExercises, action.payload ];
    yield call( addCustomExerciseREST, uid, exercises );
    yield put( addCustomExerciseSuccessAction( action.payload ) );
    Alert.alert( 'Successfully Added Exercise', '', [ { text: 'OK' } ] );
  }
  catch ( error ) {
    yield put( addCustomExerciseFailedAction() );
    yield put( handleErrorAction( { error, dataType: EXERCISE_LIST } ) );
    Alert.alert( 'Error', error.message, [ { text: 'OK' } ] );
  }

  yield put( hideLoadingAction( { dataType: EXERCISE_LIST } ) );
  NavigationService.navigate( 'MuscleGroupList' );
}

export function* watchAddCustomExercise() {
  yield takeEvery( ADD_CUSTOM_EXERCISE_REQUEST, addCustomExercise );
}
