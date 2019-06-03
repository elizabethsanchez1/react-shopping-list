import { LOG_SELECTED_DAY, LOG_UPDATE_WORKOUT } from '../../constants/logs';
import { logSelectDayAction, logUpdateWorkoutAction } from '../logs';


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

} );
