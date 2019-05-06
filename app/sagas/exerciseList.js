import { eventChannel } from 'redux-saga';
import { put, take } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { EXERCISE_LIST } from '../constants/reducerObjects';
import { listenForExerciseListAction, receivedExerciseListAction } from '../actions/exerciseList';


export function* exerciseListListener( uid ) {
  // #1
  yield put( showLoadingAction( { dataType: EXERCISE_LIST } ) );
  yield put( listenForExerciseListAction( { uid } ) );

  const channel = new eventChannel( emiter => {
    const listener = firebase.firestore()
      .collection( 'exerciseList' )
      .onSnapshot( snapShot => {

        const savedWorkouts = [];
        snapShot.forEach( doc => {
          savedWorkouts.push( { ...doc.data(), documentId: doc.id } );
        } );

        emiter( { savedWorkouts } );
      } );

    // #2
    return () => {
      listener.off();
    };
  } );

  // #3
  while ( true ) {
    const response = yield take( channel );

    yield put( receivedExerciseListAction( response ) );
    yield put( hideLoadingAction( { dataType: EXERCISE_LIST } ) );
  }
}
