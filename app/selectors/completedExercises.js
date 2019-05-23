

export const getCompletedExercises = state => state.completedExercises;

export const getCompletedExercisesByAttempt = ( state, attempt ) => {
  const exercises = getCompletedExercises( state );
  return exercises.filter( exercise => exercise.belongsTo === attempt );
};

const removeDuplicatesByProperty = ( property, array ) => {
  const uniq = {};
  return array.filter( obj => {
    return !uniq[ obj[ property ] ] && ( uniq[ obj[ property ] ] = true );
  } );
};

export const getDaysCompletedByAttempt = ( state, attempt ) => {
  const exercises = getCompletedExercisesByAttempt( state, attempt );
  const weekObject = {};

  exercises.forEach( exercise => {
    weekObject[ exercise.week ] = {
      dayCompleted: 0,
      days: [],
    };
  } );

  Object.keys( weekObject ).forEach( week => {
    exercises.forEach( exercise => {
      if ( week === exercise.week ) {
        weekObject[ week ].days.push( exercise );
      }
    } );

    weekObject[ week ].daysCompleted = removeDuplicatesByProperty(
      'day',
      weekObject[ week ].days,
    ).length;
  } );

  const filteredDays = {};
  Object.keys( weekObject ).forEach( week => {
    filteredDays[ week ] = weekObject[ week ].daysCompleted;
  } );

  return filteredDays;
};
