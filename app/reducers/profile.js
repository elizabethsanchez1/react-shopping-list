import {
  GET_PROFILE_FAILED,
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_USER_PROFILE,
  UPDATE_LOADING
} from '../constants/profile';
import { createSelector } from 'reselect';
import { ADD_CUSTOM_EXERCISE_REQUEST } from "../constants/exercises";
import { LOGIN_FAILED } from "../constants/authentication";


const initialState = {
  firstName: '',
  lastName: '',
  gender: '',
  primaryGoal: '',
  leftHanded: '',
  colorTheme: '',
  email: '',
  loading: false,

  setting: [], // Not being used
  profileLoading: false,
};




export default function profile(state = initialState, action) {
  switch (action.type) {


    case GET_PROFILE_REQUEST:
      return {
        ...state,
        profileLoading: true,
      };

    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        gender: action.payload.gender,
        primaryGoal: action.payload.primaryGoal,
        email: action.payload.email,
      };


    case GET_PROFILE_FAILED:
      return {
        ...state,
        profileLoading: false,
      };


    default:
      return state;
  }
}
