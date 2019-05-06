import { put, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import firebase from 'react-native-firebase';
import { BODY_LOGS } from '../constants/reducerObjects';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import {
  listenForBodyLogsAction,
  recievedBodyLogsAction,
} from '../actions/bodyLogs';
import dateHelpers from '../utilities/dateHelpers';


export function* bodyLogsListener( uid ) {
  // #1
  yield put( showLoadingAction( { dataType: BODY_LOGS } ) );
  yield put( listenForBodyLogsAction( { uid } ) );

  const channel = new eventChannel( emiter => {
    const listener = firebase.firestore()
      .collection( 'bodyLogs' )
      .where( 'userId', '==', uid )
      .orderBy( 'trackedOn', 'desc' )
      .onSnapshot( querySnapshot => {

        const bodyLogs = [];
        querySnapshot.forEach( document => {
          bodyLogs.push( { uid: document.id, ...document.data() } );
        } );

        // Having firebase do this now
        // const sorted = dateHelpers.sortByDate( bodyLogs, 'descending', 'trackedOn' );

        emiter( bodyLogs );
      } );

    // #2
    return () => {
      listener.off();
    };
  } );

  // #3
  while ( true ) {
    const response = yield take( channel );
    // const { email, uid } = response;

    yield put( recievedBodyLogsAction( response ) );
    yield put( hideLoadingAction( { dataType: BODY_LOGS } ) );
  }
}
