import { LOG_SELECTED_DAY, LOG_UPDATE_BODY_LOG, LOG_UPDATE_WORKOUT } from '../constants/logs';
import dateHelpers from '../utilities/dateHelpers';
import { bodyMeasurements } from '../config/baseExerciseList';

export const formatInitialWorkoutLogs = ( exercises, targetDate ) => {

  const filteredExercises = exercises.filter( exercise => {
    const date = dateHelpers
      .formatUnix( exercise.trackedOn.seconds )
      .split( '/' )
      .map( part => {
        return part.replace( /^0+/, '' );
      } )
      .join( '/' );

    if ( date === targetDate ) {
      return exercise;
    }
  } );


  const createSets = ( trackedReps, trackedWeights ) => {
    const sets = [];

    for ( let i = 0; i < trackedReps.length; i += 1 ) {
      sets.push( {
        set: i + 1,
        reps: `${ trackedReps[ i ] }`,
        weight: `${ trackedWeights[ i ] }`,
      } );
    }

    return sets;
  };

  return filteredExercises.map( exercise => {
    return {
      uid: exercise.uid,
      name: exercise.exercise,
      sets: createSets(
        exercise.trackedReps,
        exercise.trackedWeights,
      ),
    };
  } );

};

export const formatInitialBodyLogs = ( bodyLogs, targetDate ) => {

  // find if a body log was tracked on that day
  const filteredBodyLogs = bodyLogs.filter( log => {
    const date = log.trackedOn.formatted
      .split( '/' )
      .map( part => {
        return part.replace( /^0+/, '' );
      } )
      .join( '/' );

    if ( date === targetDate ) {
      return log;
    }
  } );


  // create base array of measurements from config object
  const formattedBodyMeasurements = bodyMeasurements.map( item => {
    return {
      title: item.title,
      measurement: item.measurement,
      value: '',
    };
  } );

  // fill in the previous tracked values if there is any
  if ( filteredBodyLogs.length > 0 ) {
    const filteredBodyLog = { ...filteredBodyLogs[ 0 ] };
    const { uid } = filteredBodyLog;

    delete filteredBodyLog.uid;
    delete filteredBodyLog.trackedOn;
    delete filteredBodyLog.userId;
    const trackedMeasurements = Object.keys( filteredBodyLog );

    trackedMeasurements.forEach( measurement => {

      formattedBodyMeasurements.forEach( ( item, index ) => {
        const title = item.title.toLowerCase();

        if ( measurement === title ) {
          formattedBodyMeasurements[ index ].uid = uid;
          formattedBodyMeasurements[ index ].value = filteredBodyLog[ title ].value;
        }

      } );

    } );
  }

  return formattedBodyMeasurements;
};


export const formatInitialLogs = ( state, action ) => {
  const { selectedDay, exercises, bodyLogs } = action.payload;


  const formattedExercises = formatInitialWorkoutLogs(
    exercises,
    selectedDay,
  );

  const formattedBodyLogs = formatInitialBodyLogs(
    bodyLogs,
    selectedDay,
  );


  return {
    selectedDay,
    exercises: formattedExercises,
    bodyLogs: formattedBodyLogs,
    changedExercises: false,
    changedBodyLogs: false,
  };
};

export const updateWorkoutLog = ( state, action ) => {
  const { exercises } = state;
  const { exerciseLocation, field, setLocation, value } = action.payload;


  const updatedExercises = JSON.parse( JSON.stringify( exercises ) );

  updatedExercises[ exerciseLocation ].sets[ setLocation - 1 ][ field ] = value;

  return {
    ...state,
    exercises: updatedExercises,
    changedExercises: true,
  };
};

export const updateBodyLog = ( state, action ) => {
  const bodyLogs = state.bodyLogs.map( log => {
    if ( log.title === action.payload.title ) {
      return action.payload;
    }

    return log;
  } );

  return {
    ...state,
    bodyLogs,
    changedBodyLogs: true,
  };
};

export default function logs( state = {}, action ) {
  switch ( action.type ) {
    case LOG_SELECTED_DAY:
      return formatInitialLogs( state, action );

    case LOG_UPDATE_BODY_LOG:
      return updateBodyLog( state, action );

    case LOG_UPDATE_WORKOUT:
      return updateWorkoutLog( state, action );

    default:
      return state;
  }
}
