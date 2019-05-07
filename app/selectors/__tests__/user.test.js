import {
  getUser,
  getAuthenticaton,
  getPreferredWeightMeasurement,
  getUid,
  getName,
  getGender,
  getPrimaryGoal, getEmail
} from '../user';

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

  it( 'getUid() should returns from the user object his Uid', () => {
    const state1 = {
      user: {
        preferredWeightMeasurement: 'lbs',
      },
    };

    expect( getUid( state1 ) ).toEqual( undefined );

    const state2 = {
      user: {
        uid: 1,
        preferredWeightMeasurement: 'lbs',
      },
    };

    expect( getUid( state2 ) ).toEqual( 1 );

  } );

  it( 'getName() should return first and last name', () => {
    const state = {
      user: {
        uid: 1,
        firstName: 'Jose',
        lastName: 'Sanchez',
      },
    };

    expect( getName( state ) ).toEqual( { firstName: 'Jose', lastName: 'Sanchez' } );
  } );

  it( 'getGender() should return gender as a string', () => {
    const state = {
      user: {
        uid: 1,
        gender: 'Male',
      },
    };

    expect( getGender( state ) ).toEqual( 'Male' );
  } );

  it( 'getPrimaryGoal() should return primary goal as a string', () => {
    const state = {
      user: {
        uid: 1,
        primaryGoal: 'Build Strength',
      },
    };

    expect( getPrimaryGoal( state ) ).toEqual( 'Build Strength' );
  } );

  it( 'getEmail() should return email as a string', () => {
    const state = {
      user: {
        uid: 1,
        email: 'email address',
      },
    };

    expect( getEmail( state ) ).toEqual( 'email address' );
  } );

} );
