import loading from '../loading';
import { AUTHENTICATION } from '../../constants/reducerObjects';
import { hideLoadingAction, showLoadingAction } from '../../actions/loading';


describe( 'loading reducer unit tests', () => {

  it( 'should return initial state', () => {
    expect( loading( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle change loading flag to true for specified dataType', () => {
    const action = showLoadingAction( { dataType: AUTHENTICATION } );
    const expectedState = {
      [ AUTHENTICATION ]: true,
    };
    expect( loading( {}, action ) ).toEqual( expectedState );
  } );

  it( 'should handle change loading flag to false for specified dataType', () => {
    const action = hideLoadingAction( { dataType: AUTHENTICATION } );
    const expectedState = { [ AUTHENTICATION ]: false };

    expect( loading( {}, action ) ).toEqual( expectedState );
  } );

} );
