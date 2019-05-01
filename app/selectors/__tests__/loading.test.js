import { AUTHENTICATION } from '../../constants/reducerObjects';
import { getLoading, getLoadingByDomain } from '../loading';

const state = {
  loading: {
    [ AUTHENTICATION ]: true,
  },
}

describe( 'Loading selectors', () => {

  it( 'getLoading() should return loading reducer', () => {
    expect( getLoading( state ) ).toEqual( state.loading );
  } );

  it( 'getLoadingByDomain() should return loading flag for specific domain', () => {
    expect( getLoadingByDomain( state, AUTHENTICATION ) )
      .toEqual( state.loading[ AUTHENTICATION ] );

    expect( getLoadingByDomain( state, '' ) ).toEqual( false );
  } );

} );
