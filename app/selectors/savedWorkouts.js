import { createSelector } from 'reselect';


export const getSavedWorkouts = state => state.savedWorkouts;

export const getPrograms = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.programs,
);

export const getWorkouts = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.workouts,
);
