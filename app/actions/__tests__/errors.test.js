import { CLEAR_ERROR, HANDLE_ERROR } from '../../constants/errors';
import { clearErrorAction, handleErrorAction } from '../errors';
import { AUTHENTICATION } from '../../constants/reducerObjects';


/*
*
* What is the unit under test? ( module, function, class )
* What should it do?
* What was the actual output?
* What was the expected output?
* How do your reproduce the failure?
*
* */


describe( 'Alert action creators', () => {

  it( 'handleError() should take an error information from a bad response', () => {
    const expectedAction = {
      type: HANDLE_ERROR,
      payload: { [ AUTHENTICATION ]: { error: 'error message' } },
    };

    const payload = { [ AUTHENTICATION ]: { error: 'error message' } };

    expect( handleErrorAction( payload ) ).toEqual( expectedAction );
  } );

  it( 'clearErrorAction() should clear the error once the user hits ok', () => {
    const expectedAction = {
      type: CLEAR_ERROR,
      payload: undefined,
    };

    expect( clearErrorAction() ).toEqual( expectedAction );
  } );

} );
