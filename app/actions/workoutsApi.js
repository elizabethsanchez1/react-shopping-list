import firebaseService from '../utilities/firebase';
import {
  BUILD_SAVE_REDIRECT_DONE, GET_BODY_LOGS_REQUEST, GET_BODY_LOGS_SUCCESS,
  FETCH_COMPLETED_EXERCISES_REQUEST,
  FETCH_COMPLETED_EXERCISES_SUCCESS,
  FETCH_SAVED_WORKOUTS_REQUEST,
  FETCH_SAVED_WORKOUTS_SUCCESS,
  SAVE_BODY_LOG_FAILED,
  SAVE_BODY_LOG_REQUEST, SAVE_BODY_LOG_SUCCESS,
  SAVE_TRACKED_WORKOUT_FAILED,
  SAVE_TRACKED_WORKOUT_REQUEST,
  SAVE_TRACKED_WORKOUT_SUCCESS,
  SAVE_WORKOUT_FAILED,
  SAVE_WORKOUT_LOG_FAILED,
  SAVE_WORKOUT_LOG_REQUEST,
  SAVE_WORKOUT_LOG_SUCCESS,
  SAVE_WORKOUT_REQUEST,
  SAVE_WORKOUT_SUCCESS,
} from "../constants/workoutsApi";
import {  Alert } from 'react-native';
import mathFunctions from "../utilities/mathFunctions";
import {
  getActiveAttempt,
  getSelectedData,
  getTrackableExerciseSets,
  getTracksSelectedDay,
  getTracksSelectedWeek, getTrackType, getCompletedExercises,
} from "../selectors/track";
import { getUid } from "../selectors/authentication";
import { loginFailed } from "./authentication";
import {
  getBodyLogChanges,
  getChangedExercises,
  getFormattedBodyLog, getLogOverwriteFlag, getLogOverwriteUid,
  getSaveFormattedBodyLogs, getSelectedDay, getSelectedLogDay
} from "../selectors/logs";

export function buildSaveRedirectDone() {
  return { type: BUILD_SAVE_REDIRECT_DONE };
}

export const fetchCompletedExercisesRequest = () => {
  return { type: FETCH_COMPLETED_EXERCISES_REQUEST };
};

export const getCompletedExerciseSuccess = (completedExercises) => {
  return { type: FETCH_COMPLETED_EXERCISES_SUCCESS, payload: { completedExercises } };
};



export const fetchCompletedExercises = (uid) => (dispatch) => {
  dispatch(fetchCompletedExercisesRequest());

  firebaseService.listenForNewTrackedExercises(uid).onSnapshot(querySnapshot => {
    const completedExercises = [];

    querySnapshot.forEach( doc => completedExercises.push({ ...doc.data(), uid: doc.id }) );



    dispatch(getCompletedExerciseSuccess(completedExercises));
  });
};

export const getWorkouts = (uid) => (dispatch) => {
  dispatch(workoutsRequest());

  firebaseService.listenForNewWorkouts(uid).onSnapshot(querySnapshot => {
    let programs = [];
    let workouts = [];
    let documentIds = [];

    querySnapshot.forEach((document) => {
      let data = document.data();

      if (document.data().type === 'program') {
        programs.push(data);
      } else {
        workouts.push(data);
      }
      documentIds.push({name: data.name, id: document.id });
    });

    dispatch(loadWorkoutSuccess(programs, workouts, documentIds));
  });
};



export function workoutsRequest() {
  return { type: FETCH_SAVED_WORKOUTS_REQUEST }
}

export function loadWorkoutSuccess(programs, workouts, documentIds) {
  return { type: FETCH_SAVED_WORKOUTS_SUCCESS, payload: { programs, workouts, documentIds } };
}




export function saveWorkoutRequest() {
  return { type: SAVE_WORKOUT_REQUEST }
}

export function saveWorkoutSuccess() {
  return { type: SAVE_WORKOUT_SUCCESS };
}

export function saveWorkoutFailed() {
  return { type: SAVE_WORKOUT_FAILED };
}

export function displayAlert(message, errorMessage = '') {
  Alert.alert(
    message,
    errorMessage,
    [{
      text: 'OK',
    }],
  )
}

export const saveWorkout = (uid, type) => async (dispatch, getState) => {
  dispatch(saveWorkoutRequest());
  let workout;
  let name;
  let editing;
  let id;

  if (type === 'program') {
    workout = getState().program.program;
    name = getState().program.name;
    editing = getState().program.editing;
  }

  if (type === 'workout') {
    workout = getState().workout.workout;
    name = getState().workout.name;
    editing = getState().workout.editing;
  }

  if (editing) {
    const { documentIds } = getState().workoutsApi;
    documentIds.forEach((item) => {
      if (item.name === name) {
        id = item.id;
      }
    });
  }


  try {

    if (editing) {
      await firebaseService.updateSavedWorkoutData(uid, workout, type, id);
    }
    else {
      await firebaseService.saveWorkoutData(uid, name, workout, type );
    }


    dispatch(saveWorkoutSuccess());
    displayAlert('Save Successful');
  }
  catch(error) {
    dispatch(saveWorkoutFailed(error.message));
    displayAlert('Save Failed, please try again');
  }

};





/*
Save Track workout related functionality
 */

export const saveTrackedWorkoutRequest = () => {
  return { type: SAVE_TRACKED_WORKOUT_REQUEST }
};

export const saveTrackedWorkoutSuccess = (trackedExercises) => {
  return { type: SAVE_TRACKED_WORKOUT_SUCCESS, payload: { trackedExercises } }
};

export const saveTrackedWorkoutFailed = (error) => {
  return { type: SAVE_TRACKED_WORKOUT_FAILED, payload: { error } }
};

export const saveTrackedWorkout = () => async (dispatch, getState) => {
  const state = getState();
  const exercises = getTrackableExerciseSets(state);
  const selectedData = getSelectedData(state);
  const selectedWeek = getTracksSelectedWeek(state);
  const selectedDay = getTracksSelectedDay(state);
  const type = getTrackType(state);
  const attemptString = getActiveAttempt(state);
  const uid = getUid(state);


  const trackedExercises = _formatCompletedExercises(exercises,
    selectedData,
    selectedWeek,
    selectedDay,
    type,
    attemptString,
    uid);

  try {
    const save = await firebaseService.saveTrackedProgram(trackedExercises);
    dispatch(saveTrackedWorkoutSuccess(trackedExercises));
    displayAlert('Save Successful');
  }
  catch (error) {
    dispatch(saveTrackedWorkoutFailed(error.message));
    displayAlert('Save Failed: ', error.message);
  }
};


export const _formatCompletedExercises = (exercises,
                                         selectedData,
                                         selectedWeek,
                                         selectedDay,
                                         type,
                                         attemptString,
                                         uid) =>
{
  const trackedExercises = JSON.parse(JSON.stringify(exercises));
  const originalExercises = (type === 'program')
    ? selectedData.program[selectedWeek][selectedDay].exercises
    : selectedData.workout.week1[0].exercises;
  const completedExercises = [];

  trackedExercises.forEach((exercise, index) => {
    completedExercises.push(
      _formatExerciseObject(
        exercise,
        originalExercises[index],
        type,
        selectedData,
        selectedWeek,
        selectedDay,
        attemptString,
        uid
      )
    );
  });

  return completedExercises;
};

export const _formatExerciseObject = (trackedExercise,
                                     originalExercise,
                                     type,
                                     selectedData,
                                     selectedWeek,
                                     selectedDay,
                                     attemptString,
                                     uid) =>
{
  const trackedReps = [];
  const trackedWeights = [];
  const volume = [];

  trackedExercise.forEach(item => {
    trackedReps.push((item.reps !== '') ? item.reps : 0 );
    trackedWeights.push((item.weight !== '') ? item.weight : 0);
    volume.push(item.reps * item.weight);
  });

  const totalReps = trackedReps.reduce((start, currentValue) => start + currentValue);
  const totalVolume = volume.reduce((start, currentValue) => start + currentValue);
  const heaviestWeight = Math.max(...trackedWeights);
  const reps = trackedReps[trackedWeights.indexOf(heaviestWeight)];
  const maxObject = mathFunctions.calculateMaxes(heaviestWeight, reps);
  const baseObject = {
    exercise: originalExercise.exercise,
    weight: parseInt(originalExercise.weight, 10),
    muscleGroup: originalExercise.muscleGroup,
    trackedOn: new Date(),
    trackedReps,
    trackedWeights,
    totalReps,
    totalVolume,
    type,
    userId: uid,
  };

  if (type === 'program') {
    return Object.assign(baseObject, maxObject, {
      program: selectedData.name,
      week: selectedWeek,
      dayName: selectedData[type][selectedWeek][selectedDay].day,
      day: selectedDay,
      belongsTo: attemptString,
    })
  }

  if (type === 'workout') {
    return Object.assign(baseObject, maxObject, {
      workout: selectedData.name
    })
  }
};





/*
Logs api requests
 */

export const getSavedLogs = uid => ( dispatch, getState ) => {
  dispatch( { type: GET_BODY_LOGS_REQUEST } );

  firebaseService.listenForNewBodyLogs(uid).onSnapshot(querySnapshot => {
    const savedBodyLogs = [];

    querySnapshot.forEach(document => {
      savedBodyLogs.push({ uid: document.id, ...document.data() });
    });

    dispatch( { type: GET_BODY_LOGS_SUCCESS, payload: savedBodyLogs } );

    // updates date markings in calendar inside of logs
  });
};

export const saveLogEdit = () => async ( dispatch, getState ) => {
  const state = getState();
  const bodyLogChangesFlag = getBodyLogChanges( state );
  const formattedBodyLogs = getSaveFormattedBodyLogs( state );
  const workoutLogChanges = getChangedExercises( state );
  const overwriteUid = getLogOverwriteUid( state );
  const selectedDate = getSelectedLogDay( state );
  const userId = getUid( state );

  if ( !bodyLogChangesFlag && workoutLogChanges.length === 0 ) {
    displayAlert( 'Warning', 'No changes have been made' );
    return;
  }

  let displayMessage = { title: '', message: '' };

  if ( workoutLogChanges.length > 0 ) {
    dispatch( { type: SAVE_WORKOUT_LOG_REQUEST } );

    try {
      await firebaseService.saveWorkoutLogEdits( workoutLogChanges );
      dispatch( { type: SAVE_WORKOUT_LOG_SUCCESS } );
      displayMessage.title = 'Success';
      displayMessage.message = 'Logs have been edited';
    } catch ( e ) {
      dispatch( { type: SAVE_WORKOUT_LOG_FAILED } );
      displayMessage.title = 'Error';
      displayMessage.message = e.message;
    }
  }


  if ( bodyLogChangesFlag ) {
    dispatch( { type: SAVE_BODY_LOG_REQUEST } );

    try {
      await firebaseService.saveBodyLogEdits( {
        userId,
        logs: formattedBodyLogs,
        overwriteUid,
        selectedDate,
      } );
      dispatch( { type: SAVE_BODY_LOG_SUCCESS } );
      displayMessage.title = 'Success';
      displayMessage.message = 'Logs have been edited';
    }
    catch ( e ) {
      dispatch( { type: SAVE_BODY_LOG_FAILED } );
      displayMessage.title = 'Error';
      displayMessage.message = e.message;
    }
  }

  displayAlert( displayMessage.title, displayMessage.message );
};
