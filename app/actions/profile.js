import {
  UPDATED_PROFILE,
  EMAIL_UPDATED,
  UPDATED_MEASUREMENTS,
  GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, GET_PROFILE_FAILED
} from '../constants/profile';
import firebaseService from '../utilities/firebase';
import { displayAlert } from "./alert";





export const getProfile = user => async dispatch => {
  try {
    dispatch(getProfileRequest());
    const profile = await firebaseService.getUserProfile(user.uid);
    dispatch(getProfileSuccess(profile.data()));
  }
  catch(error) {
    console.log('error', error);
    dispatch(displayAlert('Error', error.message));
    dispatch(getProfileFailed());
  }
};

export const getProfileRequest = () => {
  return { type: GET_PROFILE_REQUEST };
};

export const getProfileFailed = () => {
  return { type: GET_PROFILE_FAILED }
};

export const getProfileSuccess = profileData => {
  return { type: GET_PROFILE_SUCCESS, payload: profileData }
};



// TODO this is currently broken, due to the way I am letting the loading module under Authentication handle the fetching of user data
// email is stored in firebase user auth profile so this needs
// to be updated separately then other profile information
export function  updateEmail(update) {
  return async dispatch => {
    const { newEmail, previousEmail, password } = update;

    const user = await firebaseService.getCurrentUser();
    const credential = firebaseService.reAuthenticateUser(
      previousEmail,
      password
    );

    user.reauthenticateAndRetrieveDataWithCredential(credential)
      .then(() => {
        user.updateEmail(newEmail)
          .then(() => {
            dispatch(emailUpdated(newEmail));
          })
      })
      .catch((error) => {
        console.warn('update email action failed: ', error);
      })

  }
}

export function emailUpdated(email) {
  return { type: EMAIL_UPDATED, email };
}



export const updateField = (uid, data) => async dispatch => {
  firebaseService.updateProfile(uid, data)
    .then(() => {
      dispatch(updatedProfile());
    });
};


export const updatedProfile = () => {
  return { type: UPDATED_PROFILE };
};

export function updateMeasurements(uid, date, data) {
  return async dispatch => {
    dispatch(loadingStatus(true));

    try {
      await firebaseService.updateBodyMeasurements(uid, date, data);
      dispatch(
        { type: UPDATED_MEASUREMENTS }
      );
      dispatch(loadingStatus(false));
    }
    catch (error) {
      console.log('updateMeasurements() action error: ', error);
    }
  }
}

