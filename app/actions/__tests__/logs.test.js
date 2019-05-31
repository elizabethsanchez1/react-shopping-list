import { LOG_SELECTED_DAY } from '../../constants/logs';
import { logSelectDayAction } from '../logs';


describe( 'Log action creators', () => {

  it( 'logSelectDayAction() should dispatch LOG_SELECTED_DAY', () => {
    const expectedAction = {
      type: LOG_SELECTED_DAY,
      payload: 1,
    };

    expect( logSelectDayAction( 1 ) ).toEqual( expectedAction );
  } );

} );
