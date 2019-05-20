import {
  USER_ADDING_WORKOUT,
  UPDATE_FIELD,
  SORT_EXERCISES,
  SAVE_EXERCISE_ORDER,
  OPEN_DELETE_SCREEN,
  DELETE_EXERCISE,
  OPEN_CUSTOM_SET,
  SAVE_CUSTOM_SET,
  COPY_WEEK,
  USER_ADDING_PROGRAM,
  SAVE_PROGRAM,
  SAVE_WORKOUT,
  SAVE_SUCCESSFUL,
  SAVE_FAILED,
  STORE_PROGRAM_CONFIG,
  HIDE_ALERT,
  USER_EDITING_PROGRAM,
  USER_EDITING_WORKOUT,
  CREATE_PROGRAM,
  UPDATE_DAY_TITLE,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  BUILD_EDIT_FIELD, BUILD_DELETE_EXERCISE, COPY_BUILD_OBJECT, BUILD_CHANGE_WEEK, BUILD_SAVE_WORKOUT
} from '../constants/building';
import firebaseService from '../utilities/firebase';
import { BUILD_UPDATE_EXERCISE_ORDER } from '../constants/exercises';


export function userAddingProgram(workoutType) {   // todo replaced
  return { type: USER_ADDING_PROGRAM, workoutType }
}

export function userAddingWorkout(workoutType) {   // todo replaced
  return {
    type: USER_ADDING_WORKOUT,
    payload: {
      workoutType,
      weeks: 1,
      daysPerWeek: 1,
    }
  }
}

export function userEditingProgram(programData) {  // todo replaced
  const program = JSON.parse(JSON.stringify(programData.program));
  return {
    type: USER_EDITING_PROGRAM,
    payload: {
      program,
      name: programData.name,
      weeks: Object.keys(programData.program).length,
      daysPerWeek: programData.program.week1.length,
    },
  };
}

export function userEditingWorkout(workoutData) {  // todo replaced
  const workout = JSON.parse(JSON.stringify(workoutData.workout));
  return {
    type: USER_EDITING_WORKOUT,
    payload: {
      workout,
      weeks: 1,
      daysPerWeek: 1,
      name: workoutData.name,
    }
  };
}

export function updateField(update) {
  return (dispatch, getState) => {
    const { workouts } = getState().buildReducer;
    const { weekSelected, dayLocation, exerciseLocation, field, value } = update;
    let updatedWorkout = JSON.parse(JSON.stringify(workouts));
    updatedWorkout[weekSelected][dayLocation].exercises[exerciseLocation][field] = value;

    dispatch({ type: UPDATE_FIELD, updatedWorkout });
  };
}

export function sortExercises(day) {
  return { type: SORT_EXERCISES, day }
}

export function saveExerciseOrder(selectedRow, previousLocation, newLocation) {
  return (dispatch, getState) => {
    const { weekSelected, daySelected, workouts } = getState().buildReducer;
    const clonedWorkout = JSON.parse(JSON.stringify(workouts));
    const exercises = clonedWorkout[weekSelected][daySelected].exercises;
    exercises.splice(newLocation, 0, exercises.splice(previousLocation, 1)[0]);
    dispatch({ type: SAVE_EXERCISE_ORDER, clonedWorkout });
  };
}

export function openDeletePage(weekSelected, daySelected) {
  return { type: OPEN_DELETE_SCREEN, payload: { weekSelected, daySelected } }
}

export function deleteExercise(itemIndex) {
  return (dispatch, getState) => {
    const { weekSelected, daySelected, workouts } = getState().buildReducer;
    const updatedWorkout = JSON.parse(JSON.stringify(workouts));
    const exercises = updatedWorkout[weekSelected][daySelected].exercises;
    exercises.splice(itemIndex, 1);
    dispatch({ type: DELETE_EXERCISE, updatedWorkout });
  };
}

export function openCustomSet(weekSelected, daySelected, exerciseSelected) {
  return {
    type: OPEN_CUSTOM_SET,
    payload: { weekSelected, daySelected, exerciseSelected }
  };
}

export function saveCustomSet(exercise, location) {
  return (dispatch, getState) => {
    const { weekSelected, daySelected, workouts } = getState().buildReducer;
    const updatedWorkout = JSON.parse(JSON.stringify(workouts));

    updatedWorkout[weekSelected][daySelected].exercises.splice(location, 1, exercise);

    dispatch({type: SAVE_CUSTOM_SET, updatedWorkout });
  }
}

export function copyWeek(copyFrom, copyTo) {
  return (dispatch, getState) => {
    const { workouts } = getState().buildReducer;
    const updatedWorkout = JSON.parse(JSON.stringify(workouts));
    let desiredExercises = JSON.parse(JSON.stringify(updatedWorkout[copyFrom]));

    if (copyTo !== 'allweeks') {
      updatedWorkout[copyTo] = desiredExercises;
    } else {
      Object.keys(updatedWorkout).forEach(key => {
        updatedWorkout[key] = desiredExercises;
      })
    }

    dispatch({ type: COPY_WEEK, updatedWorkout });
  }
}

export function saveWorkoutData(name, type, workoutData) {
  return (dispatch, getState) => {
    const { editing, documentIds } = getState().buildReducer;
    const { uid } = getState().authReducer;
    console.log('SAVE - name: ', name);
    console.log('SAVE - type: ', type);
    console.log('SAVE - workoutdata: ', workoutData);


    if (editing) {
      let id;
      documentIds.forEach((item) => {
        if (item.name === name) {
          id = item.id;
        }
      });

      console.log('which id did we find: ', id);

      return firebaseService.updateSavedWorkoutData(uid, workoutData, type, id)
        .then(() => {
          if (type === 'program') {
            dispatch({ type: SAVE_PROGRAM });
          } else {
            dispatch({ type: SAVE_WORKOUT });
          }

          dispatch({ type: SAVE_SUCCESSFUL });
        })
        .catch(error => {
          console.log('saveWorkoutData() error: ', error);
          dispatch({ type: SAVE_FAILED});
        })
    } else {
      return firebaseService.saveWorkoutData(uid, name, workoutData, type)
        .then(() => {
          if (type === 'program') {
            dispatch({ type: SAVE_PROGRAM });
          } else {
            dispatch({ type: SAVE_WORKOUT });
          }

          dispatch({ type: SAVE_SUCCESSFUL });
        })
        .catch(error => {
          console.log('saveWorkoutData() error: ', error);
          dispatch({ type: SAVE_FAILED});
        })
    }
  }
}

export function showSuccessAlert() {
  return { type: SAVE_SUCCESSFUL };
}

export function showFaileAlert() {
  return { type: SAVE_FAILED };
}

export function hideAlert() {
  return { type: HIDE_ALERT };
}


/*
* V2 actions
* */

export const addProgramAction = data => ( {
  type: ADD_PROGRAM,
  payload: data,
} );

export const buildChangeWeekAction = data => ( {
  type: BUILD_CHANGE_WEEK,
  payload: data,
} );

export const buildDeleteExerciseAction = data => ( {
  type: BUILD_DELETE_EXERCISE,
  payload: data,
} );

export const buildEditFieldAction = data => ( {
  type: BUILD_EDIT_FIELD,
  payload: data,
} );

export const buildSaveWorkoutAction = data => ( {
  type: BUILD_SAVE_WORKOUT,
  payload: data,
} );

export const buildUpdateExerciseOrderAction = data => ( {
  type: BUILD_UPDATE_EXERCISE_ORDER,
  payload: data,
} );

export const copyBuildObjectAction = data => ( {
  type: COPY_BUILD_OBJECT,
  payload: data,
} );


export const createProgramAction = data => ( {
  type: CREATE_PROGRAM,
  payload: data,
} );

// TODO does this need to be BUILD_EDIT_PROGRAM
export const editProgramAction = data => ( {
  type: EDIT_PROGRAM,
  payload: data,
} );

export const openDeleteScreenAction = data => ( {
  type: OPEN_DELETE_SCREEN,
  payload: data,
} );

export const storeProgramConfigAction = data => ( {
  type: STORE_PROGRAM_CONFIG,
  payload: data,
} );

export const updateDayTitleAction = data => ( {
  type: UPDATE_DAY_TITLE,
  payload: data,
} );
