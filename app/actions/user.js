import { LISTEN_FOR_USER_DOCUMENT, RECIEVED_USER_DOCUMENT } from '../constants/user';


export const listenForUserDocumentAction = data => ( {
  type: LISTEN_FOR_USER_DOCUMENT,
  payload: data,
} );

export const recievedUserDocumentAction = data => ( {
  type: RECIEVED_USER_DOCUMENT,
  payload: data,
} );
