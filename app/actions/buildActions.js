import {
  USER_ADDING_WORKOUT,
  ANSWERED_QUESTION,
  GET_EXERCISE_LIST,
  SELECT_MUSCLE_GROUP,
  SELECT_EXERCISE,
  ADD_EXERCISES,
  UPDATE_EXERCISE_LIST,
  REMOVE_SELECTED_EXERICISE,
  OPEN_EXERCISE_LIST,
  RESET_DATA,
  UPDATE_FIELD,
  SORT_EXERCISES,
  SAVE_EXERCISE_ORDER,
  OPEN_DELETE_PAGE,
  DELETE_EXERCISE,
  OPEN_CUSTOM_SET,
  SAVE_CUSTOM_SET,
  UPDATE_DAY,
  CREATE_WORKOUT_OBJECT,
  CHANGE_WEEK,
  COPY_WEEK,
  ADD_CUSTOM_EXERCISE,
  SAVE_EXERCISE_TO_PROFILE,
  USER_ADDING_PROGRAM,
  SAVE_PROGRAM,
  SAVE_WORKOUT,
  SAVE_SUCCESSFUL,
  SAVE_FAILED,
  HIDE_ALERT,
  STORE_SAVED_PROGRAMS, USER_EDITING_PROGRAM, USER_EDITING_WORKOUT
} from '../constants/buildConstants';
import firebaseService from '../utilities/firebase';


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

// todo replaced this
export function answeredQuestion(data) {
  return { type: ANSWERED_QUESTION, data };
}

// todo replaced this
export function getExerciseList() {
  return (dispatch, getState) => {
    const { exerciseList, customExercises } = getState().buildReducer;
    const newList = JSON.parse(JSON.stringify(exerciseList));
    let exercise;
    let userAddedExercises;

    if (customExercises !== '') {
      userAddedExercises = formatCustomExercises(customExercises);
    }

    return firebaseService.getExerciseList()
      .then((querySnapshot) => {
        querySnapshot.forEach((document) => {
          exercise = document.data();
          exercise.selected = false;
          newList[`${document.data().muscleGroup}`].push(exercise);
        });

        if (customExercises !== '') {
          userAddedExercises.forEach(item => {
            newList[item.muscleGroup].push(item);
          });

          Object.keys(newList).forEach(key => {
            newList[key].sort((a, b) => {
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              return 0;
            });
          });
        }

        dispatch({ type: GET_EXERCISE_LIST, newList });
      })
      .catch((error) => {
        console.log('buildActions.js ->  getExerciseList() error: ', error);
      })
  }
}

// todo replaced this
function formatCustomExercises(customExercises) {
  return customExercises.map((item) => {
    let newItem = Object.assign({}, item);
    newItem.selected = false;
    newItem.compound = (item.type === 'Compound');
    newItem.isolation = (item.type === 'Isolation');
    delete newItem.type;

    return newItem;
  });
}

// todo replaced this
export function addExercises() {
  return (dispatch, getState) => {
    const { workouts, weekSelected, daySelected, selectedExercises, exerciseList } = getState().buildReducer;

    console.log('selected exercises: ', selectedExercises);
    const exercises = formatExerciseData(selectedExercises);
    console.log('exercises in action: ', exercises);
    let updatedWorkout = JSON.parse(JSON.stringify(workouts));
    updatedWorkout[weekSelected][daySelected].exercises.push(...exercises);

    let resetExerciseList = JSON.parse(JSON.stringify(exerciseList));
    Object.keys(resetExerciseList).forEach(muscleGroup => {
     resetExerciseList[muscleGroup].forEach(exercise => {
        if (exercise.selected) {
          exercise.selected = false;
        }
      });
    });


    dispatch({ type: ADD_EXERCISES, payload: {updatedWorkout, resetExerciseList} })
  }
}

// todo replaced this
function formatExerciseData(exercises) {
  return exercises.map(item => {
    return {
      exercise: item.name,
      reps: '',
      sets: '',
      weight: '',
      muscleGroup: item.muscleGroup,
      compound: (item.compound === true),
      isolation: (item.isolation === true),
    }
  });
}

// todo replaced this
export function selectMuscleGroup(muscleGroup) {
  return { type: SELECT_MUSCLE_GROUP, muscleGroup };
}

// todo replaced this
export function selectExercise(exercise) {
  return { type: SELECT_EXERCISE, exercise };
}

// todo replaced this
export function removeSelectedExercise(exercises) {
  return { type: REMOVE_SELECTED_EXERICISE, exercises }
}

// todo replaced this
export function updateList(exerciseList) {
  return { type: UPDATE_EXERCISE_LIST, exerciseList };
}

// todo replaced this
export function openExerciseList(weekSelected, daySelected) {
  return { type: OPEN_EXERCISE_LIST, payload: { weekSelected, daySelected } };
}

// todo replaced this
export function resetData() {
  return { type: RESET_DATA }
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
  return { type: OPEN_DELETE_PAGE, payload: { weekSelected, daySelected } }
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

// todo replaced this
export function updateDay(name, weekSelected, daySelected) {
  return (dispatch, getState) => {
    const { workouts } = getState().buildReducer;
    const updatedWorkout = JSON.parse(JSON.stringify(workouts));
    updatedWorkout[weekSelected][daySelected].day = name;

    dispatch({ type: UPDATE_DAY, updatedWorkout });
  };
}

// todo replaced this
export function createWorkoutObject() {
  return (dispatch, getState) => {
    const { weeks, daysPerWeek } = getState().buildReducer;
    const workout = {};
    for (let i = 0; i < weeks; i += 1 ) {
      workout[`week${i + 1}`] = [];
      for (let j = 0; j < daysPerWeek; j += 1) {
        workout[`week${i + 1}`].push({
          completed: false,
          day: `Day ${j + 1}`,
          exercises: [],
        })
      }
    }

    dispatch({ type: CREATE_WORKOUT_OBJECT, workout });
  };
}

// todo replaced this
export function changeWeek(week) {
  const updatedWeek = week.replace(/\s/g, '').toLowerCase();
  return { type: CHANGE_WEEK, updatedWeek };
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

// todo replaced this
export function addCustomExercise(exercise) {
  return (dispatch, getState) => {
    const { exerciseList } = getState().buildReducer;
    const updatedList = JSON.parse(JSON.stringify(exerciseList));
    const { name, muscleGroup, type } = exercise;
    const customExercise = {
      compound: (type === 'Compound'),
      isolation: (type === 'Isolation'),
      name,
      muscleGroup,
      selected: false,
    };

    updatedList[muscleGroup].push(customExercise);
    updatedList[muscleGroup].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });

    dispatch({ type: ADD_CUSTOM_EXERCISE, updatedList });
  }
}

// todo replaced this
export function addCustomExerciseToProfile(exercise) {
  return (dispatch, getState) => {
    const { uid } = getState().authentication;
    const { customExercises } = getState().buildReducer;

    let allExercises = (customExercises !== '')
                          ? [exercise, ...customExercises]
                          : [exercise];

    return firebaseService.updateProfile(uid, {customExercises: allExercises})
      .then(() => dispatch({ type: SAVE_EXERCISE_TO_PROFILE }));
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

// export function getSavedPrograms() {
//   return (dispatch, getState) => {
//     const { uid } = getState().authentication;
//     let programs = [];
//     let workouts = [];
//
//     return firebaseService.getSavedPrograms(uid)
//       .then((querySnapshot) => {
//
//
//         querySnapshot.forEach((document) => {
//           if (document.data().type === 'program') {
//             programs.push(document.data());
//           } else {
//             workouts.push(document.data());
//           }
//         });
//
//         dispatch({ type: GET_SAVED_PROGRAMS, payload: { programs, workouts } });
//       })
//   }
// }



// TODO: has been moved
export function storeSavedPrograms(programs, workouts, documentIds) {
  return { type: STORE_SAVED_PROGRAMS, payload: { programs, workouts, documentIds } };
}























