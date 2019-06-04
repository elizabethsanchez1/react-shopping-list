import { createSelector } from 'reselect';
import { getCompletedExercises } from './completedExercises';
import { getBodyLogs } from './bodyLogs';
import theme from '../styles/theme.style';
import dateHelpers from '../utilities/dateHelpers';

export const getLogs = state => state.logs;

export const getLogSelectedDay = createSelector(
  state => getLogs( state ),
  logs => logs.selectedDay,
);

export const getMarkedDates = state => {
  const completedExercises = getCompletedExercises( state );
  const savedBodyLogs = getBodyLogs( state );

  const workoutLog = { key: 'workoutLog', color: theme.ACCENT_YELLOW };
  const bodyLog = { key: 'bodyLog', color: theme.ACCENT_GREEN };

  const workoutDates = completedExercises.map( exercise => {
    return dateHelpers.formatUnix( exercise.trackedOn.seconds, 'YYYY-MM-DD' );
  } );

  const bodyLogDates = savedBodyLogs.map( log => {
    return dateHelpers.formatUnix( log.trackedOn.seconds, 'YYYY-MM-DD' );
  } );

  const uniqueWorkoutDates = [ ...new Set( workoutDates ) ].sort();
  const uniqueBodyLogDates = [ ...new Set( bodyLogDates ) ].sort();
  const allDates = [ ...uniqueWorkoutDates, ...uniqueBodyLogDates ].sort();
  const markedDates = {};

  allDates.forEach( date => {

    if ( uniqueWorkoutDates.includes( date )
      && uniqueBodyLogDates.includes( date ) ) {
      markedDates[ date ] = {
        dots: [ workoutLog, bodyLog ],
      };
    }
    else if ( uniqueWorkoutDates.includes( date )
      && !uniqueBodyLogDates.includes( date ) ) {
      markedDates[ date ] = {
        dots: [ workoutLog ],
      };
    }
    else if ( !uniqueWorkoutDates.includes( date )
      && uniqueBodyLogDates.includes( date ) ) {
      markedDates[ date ] = {
        dots: [ bodyLog ],
      };
    }
  } );

  return markedDates;
};

export const getExercisesBySelectedLogDay = createSelector(
  state => getLogs( state ),
  logs => logs.exercises,
);

export const getBodyLogsBySelectedLogDay = createSelector(
  state => getLogs( state ),
  logs => logs.bodyLogs,
);

export const getLogChanges = createSelector(
  state => getLogs( state ),
  logs => logs.changedExercises || logs.changedBodyLogs,
);
