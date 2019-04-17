import { createSelector } from "reselect";



export const getLogsReducer = state => state.logs;

export const getBodyMeasurements = state => state.logs.bodyMeasurements;

export const getBodyLogChanges = state => state.logs.bodyLogChanges;

export const getChangedExercises = createSelector(
  state => state.logs,
  ( state ) => {
    const { changedExercises, selectedExercises } = state;

    const changedItem = selectedExercises.filter( ( exercise, index ) => {
      if ( changedExercises.includes( parseInt( index ) ) ) {
        return exercise;
      }
    } );

    return changedItem;
  }
);

export const getFormattedExercises = state => state.logs.formattedExercises;

export const getFormattedBodyLog = state => state.logs.formattedBodyLog;

export const getMarkedDates = state => state.logs.markedDates;

export const getSavedBodyLogs = state => state.logs.savedBodyLogs;

export const getSaveFormattedBodyLogs = createSelector(
  state => state.logs.formattedBodyLog,
  bodyLog => {

    const saveFormat = {};

    bodyLog.forEach(logItem => {
      let title = logItem.title.toLowerCase();

      if ( logItem.value ) {
        saveFormat[title] = {
          value: logItem.value,
          measurement: logItem.measurement
        };
      }
    });

    return saveFormat;
  }
);

export const getSelectedLogDay = state => state.logs.selectedDay;

export const getLogOverwriteUid = state => state.logs.overwriteUid;
