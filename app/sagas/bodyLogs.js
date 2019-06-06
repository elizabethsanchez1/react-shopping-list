import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import { BODY_LOGS } from '../constants/reducerObjects';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import {
  listenForBodyLogsAction,
  recievedBodyLogsAction,
} from '../actions/bodyLogs';

export function* bodyLogsListener( uid ) {
  // #1 creat a channel for request actions
  yield put( showLoadingAction( { dataType: BODY_LOGS } ) );
  yield put( listenForBodyLogsAction( { uid } ) );

  const channel = new eventChannel( emiter => {
    const closeListener = firebase.firestore()
      .collection( 'bodyLogs' )
      .where( 'userId', '==', uid )
      .orderBy( 'trackedOn', 'desc' )
      .onSnapshot( querySnapshot => {

        const bodyLogs = [];
        querySnapshot.forEach( document => {
          bodyLogs.push( { uid: document.id, ...document.data() } );
        } );

        emiter( bodyLogs );
      } );

    // #2 return a way to close the firebase listener
    return () => {
      closeListener();
    };
  } );

  // #3 take values from the event channel
  while ( true ) {
    const response = yield take( channel );
    yield put( recievedBodyLogsAction( response ) );
    yield put( hideLoadingAction( { dataType: BODY_LOGS } ) );
  }
}
