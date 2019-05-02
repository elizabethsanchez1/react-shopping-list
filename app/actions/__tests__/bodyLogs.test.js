import {
  LISTEN_FOR_BODY_LOGS,
  RECIEVED_BODY_LOGS
} from '../../constants/bodyLogs';
import {
  listenForBodyLogsAction,
  recievedBodyLogsAction
} from '../bodyLogs';


describe( 'Body logs action creators', () => {

  it( 'listenForBodyLogsAction() should dispatch LISTEN_FOR_BODY_LOGS', () => {
    const expectedAction = {
      type: LISTEN_FOR_BODY_LOGS,
      payload: 1,
    };

    expect( listenForBodyLogsAction( 1 ) )
      .toEqual( expectedAction );
  } );

  it( 'recievedBodyLogsAction() should dispatch RECIEVED_BODY_LOGS', () => {
    const expectedAction = {
      type: RECIEVED_BODY_LOGS,
      payload: [ 1, 2 ],
    };

    expect( recievedBodyLogsAction( [ 1, 2 ] ) ).toEqual( expectedAction );
  } );

} );