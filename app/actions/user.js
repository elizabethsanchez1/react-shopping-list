import { LISTEN_FOR_USER_DOCUMENT, RECEIVED_USER_DOCUMENT } from '../constants/user';


export const listenForUserDocumentAction = data => ( {
  type: LISTEN_FOR_USER_DOCUMENT,
  payload: data,
} );

export const receivedUserDocumentAction = data => ( {
  type: RECEIVED_USER_DOCUMENT,
  payload: data,
} );
