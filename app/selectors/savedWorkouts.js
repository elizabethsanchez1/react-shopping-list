import { createSelector } from 'reselect';
import { calculateActiveAttempt, getTrackDocumentId } from './track';



export const calculateProgramAttemptInfo = ( state ) => {
  const documentId = getTrackDocumentId( state );
  const program = getProgramByDocumentId( state, documentId );
  const latestActiveAttempt = calculateActiveAttempt( state );

  const { activeAttempt, attempts } = program;
  const trackingExistingAttempt = ( attempts.length > 0 && activeAttempt === latestActiveAttempt );
  const trackingProgramFirstTime = ( attempts.length === 0 );

  if ( attempts.length > 0 && activeAttempt !== latestActiveAttempt ) {
    // making a second attempt for a program
    return null;
  }

  if ( trackingExistingAttempt ) {
    // tracking for an existing attempt
    return {
      update: false,
    };
  }

  if ( trackingProgramFirstTime ) {
    return {
      documentId,
      update: true,
      program: {
        ...program,
        activeAttempt: latestActiveAttempt,
        attempts: [
          {
            attempt: latestActiveAttempt,
            startedTracking: new Date(),
            finishedTracking: '',
          },
        ],
      },
    };
  }

  return null;
};

export const getSavedWorkouts = state => state.savedWorkouts;

export const getPrograms = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.programs || [],
);

export const getProgramByDocumentId = ( state, documentId ) => {
  const programs = getPrograms( state );
  const workouts = getWorkouts( state );

  return [ ...programs, ...workouts ].find( workout => workout.documentId === documentId );
};

export const getWorkouts = createSelector(
  state => getSavedWorkouts( state ),
  savedWorkouts => savedWorkouts.workouts || [],
);
