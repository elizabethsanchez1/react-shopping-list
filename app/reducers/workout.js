import { FETCH_SAVED_WORKOUTS_SUCCESS } from "../constants/workoutsApi";
import { createSelector } from 'reselect';
import {
  ADD_WORKOUT,
  CREATE_WORKOUT_OBJECT,
  EDIT_WORKOUT,
  STORE_WORKOUT_CONFIG,
  WORKOUT_DELETE_EXERCISE,
  WORKOUT_OPEN_CUSTOM_SET,
  WORKOUT_SAVE_CUSTOM_SET,
  WORKOUT_SAVE_ORDER,
  WORKOUT_UPDATE_DAY
} from "../constants/workout";
import { ADD_PROGRAM, EDIT_FIELD } from "../constants/program";
import { ADD_EXERCISES, OPEN_EXERCISE_LIST } from "../constants/exercises";


const inititalState = {
  // shared
  active: false,           // will replace workoutType
  workoutType: '',         // is this even needed anymore ?

  // creating
  savedWorkouts: {},
  weeks: '',               // is this ever not 1 ?
  daysPerWeek: '',         // is this ever not 1 ?
  weekSelected: '',        // is this ever not week1 ?
  daySelected: '',         // is this ever not 0 ?
  workout: {},
  // name: '',


  // editing
  editing: '',             // is really even needed anymore
  customSetIndex: ''
};

export const getWorkouts = createSelector(
  state => state.workout.savedWorkouts,
  (workouts) => workouts,
);

export const createWorkoutObject = (name, weeks = 1, daysPerWeek = 1) => {
  const workout = {};

  for (let i = 0; i < parseInt(weeks, 10); i += 1 ) {
    workout[`week${i + 1}`] = [];
    for (let j = 0; j < parseInt(daysPerWeek, 10); j += 1) {
      workout[`week${i + 1}`].push({
        completed: false,
        // day: `Day ${j + 1}`,
        day: name,
        exercises: [],
      })
    }
  }

  return workout;
};


export const addExercises = (selectedExercises, daySelected, workout) => {
  console.log('addExercises fired in the workout reducer');
  const formattedExercises = formatExerciseData(selectedExercises);
  const updatedWorkout = JSON.parse(JSON.stringify(workout));

  updatedWorkout.week1[daySelected].exercises.push(...formattedExercises);

  return updatedWorkout;
};

export const deleteExercise = (exerciseIndex, workout) => {
  const updatedWorkout = JSON.parse(JSON.stringify(workout));
  const exercises = updatedWorkout.week1[0].exercises;
  exercises.splice(exerciseIndex, 1);

  return updatedWorkout;
};

export const formatExerciseData = (exercises) => {
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
};

export const editField = (workout, fieldUpdate) => {
  const updatedWorkout = JSON.parse(JSON.stringify(workout));
  const { exerciseLocation, field, value } = fieldUpdate;

  updatedWorkout.week1[0].exercises[exerciseLocation][field] = value;

  return updatedWorkout;
};

export const mergeCustomSet = (customSet, workoutState) => {
  const { workout, customSetIndex } = workoutState;
  const updatedWorkout = JSON.parse(JSON.stringify(workout));
  updatedWorkout.week1[0].exercises.splice(customSetIndex, 1, customSet);

  return updatedWorkout;
};


export const updateExerciseOrder = (newOrder, workout) => {
  const updatedWorkout = JSON.parse(JSON.stringify(workout));
  const selectedExercises = updatedWorkout.week1[0].exercises;
  const reOrderedExercises = [];

  newOrder.forEach(item => {
    const selectedItem = selectedExercises.slice(parseInt(item), parseInt(item) + 1);
    reOrderedExercises.push(...selectedItem);
  });

  updatedWorkout.week1[0].exercises = reOrderedExercises;
  return updatedWorkout;
};


export const updateDay = (workout, name) => {
  const workoutCopy = JSON.parse(JSON.stringify(workout));
  workoutCopy.week1[0].day = name;
  return workoutCopy
};



function editWorkout(state, action) {

  switch(action.type) {
    case ADD_EXERCISES: {
      /*
       TODO:REMEMBER this is dependent on exercises reducer happening after this one since it handled clearing out the selected exercises
      */
      const updatedWorkout = addExercises(
        action.payload.selectedExercises,
        state.daySelected,
        state.workout,
      );

      return Object.assign({}, state, {
        workout: updatedWorkout,
      });
    }

    case EDIT_FIELD:
      return Object.assign({}, state, {
        workout: editField(state.workout, action.payload.update),
      });

    case EDIT_WORKOUT:
      return Object.assign({}, state, {
        active: true,
        workoutType: 'workout',
        weeks: 1,
        daysPerWeek: 1,
        workout: JSON.parse(JSON.stringify(action.payload.workout.workout)),
        editing: true,
        name: action.payload.workout.name,
        weekSelected: 'week1',
        daySelected: 0,
      });

    case OPEN_EXERCISE_LIST:
      return Object.assign({}, state, {
        daySelected: action.payload.daySelected,
      });

    case WORKOUT_DELETE_EXERCISE:
      return Object.assign({}, state, {
        workout: deleteExercise(
                  action.payload.exerciseIndex,
                  state.workout)
      });

    case WORKOUT_OPEN_CUSTOM_SET:
      return Object.assign({}, state, {
        customSetIndex: action.payload.exerciseSelected,
      });

    case WORKOUT_SAVE_CUSTOM_SET:
      return Object.assign({}, state, {
        workout: mergeCustomSet(
                  action.payload.customSet,
                  state,
                )
      });

    case WORKOUT_SAVE_ORDER:
      return Object.assign({}, state, {
        workout: updateExerciseOrder(action.payload.newOrder, state.workout),
      });

    case WORKOUT_UPDATE_DAY:
      return Object.assign({}, state, {
        workout: updateDay(
                  state.workout,
                  action.payload.name,
                ),
        name: action.payload.name,
      });

    default:
      return state;
  }
}


export default function workout(state = inititalState, action) {

  switch(action.type) {
    case ADD_EXERCISES: {
      if (state.active) {
        return editWorkout(state, action);
      }
      else {
        return state;
      }
    }

    case ADD_PROGRAM:
      return Object.assign({}, state, {
        active: false,
      });

    case ADD_WORKOUT:
      return Object.assign({}, state, {
        active: true,
        workoutType: 'workout',
        weeks: 1,
        daysPerWeek: 1,
        weekSelected: 'week1',
        daySelected: 0,
        editing: false,
      });

    case CREATE_WORKOUT_OBJECT:
      return Object.assign({}, state, {
        workout: createWorkoutObject(state.name, 1, 1)
      });

    case EDIT_FIELD: {
      if (state.active) {
        return editWorkout(state, action);
      }
      else {
        return state;
      }
    }

    case EDIT_WORKOUT:
      return editWorkout(state, action);

    case FETCH_SAVED_WORKOUTS_SUCCESS:
      return Object.assign({}, state, {
        savedWorkouts: action.payload.workouts,
      });

    case OPEN_EXERCISE_LIST: {
      if (state.active) {
        return editWorkout(state, action);
      }
      else {
        return state;
      }
    }

    case STORE_WORKOUT_CONFIG:
      return Object.assign({}, state, {
        name: action.payload.config.name,
        weeks: 1,
        daysPerWeek: 1,
        schedule: action.payload.config.schedule,
        template: action.payload.config.template
      });

    case WORKOUT_DELETE_EXERCISE:
      return editWorkout(state, action);

    case WORKOUT_OPEN_CUSTOM_SET:
      return editWorkout(state, action);

    case WORKOUT_SAVE_ORDER:
      return editWorkout(state, action);

    case WORKOUT_SAVE_CUSTOM_SET:
      return editWorkout(state, action);

    case WORKOUT_UPDATE_DAY:
      return editWorkout(state, action);

    default:
      return state;
  }
}


