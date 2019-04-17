import { createSelector } from "reselect";


export const getSaveWorkoutLoadingState = state => state.workoutsApi.buildWorkoutSaveLoading;

export const getSaveTrackedWorkoutLoading = state => state.workoutsApi.saveTrackedWorkoutLoading;

export const getBuildSaveRedirect = state => state.workoutsApi.buildSaveRedirect;

export const getDocumentIds = state => state.workoutsApi.documentIds;

export const getWorkoutType = createSelector(
  state => state.program.active,
  state => state.workout.active,
  (programState, workoutState) => {
    if (programState) {
      return 'program';
    }
    else if (workoutState) {
      return 'workout';
    }
  }
);

export const getWorkout = createSelector(
  state => state.program,
  state => state.workout,
  (programState, workoutState) => {
    if (programState.active) {
      return programState.program;
    }
    else if (workoutState.active) {
      return workoutState.workout;
    }
  }
);

export const getDaysExercises = createSelector(
  state => state.program,
  state => state.workout,
  (programState, workoutState) => {
    if (programState.active) {

      const { program, weekSelected, daySelected } = programState;
      return program[weekSelected][daySelected].exercises;
    }
    else if (workoutState.active) {
      return workoutState.workout.week1[0].exercises;
    }
  }
);


export const getWeekSelected = createSelector(
  state => state.program,
  state => state.workout,
  (programState, workoutState) => {

    if (programState.active) {
      return programState.weekSelected;
    }
    else if (workoutState.active) {
      return workoutState.weekSelected;
    }
  }
);

export const getDaySelected = createSelector(
  state => state.program,
  state => state.workout,
  (programState, workoutState) => {
    if (programState.active) {
      return programState.daySelected;
    }
    else if (workoutState.active) {
      return workoutState.daySelected;
    }
  }
);

export const getExerciseForCustomSet = createSelector(
  state => state.program,
  state => state.workout,
  (programState, workoutState) => {
    if (programState.active) {
      const { program, weekSelected, daySelected, customSetIndex } = programState;
      return program[weekSelected][daySelected].exercises[customSetIndex];
    }
    else if (workoutState.active) {
      const { workout, customSetIndex } = workoutState;
      return workout.week1[0].exercises[customSetIndex];
    }
  }
);



// Loading selector for both completed exercises and saved workouts
export const getWorkoutRequestsLoadingState = createSelector(
  state => getSavedWorkoutsLoading(state),
  state => getCompletedExercisesLoading(state),
  (workoutsLoading, completedExercisesLoading) => {
    if (workoutsLoading || completedExercisesLoading) {
      return true;
    }

    return false;
  }
);


export const getCompletedExercisesLoading = createSelector(
  state => state.workoutsApi.getCompletedExercisesLoading,
  loading => loading,
);

export const getSavedWorkoutsLoading = createSelector(
  state => state.workoutsApi.savedWorkoutsLoading,
  loading => loading,
);

