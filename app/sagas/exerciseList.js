import { eventChannel } from 'redux-saga';
import { put, take, fork } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { EXERCISE_LIST } from '../constants/reducerObjects';
import { listenForExerciseListAction, receivedExerciseListAction } from '../actions/exerciseList';
import { LOG_OUT } from '../constants/authentication';


export function* exerciseListListener( uid ) {
  // #1
  yield put( showLoadingAction( { dataType: EXERCISE_LIST } ) );
  yield put( listenForExerciseListAction( { uid } ) );

  const channel = new eventChannel( emiter => {
    const listener = firebase.firestore()
      .collection( 'exerciseList' )
      .onSnapshot( snapShot => {

        const exerciseList = {
          Abs: [],
          Back: [],
          Biceps: [],
          Calves: [],
          Chest: [], // done adding more exercises
          Forearms: [],
          Glutes: [],
          Hamstrings: [],
          Quads: [],
          Shoulders: [], // done adding more exercises
          Traps: [], // done adding more exercises
          Triceps: [],
        };

        snapShot.forEach( doc => {
          const exercise = doc.data();
          exercise.selected = false;
          exerciseList[ exercise.muscleGroup ].push( exercise );
        } );

        emiter( { exerciseList } );
      } );

    // #2
    return () => {
      listener.off();
    };
  } );

  // yield fork( function* () {
  //   yield take( LOG_OUT );
  //   channel.close();
  // } );

  // #3
  while ( true ) {
    const response = yield take( channel );

    yield put( receivedExerciseListAction( response ) );
    yield put( hideLoadingAction( { dataType: EXERCISE_LIST } ) );
  }
}
