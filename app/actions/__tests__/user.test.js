import { LISTEN_FOR_USER_DOCUMENT, RECIEVED_USER_DOCUMENT } from '../../constants/user';
import { listenForUserDocumentAction, recievedUserDocumentAction } from '../user';


describe( 'User action creators', () => {

  it( 'listenForUserDocumentAction() should dispatch a LISTEN_FOR_USER_DOCUMENT event', () => {
    const expectedAction = {
      type: LISTEN_FOR_USER_DOCUMENT,
      payload: 1,
    };

    expect( listenForUserDocumentAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'recievedUserDocumentAction() should dispatch a RECIEVED_USER_DOCUMENT event', () => {
    const expectedAction = {
      type: RECIEVED_USER_DOCUMENT,
      payload: 1,
    }

    expect( recievedUserDocumentAction( 1 ) ).toEqual( expectedAction );
  } );

} );
