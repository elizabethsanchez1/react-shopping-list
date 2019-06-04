import { LOG_SELECTED_DAY, LOG_UPDATE_BODY_LOG, LOG_UPDATE_WORKOUT, SAVE_LOG_UPDATE } from '../../constants/logs';
import { logSelectDayAction, logUpdateBodyLogAction, logUpdateWorkoutAction, saveUpdateLogAction } from '../logs';


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

  it( 'saveLogUpdateAction() should dispatch SAVE_LOG_UPDATE', () => {
    const expectedAction = {
      type: SAVE_LOG_UPDATE,
      payload: 1,
    };

    expect( saveUpdateLogAction( 1 ) ).toEqual( expectedAction );
  } );

} );
