import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  CREATE_USER_SUCCESS,
  CREATE_USER_REQUEST,
  CREATE_USER_FAILED, LOG_OUT
} from '../constants/authentication';
import firebase from 'react-native-firebase';
import firebaseService from '../utilities/firebase';
import { GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS } from "../constants/profile";
import {  Alert } from 'react-native';
import { fetchCompletedExercises, getPrograms, getSavedLogs, getWorkouts, loadWorkouts } from "./workoutsApi";
import { displayAlert } from "./alert";
import { isRegisterFlow } from "../selectors/authentication";
import { getProfile } from "./profile";



export const createUser = (email, password) => async dispatch => {
  try {
    dispatch(createUserRequest());
    const authObject = await firebaseService.createNewUser(email, password);
    await firebaseService.createUserDocument(authObject.user.uid, email);
    dispatch(createUserSuccess( {email, password, user: authObject.user} ));
  }
  catch (error) {
    console.log('error: ', error);
    dispatch(createUserFailed());
    dispatch(displayAlert('Error', error.message));
  }
};

export const createUserRequest = () => {
  return { type: CREATE_USER_REQUEST };
};

export const createUserSuccess = user => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user,
  };
};

export function createUserFailed() {
  return { type: CREATE_USER_FAILED }
}



/*
* Login Action Creators
* */

export function login(email, password) {
  return async dispatch => {

    try {
      dispatch(loginRequest());
      await firebaseService.loginUser(email, password);
      const user = await firebase.auth().currentUser;
      dispatch(loginSuccess({ email, password, user }));
    }
    catch(error) {
      console.log('error: ', errr);
      dispatch(loginFailed());
      dispatch(displayAlert( 'Error', error.message));
    }
  }
}

export const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  };
};

export const loginFailed = () => {
  return { type: LOGIN_FAILED };
};




export const getSavedData = user => async (dispatch, getState) => {

  // const state = getState();
  // const registerFlow = isRegisterFlow(state);
  //
  // // If its not registering flow then retrieve this data
  // if (registerFlow === undefined) {
  //   try {
  //     // Profile
  //     dispatch(getProfile(user));
  //
  //     // login
  //     dispatch(loginSuccess({ email: user.email, password: '', user}));
  //
  //     // all saved programs & workouts
  //     dispatch(getWorkouts(user.uid));
  //
  //     // all tracked exercises
  //     await dispatch(fetchCompletedExercises(user.uid));
  //
  //     // needs to run only after fetchCompletedExercises has finished
  //     dispatch(getSavedLogs(user.uid));
  //   }
  //   catch(error) {
  //     dispatch(loginFailed());
  //     dispatch(displayAlert('Alert', error.message));
  //   }
  // }

};





export const logOutUser = () => async dispatch => {
  await firebaseService.logOutUser();

  // had to wrap logout in timeout because a lot of
  // views would error out when all the state got wiped out
  setTimeout(() => {
    dispatch(logOut())
  }, 1000);

};

export const logOut = () => {
  return { type: LOG_OUT };
};

export const profileRequest = () => {
  return { type: GET_PROFILE_REQUEST };
};

export const getProfileSuccess = profileData => {
  return { type: GET_PROFILE_SUCCESS, payload: profileData }
};




/*
*  V2 action creators
*
*  */


export const loginRequestAction = data => ( {
  type: LOGIN_REQUEST,
  payload: data,
} );

export const loginFailedAction = data => ( {
  type: LOGIN_FAILED,
  payload: data,
} );

export const loginSuccessAction = data => ( {
  type: LOGIN_SUCCESS,
  payload: data,
} );
