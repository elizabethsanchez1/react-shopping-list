import errors from '../errors';
import { AUTHENTICATION } from '../../constants/reducerObjects';
import { clearErrorAction, handleErrorAction } from '../../actions/errors';


describe( 'errors reducer unit tests', () => {

  it( 'should return initial state', () => {
    expect( errors( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle storing error in response to HANDLE_ERROR event', () => {
    const action = handleErrorAction( { dataType: AUTHENTICATION, error: true } );

    const expectedState = {
      AUTHENTICATION: {
        dataType: AUTHENTICATION,
        error: true,
      },
    };
    expect( errors( {}, action ) ).toEqual( expectedState );

  } );

  it( 'should remove all errors in response to CLEAR_ERROR event', () => {
    const state = {
      [ AUTHENTICATION ]: {
        error: true,
      },
    };

    const action = clearErrorAction();

    expect( errors( state, action ) ).toEqual( {} );
  } );

} );
