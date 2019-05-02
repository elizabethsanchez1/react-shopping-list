import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { EXERCISES } from '../constants/reducerObjects';
import { listenForCompletedExercisesAction, recievedCompletedExercisesAction } from '../actions/completedExercises';


export function* completedExerciseListener( uid ) {
  yield put( showLoadingAction( { dataType: EXERCISES } ) );
  yield put( listenForCompletedExercisesAction( { uid } ) );

  const channel = new eventChannel( emiter => {

    const listener = firebase.firestore()
      .collection( 'completedExercises' )
      .where( 'userId', '==', uid )
      .onSnapshot( snapshot => {

        const completedExercises = [];
        snapshot.forEach( doc => completedExercises.push( { ...doc.data() } ) )
        emiter( completedExercises );
      } );

    // #2
    return () => {
      listener.off();
    };
  } );

  // #3
  while ( true ) {
    const response = yield take( channel );

    yield put( recievedCompletedExercisesAction( response ) );
    yield put( hideLoadingAction( { dataType: EXERCISES } ) );
  }
}
