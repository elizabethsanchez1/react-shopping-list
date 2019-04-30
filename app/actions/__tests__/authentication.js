import { LOGIN_REQUEST } from '../../constants/authentication';
import { loginRequestAction } from '../authentication';


describe( 'authentication creators', () => {

  it( 'loginRequestAction() should dispatch a LOGIN_REQUEST event', () => {
    const expectedAction = {
      type: LOGIN_REQUEST,
      payload: { email: 'test', password: 'test' },
    };

    expect( loginRequestAction( { email: 'test', password: 'test' } ) )
      .toEqual( expectedAction );

  } );

} );
