import user from '../user';
import { loginSuccessAction } from '../../actions/authentication';


const initialState = {
  preferredWeightMeasurement: 'lbs',
};

describe( 'user reducer unit tests', () => {

  it( 'should return initial state', () => {
    expect( user( initialState, {} ) ).toEqual( initialState );
  } );

  it( 'should store user info in respone to LOGIN_SUCCESS event', () => {
    const action = loginSuccessAction( {
      email: 'test',
      id: 1,
    } );
    const expectedState = { email: 'test', id: 1, preferredWeightMeasurement: 'lbs' };

    expect( user( initialState, action ) ).toEqual( expectedState );
  } );

} );
