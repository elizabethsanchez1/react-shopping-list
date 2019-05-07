import { UPDATE_FIELD_FAILED, UPDATE_FIELD_REQUEST, UPDATE_FIELD_SUCCESS } from '../../constants/profile';
import { updateProfileFieldFailedAction, updateProfileFieldRequestAction, updateProfileFieldSuccessAction } from '../profile';


describe( 'Profile action creators', () => {

  it( 'updateProfileFieldRequestAction() should dispatch UPDATE_FIELD_REQUEST event', () => {

    const expectedAction = {
      type: UPDATE_FIELD_REQUEST,
      payload: 1,
    };

    expect( updateProfileFieldRequestAction( 1 ) ).toEqual( expectedAction );

  } );

  it( 'updateProfileFieldSuccessAction() should dispatch UPDATE_FIELD_SUCCESS event', () => {

    const expectedAction = {
      type: UPDATE_FIELD_SUCCESS,
      payload: 1,
    };

    expect( updateProfileFieldSuccessAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'updateFieldFailed() should dispatch UPDATE_FIELD_FAILED event', () => {

    const expectedAction = {
      type: UPDATE_FIELD_FAILED,
      payload: 1,
    };

    expect( updateProfileFieldFailedAction( 1 ) ).toEqual( expectedAction );
  } );


} );
