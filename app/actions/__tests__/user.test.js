import { LISTEN_FOR_USER_DOCUMENT, RECEIVED_USER_DOCUMENT } from '../../constants/user';
import { listenForUserDocumentAction, receivedUserDocumentAction } from '../user';


describe( 'User action creators', () => {

  it( 'listenForUserDocumentAction() should dispatch a LISTEN_FOR_USER_DOCUMENT event', () => {
    const expectedAction = {
      type: LISTEN_FOR_USER_DOCUMENT,
      payload: 1,
    };

    expect( listenForUserDocumentAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'receivedUserDocumentAction() should dispatch a RECEIVED_USER_DOCUMENT event', () => {
    const expectedAction = {
      type: RECEIVED_USER_DOCUMENT,
      payload: 1,
    }

    expect( receivedUserDocumentAction( 1 ) ).toEqual( expectedAction );
  } );

} );
