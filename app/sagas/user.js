import { put, take } from 'redux-saga/effects';
import firebase from 'react-native-firebase';
import { eventChannel } from 'redux-saga';
import { hideLoadingAction, showLoadingAction } from '../actions/loading';
import { USER } from '../constants/reducerObjects';
import { listenForUserDocumentAction, receivedUserDocumentAction } from '../actions/user';


export function* userDocumentListener( uid ) {
  yield put( showLoadingAction( { dataType: USER } ) );
  yield put( listenForUserDocumentAction( { uid } ) );

  const channel = new eventChannel( emiter => {

    const listener = firebase.firestore().collection( 'users' ).doc( uid ).onSnapshot( querySnapshot => {

      emiter( { ...querySnapshot.data() } );
    } );

    // #2
    return () => {
      listener.off();
    };
  } );

  // #3
  while ( true ) {
    const response = yield take( channel );

    yield put( receivedUserDocumentAction( response ) );
    yield put( hideLoadingAction( { dataType: USER } ) );
  }

}
