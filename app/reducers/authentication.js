import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS, CREATE_USER_FAILED,
} from '../constants/authentication';

import { EMAIL_UPDATED } from '../constants/profile';


const initialState = {
  uid: '',
  // uid: 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
  email: '',
  password: '',
  loginLoading: false,
  registerLoading: false,
};


export default function authentication(state = initialState, action) {

  switch (action.type) {
    /*
    * Account Registration cases
    * */
    case CREATE_USER_REQUEST:
      return {
        ...state,
        registerLoading: true,
      };

    case CREATE_USER_SUCCESS:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        uid: action.payload.user.uid,
        registerLoading: false,
        registerFlow: true,
      };

    case CREATE_USER_FAILED:
      return {
        ...state,
        registerLoading: false,
      };


    /*
    * Login Cases
    * */
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        loginLoading: true,
      });

    // case LOGIN_SUCCESS:
    //   return {
    //     ...state,
    //     loginLoading: false,
    //     email: action.payload.email,
    //     password: action.payload.password,
    //     uid: action.payload.user.uid,
    //   };

    // case LOGIN_FAILED:
    //   return {
    //     ...state,
    //     loginLoading: false,
    //   };

    /*
     * Updating email related cases
     */
    case EMAIL_UPDATED:
      return Object.assign({}, state, {
        email: action.email
      });


    default:
      return state;
  }

}
