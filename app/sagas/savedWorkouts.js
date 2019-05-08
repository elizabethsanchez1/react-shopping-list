import { eventChannel } from 'redux-saga';
import { put, take, fork } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { BODY_LOGS, SAVED_WORKOUTS } from '../constants/reducerObjects';
import { listenForSavedWorkoutsAction, receivedSavedWorkoutsAction } from '../actions/savedWorkouts';
import dateHelpers from '../utilities/dateHelpers';
import { LOG_OUT } from '../constants/authentication';


export function* savedWorkoutsListener( uid ) {
  // #1
  yield put( showLoadingAction( { dataType: SAVED_WORKOUTS } ) );
  yield put( listenForSavedWorkoutsAction( { uid } ) );

  const channel = new eventChannel( emiter => {
    const listener = firebase.firestore()
      .collection( 'savedWorkouts' )
      .where( 'userId', '==', uid )
      // .orderBy( 'created', 'desc' )
      .onSnapshot( snapShot => {

        const savedWorkouts = [];
        snapShot.forEach( doc => {
          savedWorkouts.push( { ...doc.data(), documentId: doc.id } );
        } );

        const sorted = dateHelpers.sortByDate( savedWorkouts, 'descending', 'created' );

        emiter( { savedWorkouts: sorted } );
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

    yield put( receivedSavedWorkoutsAction( response ) );
    yield put( hideLoadingAction( { dataType: SAVED_WORKOUTS } ) );
  }
}
