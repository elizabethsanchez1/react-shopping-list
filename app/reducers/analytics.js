import {
  CALCULATE_DATE_RANGES, FILTER_BODY_MEASUREMENTS,
  FILTER_EXERCISES,
  GET_AVAILABLE_EXERCISES,
  SELECTED_SCOPE
} from "../constants/analytics";
import moment from 'moment'


const initialState = {
  filteredResult: [],
  selectedScope: '',
};


export const calculateRanges = ( state, action ) => {
  const { completedExercises } = action.payload;

  if ( completedExercises.length > 0 ) {
    const clonedExercises = JSON.parse( JSON.stringify( completedExercises ) );

    clonedExercises.sort( ( a, b ) => {
      return new Date( a.trackedOn ) - new Date( b.trackedOn );
    } );

    console.log( 'cloned exercises: ', clonedExercises );
    const latestDate = moment( clonedExercises[0].trackedOn );
    console.log( 'latest date: ', latestDate );

    const today = new Date();
    let dateRanges = [];
    for ( let i = 0; i < 12; i++ ) {

      let oneMonthAgo = moment( today ).subtract( (i + 1), 'M' );
      let isBefore = moment( oneMonthAgo ).isBefore( latestDate );

      if ( !isBefore ) {
        dateRanges.push( {
          value: moment( oneMonthAgo ).format( 'MM/DD/YYYY' ),
        } );
      }

      if ( isBefore ) {
        dateRanges.push( {
          value: moment( oneMonthAgo ).format( 'MM/DD/YYYY' ),
        } );

        break;
      }
    }


    return {
      ...state,
      dateRanges,
    }
  }


  return {
    ...state,
    dateRanges: [],
  };
};

export const _chartFormatConversion = ( exercisesGroupedByWeek, metric ) => {
  const clonedExercises = { ...exercisesGroupedByWeek };
  let exercises = { ...clonedExercises };

  const reversedKeys = Object.keys( clonedExercises ).reverse();

  for ( let i = 0; i < Object.keys( clonedExercises ).length; i += 1 ) {
    let weekString = reversedKeys[i];
    let currentWeek = clonedExercises[weekString];

    if ( currentWeek.exercises.length === 0 ) {
      delete exercises[weekString];
    }
    else if ( currentWeek.exercises.length > 0 ) {
      break;
    }
  }


  const chartData = [];

  if ( metric.toLowerCase() === 'volume' ) {
    Object.keys( exercises ).forEach( ( week, index ) => {
      let weeklyData = 0;

      exercises[week].exercises.forEach( exercise => {

        console.log( 'what is weekly data: ', week, weeklyData );
        weeklyData += exercise.totalVolume;
      } );

      chartData.push( {
        weeklyData,
        week: index + 1,
      } );

    } );

    return chartData;
  }


  if ( metric.toLowerCase() === '1 rep max' ) {
    Object.keys( exercises ).forEach( ( week, index ) => {
      let maxes = [];
      let largestMax;

      if ( exercises[week].exercises.length > 0 ) {
        exercises[week].exercises.forEach( exercise => maxes.push( exercise.estimated1RM ) );
        largestMax = Math.max( ...maxes );
      }
      else {
        largestMax = 0;
      }

      chartData.push( {
        weeklyData: largestMax,
        week: index + 1,
      } );
    } );

    return chartData;
  }
};


export const _filterExercises = ( program, selectedExercise, allExercises ) => {

  if ( typeof program === 'string' && selectedExercise.toLowerCase() === 'all exercises' ) {
    return allExercises;
  }

  if ( typeof program === 'string' && selectedExercise.toLowerCase() !== 'all exercises' ) {

    return allExercises.filter( exercise => {
      if ( exercise.exercise === selectedExercise ) {
        return exercise;
      }
    } );
  }

  if ( typeof program === 'object' && selectedExercise.toLowerCase() === 'all exercises' ) {

    return allExercises.filter( exercise => {
      if ( exercise.belongsTo === program.activeAttempt ) {
        return exercise;
      }
    } );
  }

  if ( typeof program === 'object' && selectedExercise.toLowerCase() !== 'all exercises' ) {
    return allExercises.filter( exercise => {
      if ( exercise.exercise === selectedExercise && exercise.belongsTo === program.activeAttempt ) {
        return exercise;
      }
    } )
  }

};

export const filter = ( state, action ) => {
  const { program, metric, selectedExercise, completedExercises } = action.payload;

  let programWeeksTotal;
  let exercisesGroupedByWeeks = {};
  const filteredExercises = _filterExercises( program, selectedExercise, completedExercises );

  // sort exercises by week they belong to
  if ( typeof program === 'object' ) {
    programWeeksTotal = Object.keys( program.program ).sort( ( a, b ) => {
      return parseInt( a.substring( 4 ) ) - parseInt( b.substring( 4 ) );
    } );

    programWeeksTotal.forEach( week => {

      const weeklyExercsises = [];
      filteredExercises.forEach( exercise => {
        if ( exercise.week === week ) {
          weeklyExercsises.push( exercise );
        }
      } );

      exercisesGroupedByWeeks[week] = { exercises: weeklyExercsises };
    } );
  }


  console.log( 'filtered exercises: ', filteredExercises );
  console.log( 'weeks: ', programWeeksTotal );
  console.log( 'total weeks object: ', exercisesGroupedByWeeks );

  const filteredResult = _chartFormatConversion( exercisesGroupedByWeeks, metric, selectedExercise );

  console.log( 'what is in filtered Result: ', filteredResult );

  return {
    ...state,
    // filteredProgram: exercisesGroupedByWeeks,
    filteredResult,
  }
};

export const filterBodyMeasurements = ( state, action ) => {
  const { bodyMeasurements, bodyLogs } = action.payload;

  console.log('Body measurements: ', bodyMeasurements);


  const logData = [ ...bodyLogs ];
  logData.sort( (a, b) => {
    return new Date( a.trackedOn ) - new Date( b.trackedOn );
  } );

  console.log('sorted by data log data: ', logData);

  const chartData = [];
  let counter = 0;
  logData.forEach( ( log, index ) => {
    if ( log.weight !== ''  || log.weight !== undefined ) {
      chartData.push( { weeklyData: parseFloat( log.weight.value ), week: index + 1 } )
    }
  })

  console.log('chart data: ', chartData);


  return {
    ...state,
    filteredResult: chartData,
  }
};


export const filterAvailableExercises = ( state, action ) => {
  return {
    ...state,
  }
};


export default function analytics( state = {}, action ) {
  switch ( action.type ) {

    case CALCULATE_DATE_RANGES:
      return calculateRanges( state, action );

    case GET_AVAILABLE_EXERCISES:
      return filterAvailableExercises( state, action );

    case FILTER_BODY_MEASUREMENTS:
      return filterBodyMeasurements( state, action );


    case FILTER_EXERCISES:
      return filter( state, action );

    case SELECTED_SCOPE:
      return {
        ...state,
        scope: action.payload.scope,
      };

    default:
      return state;
  }
};
