import { createSelector } from 'reselect';
import { getCompletedExercises } from './completedExercises';
import { getBodyLogs } from './bodyLogs';
import theme from '../styles/theme.style';
import dateHelpers from '../utilities/dateHelpers';


export const getLogsReducer = state => state.logs;

export const getBodyMeasurements = state => state.logs.bodyMeasurements;

export const getBodyLogChanges = state => state.logs.bodyLogChanges;

export const getChangedExercises = createSelector(
  state => state.logs,
  state => {
    const { changedExercises, selectedExercises } = state;

    const changedItem = selectedExercises.filter( ( exercise, index ) => {
      if ( changedExercises.includes( parseInt( index ) ) ) {
        return exercise;
      }
    } );

    return changedItem;
  },
);

export const getFormattedExercises = state => state.logs.formattedExercises;

export const getFormattedBodyLog = state => state.logs.formattedBodyLog;

// export const getMarkedDates = state => state.logs.markedDates;

export const getSavedBodyLogs = state => state.logs.savedBodyLogs;

export const getSaveFormattedBodyLogs = createSelector(
  state => state.logs.formattedBodyLog,
  bodyLog => {

    const saveFormat = {};

    bodyLog.forEach( logItem => {
      const title = logItem.title.toLowerCase();

      if ( logItem.value ) {
        saveFormat[ title ] = {
          value: logItem.value,
          measurement: logItem.measurement,
        };
      }
    } );

    return saveFormat;
  },
);

export const getSelectedLogDay = state => state.logs.selectedDay;

export const getLogOverwriteUid = state => state.logs.overwriteUid;


// V2 migration

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
