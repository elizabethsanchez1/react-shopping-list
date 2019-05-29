import { createSelector } from 'reselect';


export const getSavedWorkouts = state => state.savedWorkouts;

export const getPrograms = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.programs,
);

export const getProgramByDocumentId = ( state, documentId ) => {
  const { programs, workouts } = getSavedWorkouts( state )
  return [ ...programs, ...workouts ].find( workout => workout.documentId === documentId );
};

export const getWorkouts = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.workouts,
);
