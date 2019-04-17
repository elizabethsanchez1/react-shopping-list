import {
  BUILD_SAVE_REDIRECT_DONE,
  FETCH_COMPLETED_EXERCISES_FAILED,
  FETCH_COMPLETED_EXERCISES_REQUEST,
  FETCH_COMPLETED_EXERCISES_SUCCESS,
  FETCH_SAVED_WORKOUTS_FAILED,
  FETCH_SAVED_WORKOUTS_REQUEST,
  FETCH_SAVED_WORKOUTS_SUCCESS, SAVE_BODY_LOG_FAILED,
  SAVE_BODY_LOG_REQUEST,
  SAVE_BODY_LOG_SUCCESS,
  SAVE_TRACKED_WORKOUT_FAILED, SAVE_WORKOUT_LOG_FAILED,
  SAVE_WORKOUT_LOG_REQUEST, SAVE_WORKOUT_LOG_SUCCESS,
  SAVE_WORKOUT_REQUEST,
  SAVE_WORKOUT_SUCCESS
} from "../constants/workoutsApi";
import { SAVE_TRACKED_WORKOUT_REQUEST, SAVE_TRACKED_WORKOUT_SUCCESS } from "../constants/track";



const initialState = {
  documentIds: [],
  buildWorkoutSaveLoading: false,
  buildSaveRedirect: false,
  saveTrackedWorkoutLoading: false,
  savedWorkoutsLoading: false,
  getCompletedExercisesLoading: false,
  saveLogLoading: false,
};



const handleLogsApi = ( state, action ) => {
  switch ( action.type ) {

    case SAVE_BODY_LOG_REQUEST:
      return {
        ...state,
        saveBodyLogLoading: true,
      };

    case SAVE_BODY_LOG_SUCCESS:
      return {
        ...state,
        saveBodyLogLoading: false,
      };

    case SAVE_BODY_LOG_FAILED:
      return {
        ...state,
        saveBodyLogLoading: false,
      };

    case SAVE_WORKOUT_LOG_REQUEST:
      return {
        ...state,
        saveWorkoutLogLoading: true,
      };

    case SAVE_WORKOUT_LOG_SUCCESS:
      return {
        ...state,
        saveWorkoutLogLoading: false,
      };

    case SAVE_WORKOUT_LOG_FAILED:
      return {
        ...state,
        saveWorkoutLogLoading: false,
      };

    default: return state;
  }
};

const handleBuildApi = ( state, action ) => {
  switch ( action.type ) {

    case BUILD_SAVE_REDIRECT_DONE:
      return {
        ...state,
        buildSaveRedirect: false,
      };

    case FETCH_SAVED_WORKOUTS_REQUEST:
      return {
        ...state,
        savedWorkoutsLoading: true,
      };

    case FETCH_SAVED_WORKOUTS_SUCCESS:
      return {
        ...state,
        documentIds: action.payload.documentIds,
        savedWorkoutsLoading: false,
      };

    case FETCH_SAVED_WORKOUTS_FAILED:
      return {
        ...state,
        savedWorkoutsLoading: false,
      };

    case SAVE_WORKOUT_REQUEST:
      return {
        ...state,
        buildWorkoutSaveLoading: true,
      };

    case SAVE_WORKOUT_SUCCESS:
      return {
        ...state,
        buildWorkoutSaveLoading: false,
        buildSaveRedirect: true,
      };

    // TODO missing SAVE_WORKOUT_FAILED

    default: return state;
  }
};

const handleTrackApi = ( state, action ) => {
  switch ( action.type ) {
    case FETCH_COMPLETED_EXERCISES_REQUEST:
      return {
        ...state,
        getCompletedExercisesLoading: true,
      };

    case FETCH_COMPLETED_EXERCISES_SUCCESS:
      return {
        ...state,
        getCompletedExercisesLoading: false,
      };

    case FETCH_COMPLETED_EXERCISES_FAILED:
      return {
        ...state,
        getCompletedExercisesLoading: false,
      };

    case SAVE_TRACKED_WORKOUT_REQUEST:
      return {
        ...state,
        saveTrackedWorkoutLoading: true,
      };

    case SAVE_TRACKED_WORKOUT_SUCCESS:
      return {
        ...state,
        saveTrackedWorkoutLoading: false,
      };

    case SAVE_TRACKED_WORKOUT_FAILED:
      return {
        ...state,
        saveTrackedWorkoutLoading: false,
      };

    default: return state;
  }
};

export default function workoutsApi(state = initialState, action) {
  switch(action.type) {

    case SAVE_BODY_LOG_REQUEST    :
    case SAVE_BODY_LOG_SUCCESS    :
    case SAVE_BODY_LOG_FAILED     :
    case SAVE_WORKOUT_LOG_REQUEST :
    case SAVE_WORKOUT_LOG_SUCCESS :
    case SAVE_WORKOUT_LOG_FAILED  :
      return handleLogsApi( state, action );

    case BUILD_SAVE_REDIRECT_DONE     :
    case FETCH_SAVED_WORKOUTS_REQUEST :
    case FETCH_SAVED_WORKOUTS_SUCCESS :
    case FETCH_SAVED_WORKOUTS_FAILED  :
    case SAVE_WORKOUT_REQUEST         :
    case SAVE_WORKOUT_SUCCESS         :
      return handleBuildApi( state, action );

    case FETCH_COMPLETED_EXERCISES_REQUEST :
    case FETCH_COMPLETED_EXERCISES_SUCCESS :
    case FETCH_COMPLETED_EXERCISES_FAILED  :
    case SAVE_TRACKED_WORKOUT_REQUEST      :
    case SAVE_TRACKED_WORKOUT_SUCCESS      :
    case SAVE_TRACKED_WORKOUT_FAILED       :
      return handleTrackApi( state, action );
    
    default:
      return state;
  }
}
