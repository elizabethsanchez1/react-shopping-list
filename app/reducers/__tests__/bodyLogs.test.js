import bodyLogs from '../bodyLogs';
import { RECIEVED_BODY_LOGS } from '../../constants/bodyLogs';
import { listenForBodyLogsAction, recievedBodyLogsAction } from '../../actions/bodyLogs';
import moment from 'moment';


describe( 'Body logs reducer', () => {

  it( 'should return initial state', () => {
    expect( bodyLogs( [], {} ) ).toEqual( [] );
  } );

  it( 'should handle RECIEVED_BODY_LOGS event', () => {
    const data = [
      {
        trackedOn: {
          seconds: 1552453200,
          nanoseconds: 0,
        },
      },
      {
        trackedOn: {
          seconds: 1555045200,
          nanoseconds: 0,
        },
      },
    ];
    const action = recievedBodyLogsAction( data );

    const expectedState = [
      {
        trackedOn: {
          formatted:'03/13/2019',
          seconds: 1552453200,
          nanoseconds: 0,
        },
      },
      {
        trackedOn: {
          formatted: '04/12/2019',
          seconds: 1555045200,
          nanoseconds: 0,
        },
      },
    ];

    expect( bodyLogs( [], action ) )
      .toEqual( expectedState );
  } );

} );
