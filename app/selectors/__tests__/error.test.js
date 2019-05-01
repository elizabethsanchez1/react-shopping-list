import { AUTHENTICATION } from '../../constants/reducerObjects';
import { getDomainError, getErrors } from '../errors';

const state = {
  errors: {
    [ AUTHENTICATION ]: true,
  },
};

describe( 'Error selectors', () => {

  it( 'getErrors() should return error reducer', () => {
    expect( getErrors( state ) ).toEqual( state.errors );
  } );

  it( 'getDomainError() should return error for specific domain', () => {
    expect( getDomainError( state, AUTHENTICATION ) )
      .toEqual( state.errors[ AUTHENTICATION ] );

    expect( getDomainError( state, '' ) ).toEqual( false );
  } );

} );
