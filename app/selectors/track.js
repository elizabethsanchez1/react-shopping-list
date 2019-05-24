import { createSelector } from 'reselect';
import moment from 'moment';
import { getCompletedExercises, getCompletedExercisesByAttempt, getDaysCompletedByAttempt } from './completedExercises';
import { getPrograms } from './savedWorkouts';

export const getAttemptInfo = state => state.track.attemptInfo;

export const getBuildHistoryFlag = createSelector(
  state => state.track,
  (state) => {
    // debugger;
    // const { completedExercises, selectedData } = state;
    // const name = selectedData.name;
    // let flag = false;
    //
    // completedExercises.forEach(item => {
    //   if (item.program === name) {
    //     flag = true;
    //   }
    // });
    //
    // return flag;

    return true;
  }
);

// export const getCompletedExercises = state => state.track.completedExercises;


export const getAvailableExerciseList = createSelector(
  state => state.track.completedExercises,
  exercises => {
     // return a order list of exercises with no duplicates
    const uniqueExercises = [...new Set(exercises.map(exercise => exercise.exercise).sort())];
    const formattedExercises = uniqueExercises.map(exercise => {
      return { value: exercise };
    });
    return formattedExercises;
  }
);


export const getExerciseHistory = state => state.track.exerciseHistory;

export const getExerciseIndexLocation = state => state.track.addExerciseIndexLocation;

export const getProgramPercentages = createSelector(
  state => state.program.savedPrograms,
  state => state.track.completedExercises,
  (programs, completedExercises) => {

    const completedPercentages = {};
    programs.forEach(program => {
      let totalDays = 0;
      Object.keys(program.program).forEach(key => {
        program.program[key].forEach(day => {
          totalDays += day.exercises.length;
        });
      });

      const completed = completedExercises.filter(exercise => exercise.belongsTo === program.activeAttempt).length;

      const percentage = Math.round((completed / totalDays) * 100);

      completedPercentages[program.name] = percentage;
    });


    return completedPercentages;
  }
);


export const getTrackDayName = createSelector(
  state => state.track,
  (state) => {
    const { selectedWeek, selectedDay, selectedData, type } = state;

    if (type === 'program') {
      return selectedData.program[selectedWeek][selectedDay].day;
    }

    if (type === 'workout') {
      return selectedData.workout.week1[0].day;
    }
  }
);

export const getTrackRedirect = state => state.track.redirectToSummary;

export const getProgram = state => state.track.selectedData.program;

export const getSelectedData = state => state.track.selectedData;

export const getTrackableExerciseSets = state => state.track.trackableExerciseSets;

export const getTracksSelectedWeek = state => state.track.selectedWeek;

export const getTracksSelectedDay = state => state.track.selectedDay;

// export const getWeeksFromProgram = state => state.track.completedWeeks;

export const getTrackExercises = createSelector(
  state => state.track,
  (trackState) => {
    const { selectedData, selectedDay, selectedWeek, type } = trackState;

    if (type === 'program') {
      return selectedData.program[selectedWeek][selectedDay].exercises;
    }
    else if (type === 'workout') {
      return selectedData.workout.week1[0].exercises;
    }
  }
);

export const getTrackedExercises = state => state.track.trackedExercises;

export const getTrackerSetupLoadingState = state => state.track.trackerSetupLoading;


// V2 UNIT TESTED SELECTORS

export const getActiveAttempt = createSelector(
  state => getTrackObject( state ),
  trackObject => trackObject.activeAttempt,
);

export const getCompletedPercentages = createSelector(
  state => getCompletedExercises( state ),
  state => getPrograms( state ),
  ( exercises, programs ) => {

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

// export const getTrackExercisesByDay = createSelector(
//   state => getTrackObject( state ),
//   state => getTrackType( state ),
//   state => getTrackSelectedInfo( state ),
//   ( trackObject, type, selected ) => {
//     if ( type === 'program' ) {
//       const { week, day } = selected;
//
//       return trackObject.program[ week ][ day ].exercises;
//     }
//
//     if ( type === 'workout' ) {
//       return trackObject.workout.exercises;
//     }
//
//     return [];
//   }
// );

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

export const getTrackSelectedInfo = createSelector(
  state => getTrack( state ),
  reducer => reducer.selected,
);

export const getTrackSets = createSelector(
  state => getTrack( state ),
  reducer => reducer.sets,
);

export const getTrackType = createSelector(
  state => getTrack( state ),
  reducer => reducer.type,
);

// TODO FIX THIS - TECHNICAL DEBT
// Currently not accounting for multiple attempts
export const getStartedTrackingByProgram = createSelector(
  state => getTrackObject( state ),
  trackObject => trackObject.attempts[ 0 ].startedTracking.seconds,
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
