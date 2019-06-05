import {
  LOG_SELECTED_DAY,
  LOG_UPDATE_BODY_LOG,
  LOG_UPDATE_WORKOUT,
  SAVE_LOGS,
  SAVE_LOGS_FAILED,
} from '../../constants/logs';
import {
  logSelectDayAction,
  logUpdateBodyLogAction,
  logUpdateWorkoutAction,
  saveLogsAction,
  saveLogsFailedAction,
} from '../logs';


describe( 'Log action creators', () => {

  it( 'logSelectDayAction() should dispatch LOG_SELECTED_DAY', () => {
    const expectedAction = {
      type: LOG_SELECTED_DAY,
      payload: 1,
    };

    expect( logSelectDayAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'logUpdateWorkoutAction() should dispatch LOG_UPDATE_WORKOUT', () => {
    const expectedAction = {
      type: LOG_UPDATE_WORKOUT,
      payload: 1,
    };

    expect( logUpdateWorkoutAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'logUpdateBodyLogAction() should dispatch LOG_UPDATE_BODY_LOG', () => {
    const expectedAction = {
      type: LOG_UPDATE_BODY_LOG,
      payload: 1,
    };

    expect( logUpdateBodyLogAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'saveLogsAction() should dispatch SAVE_LOGS', () => {
    const expectedAction = {
      type: SAVE_LOGS,
      payload: 1,
    };

    expect( saveLogsAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'saveLogsAction() should dispatch SAVE_LOGS_FAILED', () => {
    const expectedAction = {
      type: SAVE_LOGS_FAILED,
      payload: 1,
    };

    expect( saveLogsFailedAction( 1 ) ).toEqual( expectedAction );
  } );

} );
