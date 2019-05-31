import { getBodyLogs } from '../bodyLogs';


const state = {
  bodyLogs: [ 1, 2 ],
};

describe( 'unit tests for bodyLogs selectors', () => {

  it( 'getBodyLogs() should return the bodyLogs reducer', () => {
    expect( getBodyLogs( state ) ).toEqual( state.bodyLogs );
  } );

} );
