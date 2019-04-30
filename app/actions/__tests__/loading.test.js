import { hideLoadingAction, showLoadingAction } from '../loading';
import { HIDE_LOADING, SHOW_LOADING } from '../../constants/loading';


describe( 'loading action creators', () => {

  it( 'showLoadingAction() should dispatch SHOW_LOADING event', () => {
    const expectedAction = {
      type: SHOW_LOADING,
      payload: 1,
    };

    expect( showLoadingAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'hideLoadingAction() should dispatch HIDE_LOADING event', () => {
    const expectedAction = {
      type: HIDE_LOADING,
      payload: 1,
    };

    expect( hideLoadingAction( 1 ) ).toEqual( expectedAction );
  } );

} );
