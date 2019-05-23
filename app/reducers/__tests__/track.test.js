import { trackSelectedProgramAction, trackSelectedWorkoutAction } from '../../actions/track';
import track from '../track';


describe( 'Track reducer unit tests', () => {

  it( 'trackSelectedProgramAction() should dispatch an TRACK_SELECTED_PROGRAM event that will setup the intital config info to start tracking', () => {
    const data = { program: true };
    const action = trackSelectedProgramAction( data );
    const expectedState = {
      type: 'program',
      trackObject: action.payload,
    };

    expect( track( {}, action ) ).toEqual( expectedState );
  } );

  it( 'trackSelectedWorkoutAction() should dispatch an TRACK_SELECTED_WORKOUT event that will setup the intital config info to start tracking', () => {
    const data = { workout: true };
    const action = trackSelectedWorkoutAction( data );
    const expectedState = {
      type: 'workout',
      trackObject: action.payload,
    };

    expect( track( {}, action ) ).toEqual( expectedState );
  } );

} );
