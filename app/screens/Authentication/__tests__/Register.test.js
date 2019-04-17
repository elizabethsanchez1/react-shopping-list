import * as actions from "../../../actions/authentication";
import * as auth from "../../../constants/authentication"




describe('Register actions', () => {

  it('should create an action to start registration', () => {
    const expectedAction = { type: auth.CREATE_USER_REQUEST };
    expect(actions.createUserRequest()).toEqual(expectedAction);
  });

  it('should create an action to signal registration success', () => {
    const expectedAction = { type: auth.CREATE_USER_SUCCESS };
    expect(actions.createUserSuccess()).toEqual(expectedAction);
  });


  it('should return the error message when a register fails', () => {
    const message = 'Registration failed';
    const expectedAction = {
      type: auth.CREATE_USER_FAILED,
      payload: { error: message }
    };

    expect(actions.createUserFailed(message)).toEqual(expectedAction);
  });

});
