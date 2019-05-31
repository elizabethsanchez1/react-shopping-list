import logs from '../logs';


describe( 'logs reducer unit tests', () => {

  it( 'should return empty inital state', () => {
    expect( logs( {}, {} ) ).toEqual( {} );
  } );

} );
