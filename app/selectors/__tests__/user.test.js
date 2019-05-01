import { getUser, getAuthenticaton, getPreferredWeightMeasurement } from '../user';

const state = {
  user: {
    email: '',
    uid: '',
    preferredWeightMeasurement: 'lbs',
  },
};

describe( 'user selectors', () => {

  it( 'should user the user reducer', () => {
    expect( getUser( state ) ).toEqual( { email: '', uid: '', preferredWeightMeasurement: 'lbs' } );
  } );

  it( 'should return boolean depending on whether the user is logged in', () => {
    const loggedOutState = { user: {} };
    expect( getAuthenticaton( loggedOutState ) ).toEqual( false );

    const loggedInState = {
      user: {
        email: 'test@gmail.com',
        uid: 1,
      },
    };
    expect( getAuthenticaton( loggedInState ) ).toEqual( true );
  } );

  it( 'getPrefferedWeightMeasurement() should return either lbs or kgs', () => {

    expect( getPreferredWeightMeasurement( state ) ).toEqual( 'lbs' );

  } );

} );
