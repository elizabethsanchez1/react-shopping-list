import * as actions from "../../../actions/authentication";
import * as auth from "../../../constants/authentication"
import * as profile from "../../../constants/profile";
import { Alert } from 'react-native';


describe('Authentication action creators', () => {

  it('should create an action to begin login request', () => {
    const expectedAction = { type: auth.LOGIN_REQUEST };
    expect(actions.loginRequest()).toEqual(expectedAction);
  });
  
  
  
  it('should create an action to begin profile request', () => {
    const expectedAction = { type: profile.GET_PROFILE_REQUEST };
    expect(actions.profileRequest()).toEqual(expectedAction);
  });

  it('should return the profile data retrieved from firebase', () => {
    const profileInfo = {
      FirstName: 'Jose',
      lastName: 'Sanchez'
    };

    const expectedAction = {
      type: profile.GET_PROFILE_SUCCESS,
      payload: profileInfo,
    };

    expect(actions.getProfileSuccess(profileInfo)).toEqual(expectedAction);
  });

  it('should return the user credentials the user used', () => {
    const email = 'myMail@gmail.com';
    const password = 'password';
    const user = {};

    const expectedAction = {
      type: auth.STORE_CREDENTIALS,
      payload: { email, password, user }
    };

    expect(actions.storeCredentials(email, password, user)).toEqual(expectedAction);
  });

  it('should return the action for a successful login', () => {
    const expectedAction = { type: auth.LOGIN_SUCCESS };
    expect(actions.loginSuccess()).toEqual(expectedAction);
  });

  it('should return the error message when a login fails', () => {
    const message = 'Login failed';
    const expectedAction = {
      type: auth.LOGIN_FAILED,
      payload: { error: message }
    };

    expect(actions.loginFailed(message)).toEqual(expectedAction);
  });


  it('should display alert if login fails', () => {
    jest.mock('Alert', () => {
      return { alert: jest.fn() };
    });

    const spy = jest.spyOn(Alert, 'alert');

    actions.displayAlert('test');
    expect(spy).toHaveBeenCalled();
  });
});
