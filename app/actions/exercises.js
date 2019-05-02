import {
  ADD_CUSTOM_EXERCISE,
  ADD_EXERCISES,
  GET_EXERCISES_FAILURE,
  GET_EXERCISES_REQUEST,
  GET_EXERCISES_SUCCESS, LISTEN_FOR_COMPLETED_EXERCISES,
  OPEN_EXERCISE_LIST, RECIEVED_COMPLETED_EXERCISES,
  SELECT_MUSCLE_GROUP,
  STORE_EXERCISE_LIST, UPDATE_PROFILE_EXERCISES_FAILED,
  UPDATE_PROFILE_EXERCISES_REQUEST, UPDATE_PROFILE_EXERCISES_SUCCESS,
  UPDATE_SELECTIONS,
} from '../constants/exercises';
import firebaseService from '../utilities/firebase';

export function addCustomExercise(exercise) {
  return { type: ADD_CUSTOM_EXERCISE, payload: { exercise } };
}

export function addExercises(selectedExercises) {
  return { type: ADD_EXERCISES, payload: { selectedExercises } };
}

export function getExercises() {
  return async dispatch => {
    dispatch(getExercisesRequest());

    try {
      const querySnapshot = await firebaseService.getExerciseList();
      console.log('querySnapshot: ', querySnapshot);
      let exercise;
      const exerciseList = {
        'Abs': [],
        'Back': [],
        'Biceps': [],
        'Calves': [],
        'Chest': [], // done adding more exercises
        'Forearms': [],
        'Glutes': [],
        'Hamstrings': [],
        'Quads': [],
        'Shoulders': [],  // done adding more exercises
        'Traps': [], // done adding more exercises
        'Triceps': [],
      };

      querySnapshot.forEach(document => {
        exercise = document.data();
        exercise.selected = false;
        exerciseList[`${document.data().muscleGroup}`].push(exercise);
      });

      dispatch({ type: GET_EXERCISES_SUCCESS });
      dispatch({ type: STORE_EXERCISE_LIST, payload: { exerciseList } });
    }
    catch (error) {
      dispatch({ type: GET_EXERCISES_FAILURE, payload: { error: error.message } });
    }

  }
}

export function getExercisesRequest() {
  return { type: GET_EXERCISES_REQUEST }
}

export function getExercisesSuccess() {
  return { type: GET_EXERCISES_SUCCESS };
}

export function getExerciseFailure() {
  return { type: GET_EXERCISES_FAILURE };
}

export function openExerciseList(daySelected) {
  return { type: OPEN_EXERCISE_LIST, payload: { daySelected } };
}

export function selectMuscleGroup(muscleGroup) {
  return { type: SELECT_MUSCLE_GROUP, payload: { muscleGroup } };
}

export function updateSelections(locationIndex) {
  return { type: UPDATE_SELECTIONS, payload: { locationIndex } };
}

export function addCustomExerciseToProfile(uid) {
  return async (dispatch, getState) => {
    dispatch({ type: UPDATE_PROFILE_EXERCISES_REQUEST });
    try {
      const { customExercises } = getState().exercises;
      await firebaseService.updateProfile(uid, { customExercises });
      dispatch({ type: UPDATE_PROFILE_EXERCISES_SUCCESS });
    }
    catch (error) {
      dispatch({ type: UPDATE_PROFILE_EXERCISES_FAILED });
    }
  }
}
