import { createSelector } from 'reselect';
import moment from 'moment';
import { getCompletedExercises, getCompletedExercisesByAttempt, getDaysCompletedByAttempt } from './completedExercises';
import { getPrograms } from './savedWorkouts';
import MathService from '../utilities/mathFunctions';
import { completedExercises as complete } from './mockData/exampleData';


export const calculateActiveAttempt = createSelector(
  state => getTrackObject( state ),
  state => getActiveAttempt( state ),
  state => getTrackType( state ),
  ( trackObject, activeAttempt, type ) => {

    let attemptString = '';

    if ( type === 'program' ) {
      attemptString = trackObject.name
        .split( ' ' )
        .map( item => item.toLowerCase() )
        .join( '_' );

      if ( activeAttempt !== '' ) {
        attemptString = activeAttempt;
      }
      else {
        attemptString = `${ attemptString }_attempt_1`;
      }
    }

    return attemptString;
  },
);

export const getActiveAttempt = createSelector(
  state => getTrackObject( state ),
  trackObject => trackObject.activeAttempt,
);

export const getCompletedPercentages = createSelector(
  state => state,
  state => getPrograms( state ),
  ( state, programs ) => {
    const exercises = getCompletedExercises( state );

    if ( programs.length > 0 ) {
      const percentages = {};

      programs.forEach( program => {
        let totalDays = 0;
        Object.keys( program.program ).forEach( week => {
          program.program[ week ].forEach( day => {
            totalDays += day.exercises.length;
          } );
        } );

        const completed = exercises.filter( exercise => {
          return exercise.belongsTo === program.activeAttempt;
        } ).length;

        percentages[ program.name ] = Math.round( ( completed / totalDays ) * 100 );
      } );

      return percentages;
    }

    return {};
  },
);

export const getDaysForEachWeek = state => {
  const attempt = getActiveAttempt( state );
  const completedExercises = getCompletedExercisesByAttempt( state, attempt );
  const trackObject = getTrackObject( state );
  const { program } = trackObject;

  // ordered array of all weeks in program
  const weeks = Object.keys( program ).sort( ( a, b ) => {
    return parseInt( a.substring( 4 ), 10 ) - parseInt( b.substring( 4 ), 10 );
  } );

  // completed exercises keyed by week object
  const completedDaysByWeeks = {};
  weeks.forEach( week => { completedDaysByWeeks[ week ] = {} } );

  completedExercises.forEach( exercise => {
    const { week, dayName } = exercise;

    if ( completedDaysByWeeks[ week ][ dayName ] ) {
      completedDaysByWeeks[ week ][ dayName ].push( exercise );
    }
    else {
      completedDaysByWeeks[ week ][ dayName ] = [ exercise ];
    }
  } );

  // program planned days keyed by week object
  const daysByWeek = {};
  weeks.forEach( week => {
    daysByWeek[ week ] = program[ week ].map( day => {
      const selectedDay = completedDaysByWeeks[ week ][ day.day ];
      const completed = !!( selectedDay && selectedDay.length > 0 );

      return {
        label: ( completed ) ? `${ day.day }  Completed` : day.day,
        completed,
      };
    } );
  } );

  return daysByWeek;
};

export const getTrackDocumentId = createSelector(
  state => getTrackObject( state ),
  trackObject => trackObject.documentId,
);

export const getPreviousExercisesByCount = ( state, options ) => {
  const { exercise, count } = options;
  const completedExercises = getCompletedExercises( state );

  return completedExercises.filter( item => item.exercise === exercise )
    .sort( ( a, b ) =>  b.trackedOn.seconds - a.trackedOn.seconds )
    .slice( 0, count + 1 )
    .map( item => {
      return {
        sets: item.trackedReps.length,
        weight: item.weight,
        reps: item.trackedReps.length,
        trackedReps: item.trackedReps,
        trackedWeights: item.trackedWeights,
        estimated1RM: item.estimated1RM,
        estimated3RM: item.estimated3RM,
        estimated5RM: item.estimated5RM,
        estimated8RM: item.estimated8RM,
        estimated10RM: item.estimated10RM,
        trackedOn: moment( moment.unix( item.trackedOn.seconds ) ).format( 'MM/DD/YY' ),
      };
    } )
};

export const getMaxesInfoByExercise = createSelector(
  ( state, options ) => getPreviousExercisesByCount( state, options ),
  recentExercises => {

    if ( recentExercises.length > 1 ) {
      // The fist item is the most recent
      const personalBest1RM = Math.max( ...recentExercises.map( item => {
        return item.estimated1RM;
      } ), 0 );
      const personalBest = recentExercises.find( item => item.estimated1RM === personalBest1RM );

      return {
        allTimeMaxes: {
          estimated1RM: personalBest.estimated1RM,
          estimated3RM: personalBest.estimated3RM,
          estimated5RM: personalBest.estimated5RM,
          estimated8RM: personalBest.estimated8RM,
          estimated10RM: personalBest.estimated10RM,
        },
        allTimeMaxesDate: personalBest.trackedOn,
        latestMaxes: {
          estimated1RM: recentExercises[ 0 ].estimated1RM,
          estimated3RM: recentExercises[ 0 ].estimated3RM,
          estimated5RM: recentExercises[ 0 ].estimated5RM,
          estimated8RM: recentExercises[ 0 ].estimated8RM,
          estimated10RM: recentExercises[ 0 ].estimated10RM,
        },
        latestMaxesDate: recentExercises[ 0 ].trackedOn,
      };
    }

    return {};
  },
) ;


export const getTrack = state => state.track;

export const getTrackDay = createSelector(
  state => getTrackSelectedInfo( state ),
  state => getTrackObject( state ),
  state => getTrackType( state ),
  ( selected, trackObject, type ) => {

    if ( type === 'program' ) {
      const { week, day } = selected;
      return trackObject.program[ week ][ day ].day
    }

    if ( type === 'workout' ) {
      return trackObject.workout.day;
    }

    return '';
  }
);

export const getTrackExercisesByDay = createSelector(
  state => getTrack( state ),
  reducer => reducer.exercises,
);

export const getTrackObject = createSelector(
  state => getTrack( state ),
  reducer => reducer.trackObject,
);

export const getTrackProgramWeeks = createSelector(
  state => markCompletedFlagsByDate( state ),
  programWeeks => programWeeks,
);

export const getEstimatedMaxes = ( exercises ) => {};

export const calculateTrackedExerciseNumbers = createSelector(
  state => getTrackExercisesByDay( state ),
  state => getTrackSets( state ),
  ( exercises, trackedSets ) => {
    return exercises.map( ( exercise, index ) => {
      const name = ( exercise.exercise ) ? exercise.exercise : exercise.name;
      const trackedReps = [];
      const trackedWeights = [];
      const volume = [];

      trackedSets[ index ].forEach( set => {
        let reps = parseInt( ( set.reps !== '' ) ? set.reps : 0, 10 );
        let weight = parseInt( ( set.weight !== '' ) ? set.weight : 0, 10 );

        trackedReps.push( reps );
        trackedWeights.push( weight );
        volume.push( reps * weight );
      } );

      const addUpNumbers = data => data.reduce( ( initalValue, current )  => initalValue + current );

      const totalVolume = addUpNumbers( volume );
      const toalReps = addUpNumbers( trackedReps );

      const temp = {
        ...exercise,
        weight: parseInt( exercise.weight, 10 ),
        exercise: name,
        trackedWeights,
        trackedReps,
        totalVolume,
      };

      delete temp.name;
      delete temp.reps;
      delete temp.sets;

      return temp;
    } );
  }
);

// TODO not unit tested due to mocking date issues
export const calculateTrackedExerciseProgramInfo = createSelector(
  state => getTrackObject( state ),
  state => getTrackType( state ),
  state => getTrackSelectedInfo( state ),
  state => getTrackDay( state ),
  state => calculateActiveAttempt( state ),
  state => calculateTrackedExerciseNumbers( state ),
  ( trackObject, type, selected, day, activeAttempt, exercises ) => {

    return exercises.map( exercise => {

      const temp = {
        ...exercise,
        type,
        userId: trackObject.userId,
        dayName: day,
        trackedOn: new Date(),
        belongsTo: activeAttempt,
      };

      if ( type === 'program' ) {
        temp.name = trackObject.name;
        temp.day = selected.day;
        temp.week = selected.week;
      }

      if ( type === 'workout' ) {
        temp.name = trackObject.workout.day;
      }

      return temp;
    } );
  },
);

// TODO not unit tested due to mocking date issues
export const getTrackSaveInfo = ( state ) => {
  const exercises = calculateTrackedExerciseProgramInfo( state );
  return exercises.map( exercise => {
    const { trackedWeights, trackedReps } = exercise;
    const heaviestWeight = Math.max( ...trackedWeights );
    const heaviestWeightReps = trackedReps[ trackedWeights.indexOf( heaviestWeight ) ];
    const maxObject = MathService.calculateMaxes( heaviestWeight, heaviestWeightReps );

    return {
      ...exercise,
      ...maxObject,
    }
  } );
};

export const getTrackSelectedInfo = createSelector(
  state => getTrack( state ),
  reducer => reducer.selected,
);

export const getTrackSets = createSelector(
  state => getTrack( state ),
  reducer => reducer.sets,
);

export const getTrackSummaryData = createSelector(
  state => calculateTrackedExerciseNumbers( state ),
  state => getTrackSets( state ),
  ( exercises, sets ) => {

    const computedExercises = exercises.map( ( exercise, index ) => {
      const totalReps = sets[ index ].reduce( ( acc, current ) => {
        return acc + parseInt( current.reps, 10 );
      }, 0 );

      return {
        exercise: exercise.exercise,
        sets: sets[ index ],
        totalReps,
        totalVolume: exercise.totalVolume,
      }
    } );

    const initialValue = { repsTotal: 0, volumeTotal: 0 };
    const workoutTotals = computedExercises.reduce( ( acc, current ) => {
      return {
        repsTotal: acc.repsTotal + current.totalReps,
        volumeTotal: acc.volumeTotal + current.totalVolume,
      };
    }, initialValue );

    return {
      exercises: computedExercises,
      workoutRepsTotal: workoutTotals.repsTotal,
      workoutVolumeTotal: workoutTotals.volumeTotal,
    };
  },
);

export const getTrackType = createSelector(
  state => getTrack( state ),
  reducer => reducer.type,
);

// TODO FIX THIS - TECHNICAL DEBT
// Currently not accounting for multiple attempts
export const getStartedTrackingByProgram = createSelector(
  state => getTrackObject( state ),
  trackObject => {

    if ( trackObject.attempts.length > 0 ) {
      return trackObject.attempts[ 0 ].startedTracking.seconds;
    }

    return moment().unix();
  },
);

export const getWeeksFromProgram = trackObject => {
  return Object.keys( trackObject.program ).map( ( week, index ) => {
    const temp = `week${ index + 1 }`;
    const daysPerWeek = trackObject.program[ temp ].length;
    return {
      label: `Week ${ index + 1 }`,
      week: temp,
      daysPerWeek,
    };
  } );
};

export const markCompletedFlagsByDaysCompleted = state => {
  const attempt = getActiveAttempt( state );
  const trackObject = getTrackObject( state );
  const completedDaysByWeek = getDaysCompletedByAttempt( state, attempt );
  const weeks = getWeeksFromProgram( trackObject );

  return weeks.map( object => {
    const { week, daysPerWeek } = object;

    if ( daysPerWeek === completedDaysByWeek[ week ] ) {
      return {
        ...object,
        completed: true,
      };
    }

    return {
      ...object,
      completed: false,
    };
  } );
};

export const markCompletedFlagsByDate = state => {
  const startedTrackingSeconds = getStartedTrackingByProgram( state );
  const trackObject = getTrackObject( state );
  const weeks = getWeeksFromProgram( trackObject );
  const today = moment().format();
  const startedTracking = moment( moment.unix( startedTrackingSeconds ) ).format();

  return weeks.map( ( week, index ) => {
    const endMultiplier = 7 * ( parseInt( index, 10 ) + 1 );
    const beginMultiplier = ( 7 * parseInt( index, 10 ) );

    const endDate = moment( startedTracking )
      .startOf( 'day' )
      .add( endMultiplier, 'days' )
      .format();

    const startDate = moment( startedTracking )
      .startOf( 'day' )
      .add( beginMultiplier, 'days' )
      .format();

    let label;
    const completed = moment( endDate ).isBefore( today );

    if ( moment( today ).isBetween( startDate, endDate ) ) {
      label = `Week ${ index + 1 } --- Current Week`;
    }
    else if ( completed ) {
      label = `Week ${ index + 1 } Completed`;
    }
    else {
      label = `Week ${ index + 1 }`;
    }

    return {
      label,
      week: `week${ index + 1 }`,
      completed: moment( endDate ).isBefore( today ),
      currentWeek: moment( today ).isBetween( startDate, endDate ),
    };
  } );
};
