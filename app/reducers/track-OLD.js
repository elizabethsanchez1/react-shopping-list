import {
  BUILD_EXERCISE_HISTORY,
  CALCULATE_PROGRAM_ATTEMPT,
  FORMAT_EXERCISES,
  MARK_PROGRAM_COMPLETED_FLAGS, MODIFY_SETS,
  QUICK_TRACK,
  REMOVE_EXERCISE,
  SELECTED_DAY,
  SELECTED_PROGRAM,
  SELECTED_WEEK,
  SELECTED_WORKOUT, STORE_ADD_EXERCISE_INDEX,
  UPDATE_FIELD
} from '../constants/track';
import moment from "moment";
import { ADD_EXERCISES } from "../constants/exercises";
import { FETCH_COMPLETED_EXERCISES_SUCCESS, SAVE_TRACKED_WORKOUT_SUCCESS } from "../constants/workoutsApi";

export const initialState = {
  trackerSetupLoading: true,
  attemptInfo: {},
  exerciseHistory: {},
  redirectToSummary: false,
  selectedData: {},
  type: '',
  selectedDay: '',
  selectedWeek: '',
  trackedExercises: [],
  // TODO: how am I going to handle resetting programs
  // continueProgram: false,
  // resetProgram: false,
  completedExercises: [],
  completedWeeks: [],
  active: false,
  trackableExerciseSets: [],
  addExerciseIndexLocation: 0,
};


/**
 *
 * @param {Object} selectedData
 * @param {String} type
 * @param {String} selectedWeek
 * @param {Number} selectedDay
 * @param {Number} exerciseIndex
 * @param {Array} newExercises
 * @param {Array} exerciseSets
 * @returns {{updatedData: Object, formattedExercises: Array}}
 */
export const addExercises = (selectedData, type, selectedWeek, selectedDay, exerciseIndex, newExercises, exerciseSets) => {

  const updatedData = JSON.parse(JSON.stringify(selectedData));
  if (type === 'program') {
    const { exercises } = updatedData[type][selectedWeek][selectedDay];

    const exerciseObjects = newExercises.map(exercise => {
      return {
        weight: '',
        reps: '',
        sets: 3,
        exercise: exercise.name,
        muscleGroup: exercise.muscleGroup,
        compound: (exercise.compound),
        isolation: (exercise.isolation)
      }
    });

    const updatedExercises = exercises
                  .slice(0, exerciseIndex)
                  .concat(exerciseObjects)
                  .concat(exercises.slice(exerciseIndex));

    updatedData[type][selectedWeek][selectedDay].exercises = updatedExercises;

    const formattedExercises = exerciseSets
                                  .slice(0, exerciseIndex)
                                  .concat(formatExercises(exerciseObjects))
                                  .concat(exerciseSets.slice(exerciseIndex));

    return { updatedData, formattedExercises };
  }
};

export const buildExerciseHistory = (state) => {
  const { selectedData, selectedDay, selectedWeek, completedExercises } = state;
  let exerciseHistory = {};
  const currentExercises = selectedData.program[selectedWeek][selectedDay].exercises
                            .map(item => item.exercise);

  currentExercises.forEach(item => {
    const previousAttempts = completedExercises
      .filter(exercise => exercise.exercise === item)
      .sort((a, b) => a.trackedOn - b.trackedOn)
      .slice(-3)
      .reverse();

    if (previousAttempts.length > 0) {
      const sortedPersonalRecords = [...previousAttempts]
                                      .sort((a, b) => a.estimated1RM - b.estimated1RM);

      const personalBestRM = sortedPersonalRecords[sortedPersonalRecords.length - 1].estimated1RM;

      const personalRecord = sortedPersonalRecords
        .find(element => element.estimated1RM === personalBestRM);

      const formattedPreviousAttempts = [...previousAttempts].map(attempt => {
        return {
          sets: attempt.trackedReps.length,
          weight: `${attempt.trackedWeights[0]} lbs`,
          reps: attempt.trackedReps[0],
          date: moment(attempt.trackedOn).fromNow(),
          trackedReps: attempt.trackedReps,
          trackedWeight: attempt.trackedWeights
        }
      });

      const allTimeMax = [{
        rm1: personalRecord.estimated1RM,
        rm3: personalRecord.estimated3RM,
        rm5: personalRecord.estimated5RM,
        rm8: personalRecord.estimated8RM,
        rm10: personalRecord.estimated10RM,
      }];


      const latestMaxes = [{
        rm1: previousAttempts[0].estimated1RM,
        rm3: previousAttempts[0].estimated3RM,
        rm5: previousAttempts[0].estimated5RM,
        rm8: previousAttempts[0].estimated8RM,
        rm10: previousAttempts[0].estimated10RM,
      }];

      exerciseHistory[item] = {
        previousAttempts,
        personalRecord,
        formattedPreviousAttempts,
        allTimeMax,
        latestMaxes
      };
    }
  });

  return exerciseHistory;
};

// TODO: not accounting for scenarios where user has multiple attempts or when user hits reset on a program
export const calculateProgramAttempt = (selectedData, documentIds) => {
  const { activeAttempt, attempts } = selectedData;
  const selectedId = documentIds.find(element => element.name === selectedData.name);

  if (activeAttempt === '') {
    const activeString = selectedData.name
                    .split(' ')
                    .map(item => item.toLowerCase())
                    .join('_');

    const updatedActiveAttempt = {
     attempt:  `${activeString}_attempt_1`,
     startedTracking: new Date(),
     finishedTracking: '',
    };

    const updatedAttempts = (attempts.length > 1)
      ? [...attempts, updatedActiveAttempt]
      : [updatedActiveAttempt];

    return {
      id: selectedId.id,
      activeAttempt: updatedActiveAttempt.attempt,
      attempts: updatedAttempts,
      updateDatabase: true,
    };
  }

  if (activeAttempt !== '') {
    return {
      id: selectedId.id,
      activeAttempt,
      attempts,
      updateDatabase: false,
    }
  }
};



export const _calculateCompletedWeeks = (program, startedTracking) => {
  console.log('Program data used for completed weeks: ', program);
  const weeks = Object.keys(program).sort((a, b) => {
    return parseInt(a.substring(4)) - parseInt(b.substring(4));
  });

  // For some weird reason passing any kind of format to the moment
  // date object throws a deprecation warning, keep format() empty
  const today = moment().format();
  const startTrackingFormatted = moment(startedTracking).format();

  let weekCompletions = weeks.map((item, index) => {
    const endMultiplyer = `${7 * (index + 1)}`;
    const beginMultiplyer = `${7 * index}`;
    const endDate = moment(startTrackingFormatted)
                    .startOf('day')
                    .add(endMultiplyer, 'days')
                    .format();

    const startDate = moment(startTrackingFormatted)
                      .startOf('day')
                      .add(beginMultiplyer, 'days')
                      .format();

    return {
      label: `Week ${index + 1}`,
      week: item,
      completed: false,
      currentWeek: moment(today).isBetween(startDate, endDate),
    };
  });

  Object.keys(program).forEach((week) => {
    let completedWeek = true;

    program[week].forEach(day => {
      if (day.completed === false) {
        completedWeek = false;
      }
    });

    weekCompletions.forEach(item => {
      if (item.week === week) {
        item.completed = completedWeek
      }
    })
  });

  return weekCompletions;
};

/**
 *
 * @param {Object[]} exercises
 * @returns {Object[]}
 */
export const formatExercises = (exercises) => {
  return exercises.map((exercise) => {
    const sets = parseInt(exercise.sets, 10);
    const eachSet = [];

    for (let i = 0; i < sets; i += 1) {
      eachSet.push({
        set: i + 1,
        previous: '',
        weight: '',
        reps: ''
      });
    }

    return eachSet;
  });
};

export const markProgramCompletedFlags = (state, action) => {
  const { selectedData, completedExercises } = action.payload;
  let startedTracking;


  const clonedData = JSON.parse(JSON.stringify(selectedData));

  if (completedExercises.length > 0) {

    const { attempts, activeAttempt, program } = clonedData;

    const exercisesCompleted = completedExercises.filter(exercise => {
      if (exercise.belongsTo === activeAttempt) {
        return exercise;
      }
    });

    exercisesCompleted.forEach(exercise => {
      program[exercise.week][exercise.day].completed = true;
    });

    attempts.forEach(item => {
      if (item.attempt === activeAttempt) {
        startedTracking = item.startedTracking;
      }
    });
  }

  const completedWeeks = _calculateCompletedWeeks(clonedData.program, startedTracking);

  return {
    ...state,
    selectedData: clonedData,
    completedWeeks,
  }
};

// TODO change this to only work for adding exercise, or exercises and remove the stuff for removing exercises
export const modifySets = (exerciseSets, exerciseIndex, modification) => {
  const updatedSets = JSON.parse(JSON.stringify(exerciseSets));

  if (modification === 'add') {
    const newSet = {
      set: updatedSets[exerciseIndex].length + 1,
      previous: '',
      weight: '',
      reps: ''
    };

    updatedSets[exerciseIndex].push(newSet);
  }


  if (modification === 'remove') {
    updatedSets[exerciseIndex].pop();
  }

  return updatedSets;
};

export const quickTrack = (exercises, exerciseSets, exerciseIndex) => {
  const currentExercise = exercises[exerciseIndex];
  const targetReps = parseInt(currentExercise.reps, 10);
  const targetWeight = parseInt(currentExercise.weight, 10);
  const updatedExerciseSets = JSON.parse(JSON.stringify(exerciseSets));


  updatedExerciseSets[exerciseIndex].forEach(item => {
    item.weight = targetWeight;
    item.reps = targetReps
  });

  return updatedExerciseSets;
};

export const removeExercise = (selectedData, type, selectedWeek, selectedDay, exerciseIndex, exerciseSets) => {

  const updatedData = JSON.parse(JSON.stringify(selectedData));

  if (type === 'program') {
    const { exercises } = selectedData[type][selectedWeek][selectedDay];
    // const removeIndex = exerciseIndex - 1;
    let updatedExercises;

    updatedExercises = exercises.slice(0, exerciseIndex).concat(exercises.slice(exerciseIndex + 1));
    updatedData[type][selectedWeek][selectedDay].exercises = updatedExercises;


    const trackableExerciseSets = exerciseSets.slice(0, exerciseIndex).concat(exerciseSets.slice(exerciseIndex + 1));

    return {selectedData: updatedData, trackableExerciseSets };
  }

  return selectedData
};

export const updateField = (workout, exerciseIndex, setIndex, field, value) => {
  if (value !== '') {
    const updatedWorkout = JSON.parse(JSON.stringify(workout));
    updatedWorkout[exerciseIndex][setIndex][field] = parseInt(value, 10);

    return updatedWorkout;
  }

  return workout;
};



function editTrackDashboardReducer(state, action) {
  switch(action.type) {
    case ADD_EXERCISES: {
      /*
       TODO:REMEMBER this is dependent on exercises reducer happening after this one since it handled clearing out the selected exercises
      */
      const updatedWorkoutInfo = addExercises(
        action.payload.selectedData,
        action.payload.type,
        action.payload.selectedWeek,
        action.payload.selectedDay,
        action.payload.exerciseIndex,
        action.payload.newExercises,
        action.payload.exerciseSets,
      );

      return {
        ...state,
        selectedData: updatedWorkoutInfo.updatedData,
        trackableExerciseSets: updatedWorkoutInfo.formattedExercises,
      }
    }

    // case MODIFY_SETS:
    //   return {
    //     ...state,
    //     trackableExerciseSets: modifySets(
    //       action.payload.exerciseSets,
    //       action.payload.exerciseIndex,
    //       action.payload.modification
    //     )
    //   };

    case QUICK_TRACK:
      return {
        ...state,
        trackableExerciseSets: quickTrack(
          action.payload.exercises,
          action.payload.exerciseSets,
          action.payload.exerciseIndex)
      };

    case REMOVE_EXERCISE: {
      const updatedData = removeExercise(
        action.payload.selectedData,
        action.payload.type,
        action.payload.selectedWeek,
        action.payload.selectedDay,
        action.payload.exerciseIndex,
        action.payload.exerciseSets,
      );

      return {
        ...state,
        selectedData: updatedData.selectedData,
        trackableExerciseSets: updatedData.trackableExerciseSets,
      }
    }

    case STORE_ADD_EXERCISE_INDEX:
      return {
        ...state,
        addExerciseIndexLocation: action.payload.index,
      };

    default:
      return state;
  }
}


export default function trackDashboardReducer(state = initialState, action) {
  switch (action.type) {

    case ADD_EXERCISES: {
      if (state.active) {
        return editTrackDashboardReducer(state, action)
      }
      else {
        return state;
      }
    }

    case BUILD_EXERCISE_HISTORY:
      return Object.assign({}, state, {
        exerciseHistory: buildExerciseHistory(state),
      });

    case CALCULATE_PROGRAM_ATTEMPT:
      return Object.assign({}, state, {
        attemptInfo: calculateProgramAttempt(
                      action.payload.selectedData,
                      action.payload.documentIds),
      });

    // case CONTINUE_PROGRAM:
    //   return Object.assign({}, state, {
    //     continueProgram: true,
    //     resetProgram: false,
    //   });

    case FORMAT_EXERCISES:
      return Object.assign({}, state, {
        trackableExerciseSets: formatExercises(action.payload.exercises),
        active: true,
        trackerSetupLoading: false,
      });


    case FETCH_COMPLETED_EXERCISES_SUCCESS:
      return Object.assign({}, state, {
        completedExercises: action.payload.completedExercises,
      });

    case MARK_PROGRAM_COMPLETED_FLAGS:
      return markProgramCompletedFlags(state, action);

    // case MODIFY_SETS:
    //   return editTrackDashboardReducer(state, action);

    case QUICK_TRACK:
      return editTrackDashboardReducer(state, action);

    // case RESET_PROGRAM:
    //   return Object.assign({}, state, {
    //     continueProgram: false,
    //     resetProgram: true,
    //   });

    case REMOVE_EXERCISE:
      return editTrackDashboardReducer(state, action);


    case SAVE_TRACKED_WORKOUT_SUCCESS:
      return Object.assign({}, state, {
        redirectToSummary: true,
        trackedExercises: action.payload.trackedExercises,
        active: false,
      });

    case SELECTED_WORKOUT:
      return Object.assign({}, state, {
        redirectToSummary: false,
        selectedData: action.selected,
        type: 'workout',
      });

    case SELECTED_PROGRAM:
      return Object.assign({}, state, {
        redirectToSummary: false,
        selectedData: action.selected,
        type: 'program',
      });

    case SELECTED_WEEK:
      return Object.assign({}, state, {
        selectedWeek: action.week,
      });

    case SELECTED_DAY:
      return Object.assign({}, state, {
        selectedDay: action.day
      });

    case STORE_ADD_EXERCISE_INDEX:
      return editTrackDashboardReducer(state, action);

    case UPDATE_FIELD:
      return Object.assign({}, state, {
        trackableExerciseSets: updateField(
                                action.payload.exerciseSets,
                                action.payload.exerciseIndex,
                                action.payload.setIndex,
                                action.payload.field,
                                action.payload.value,
                                ),
      });

    default:
      return state;
  }
}
