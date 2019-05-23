import {
  SELECTED_WORKOUT,
  SELECTED_PROGRAM,
  SELECTED_DAY,
  SELECTED_WEEK,
  CONTINUE_PROGRAM,
  RESET_PROGRAM,
  UPDATED_PROGRAM_ATTEMPTS,
  BUILD_EXERCISE_HISTORY,
  CALCULATE_PROGRAM_ATTEMPT,
  MARK_PROGRAM_COMPLETED_FLAGS,
  REMOVE_EXERCISE,
  FORMAT_EXERCISES,
  UPDATE_FIELD,
  QUICK_TRACK,
  MODIFY_SETS,
  STORE_ADD_EXERCISE_INDEX,
  ADD_EXERCISES, TRACK_SELECTED_PROGRAM, TRACK_SELECTED_WORKOUT, TRACK_SELECTED_PROGRAM_DAY,
} from '../constants/track';
import firebaseService from '../utilities/firebase';
import {  Alert } from 'react-native';

export function addExercises(selectedData, type, selectedWeek, selectedDay, exerciseIndex, newExercises, exerciseSets) {
  return {
    type: ADD_EXERCISES,
    payload: {
      selectedData,
      type,
      selectedWeek,
      selectedDay,
      exerciseIndex,
      newExercises,
      exerciseSets
    }
  }
}

export function buildExerciseHistory() {
  return { type: BUILD_EXERCISE_HISTORY };
}

export function calculateProgramAttempt(selectedData, documentIds) {
  return {
    type: CALCULATE_PROGRAM_ATTEMPT,
    payload: { selectedData, documentIds }
  };
}

export function continueProgram() {
  return { type: CONTINUE_PROGRAM }
}

export function formatExercises(exercises) {
  return { type: FORMAT_EXERCISES, payload: { exercises } };
}

export function displayAlert(message) {
  Alert.alert(
    message,
    "",
    [{
      text: 'OK',
    }],
  )
}

export function markProgramCompletedFlags(selectedData, completedExercises) {
  return {
    type: MARK_PROGRAM_COMPLETED_FLAGS,
    payload: {
      selectedData,
      completedExercises,
    }
  };
}

export function modifySets(exerciseSets, exerciseIndex, modification) {
  return {
    type: MODIFY_SETS,
    payload: { exerciseSets, exerciseIndex, modification }
  };
}

export function resetProgram() {
  return { type: RESET_PROGRAM }
}

export function removeExercise(selectedData, type, selectedWeek, selectedDay, exerciseIndex, exerciseSets) {
  return {
    type: REMOVE_EXERCISE,
    payload: { selectedData, type, selectedWeek, selectedDay, exerciseIndex, exerciseSets }
  }
}

export function quickTrack(exercises, exerciseSets, exerciseIndex) {
  return {
    type: QUICK_TRACK,
    payload: { exercises, exerciseSets, exerciseIndex }
  };
}

export function selectedWorkout(workout) {
  return { type: SELECTED_WORKOUT, selected: workout };
}

export function selectedProgram(program) {
  return { type: SELECTED_PROGRAM, selected: program };
}

export function selectedWeek(week) {
  return { type: SELECTED_WEEK, week };
}

export function selectedDay(day) {
  return { type: SELECTED_DAY, day };
}

export function storeAddExerciseIndex(index) {
  return { type: STORE_ADD_EXERCISE_INDEX, payload: { index } };
}

export function updateField(exerciseSets, exerciseIndex, setIndex, field, value) {
  return {
    type: UPDATE_FIELD,
    payload: { exerciseSets, exerciseIndex, setIndex, field, value }
  };
}

export function updateProgramAttempts(attemptInfo) {
  return (dispatch, getState) => {
    const { uid } = getState().authentication;

    firebaseService.updateProgamAttempts(uid, attemptInfo)
      .then(response => {
        dispatch({ type: UPDATED_PROGRAM_ATTEMPTS });
      })
      .catch(error => {
        console.log('updatedProgramAttempts() error: ', error);
        displayAlert('Failed to update program attempt: ', error.message);
      })

  }
}

// V2
export const trackSelectedDayAction = data => ( {
  type: TRACK_SELECTED_PROGRAM_DAY,
  payload: data,
} );

export const trackSelectedProgramAction = data => ( {
  type: TRACK_SELECTED_PROGRAM,
  payload: data,
} );

export const trackSelectedWorkoutAction = data => ( {
  type: TRACK_SELECTED_WORKOUT,
  payload: data,
} );
