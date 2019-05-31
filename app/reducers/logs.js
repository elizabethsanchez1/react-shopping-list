import moment from 'moment';
import { LOG_SELECTED_DAY, UPDATE_BODY_LOG, UPDATE_WORKOUT_LOG } from '../constants/logs';
import {
  GET_BODY_LOGS_SUCCESS,
  SAVE_BODY_LOG_FAILED,
  SAVE_BODY_LOG_REQUEST,
  SAVE_BODY_LOG_SUCCESS,
} from '../constants/workoutsApi';

// const initialState = {
//   selectedDay: '',
//   selectedExercises: [],
//   changedExercises: [],
//
//   bodyLogChanges: false,
//   overwriteUid: '',
//   savedBodyLogs: [],
//   markedDates: {},
//   bodyMeasurements,
//   loading: false,
// };


export const _formatWorkoutLogs = exercises => {

  const container = [];

  exercises.forEach( exercise => {
    const workoutObject = {
      name: exercise.exercise,
      sets: [],
    };


    exercise.trackedReps.forEach( ( reps, index ) => {
      workoutObject.sets.push( {
        set: index + 1,
        reps,
        weight: exercise.trackedWeights[ index ],
      } );
    } );

    container.push( workoutObject );
  } );

  return container;
};

export const _formatBodyLog = ( log, bodyMeasurements ) => {
  const baseBodyLogs = [ ...JSON.parse( JSON.stringify( bodyMeasurements ) ) ];

  baseBodyLogs.forEach( typeOfLog => {

    if ( log ) {
      const title = typeOfLog.title.toLowerCase();

      if ( log[ title ] ) {
        typeOfLog.value = log[ title ].value;
        typeOfLog.measurement = log[ title ].measurement;
      }
    }
    else {
      typeOfLog.value = '';
    }
  } );

  return baseBodyLogs;
};

export const calculateLogData = ( state, action ) => {
  const { bodyMeasurements, savedBodyLogs } = state;
  const { dateObject, completedExercises } = action.payload;


  const selectedDateExercises = completedExercises.filter( exercise => {
    const formattedDate = moment( exercise.trackedOn ).format( 'YYYY-MM-DD' );

    if ( formattedDate === dateObject.dateString ) {
      return exercise;
    }
  } );

  const formattedExercises = _formatWorkoutLogs( selectedDateExercises );


  const selectedDateBodyLog = savedBodyLogs.find( log => {
    const formattedDate = moment( log.trackedOn ).format( 'YYYY-MM-DD' );

    if ( formattedDate === dateObject.dateString ) {
      return log;
    }
  } );

  console.log( 'selected body log: ', selectedDateBodyLog );


  const formattedBodyLog = _formatBodyLog( selectedDateBodyLog, bodyMeasurements );

  return {
    ...state,
    selectedDay: moment( dateObject.dateString ).toDate(),
    selectedExercises: selectedDateExercises,
    formattedExercises,
    formattedBodyLog,
    overwriteUid: ( selectedDateBodyLog )
      ? selectedDateBodyLog.uid
      : '',
  };
};

export const updateWorkoutLog = ( state, action ) => {
  const { selectedExercises, changedExercises } = state;
  const { exerciseLocation, field, setLocation, value } = action.payload;

  const mappedField = ( field === 'reps' ) ? 'trackedReps' : 'trackedWeights';
  const updatedValues = [ ...selectedExercises[ exerciseLocation ][ mappedField ] ];

  updatedValues[ setLocation ] = parseInt( value );

  const updatedExercise = {
    ...selectedExercises[ exerciseLocation ],
    [ mappedField ]: updatedValues,
  };

  // replace value in array in an immutable way
  const newExercises = Object.assign( [], selectedExercises, {
    [ exerciseLocation ]: updatedExercise,
  } );

  const changedList = [ ...new Set( [ ...changedExercises, exerciseLocation ] ) ];

  return {
    ...state,
    selectedExercises: newExercises,
    changedExercises: changedList,
  };
};

export const updateBodyLog = ( state, action ) => {
  const { field, measurement, value } = action.payload;

  const formattedBodyLog = state.formattedBodyLog.map( logItem => {
    if ( logItem.title === field ) {
      return {
        ...logItem,
        value,
        measurement,
      };
    } 
    return logItem;
    
  } );

  return {
    ...state,
    formattedBodyLog,
    bodyLogChanges: true,
  };
};

export default function logs( state = {}, action ) {
  switch ( action.type ) {
    case GET_BODY_LOGS_SUCCESS:
      return {
        ...state,
        savedBodyLogs: action.payload,
      };

    case SAVE_BODY_LOG_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SAVE_BODY_LOG_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case SAVE_BODY_LOG_FAILED:
      return {
        ...state,
        loading: false,
      };

    case LOG_SELECTED_DAY:
      return calculateLogData( state, action );

    case UPDATE_BODY_LOG:
      return updateBodyLog( state, action );

    case UPDATE_WORKOUT_LOG:
      return updateWorkoutLog( state, action );

    default:
      return state;
  }
}
