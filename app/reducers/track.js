import {
  TRACK_SELECTED_PROGRAM_DAY,
  TRACK_SELECTED_PROGRAM,
  TRACK_SELECTED_WORKOUT,
  TRACK_EDIT_FIELD, MODIFY_SETS, TRACK_ADD_EXERCISE_INDEX, TRACK_ADD_EXERCISES, TRACK_REMOVE_EXERCISE
} from '../constants/track';

const createSets = exercises => {
  return exercises.map( exercise => {
    const sets = parseInt( exercise.sets, 10 ) || 3;
    const eachSet = [];

    for ( let i = 0; i < sets; i += 1 ) {
      eachSet.push( {
        set: i + 1,
        previous: '',
        weight: '',
        reps: '',
      } );
    }

    return eachSet;
  } );
};

const editSets = ( state, action ) => {
  const { sets } = state;
  const { field, index, set, value } = action.payload;

  const updatedSets = JSON.parse( JSON.stringify( sets ) );
  updatedSets[ index ][ set - 1 ][ field ] = value;

  return {
    ...state,
    sets: updatedSets,
  };
};

const modifySets = ( state, action ) => {
  const { index, option } = action.payload;
  const { sets } = state;
  const updatedSets = JSON.parse( JSON.stringify( sets ) );

  if ( option === 'remove' ) {
    updatedSets[ index ].pop();
  }

  if ( option === 'add' ) {
    const set = updatedSets[ index ].length + 1;
    updatedSets[ index ].push( {
      set,
      previous: '',
      weight: '',
      reps: '',
    } );
  }

  return {
    ...state,
    sets: updatedSets,
  };
};

const addExercises = ( state, action ) => {
  const exercises = action.payload;
  const newSets = createSets( exercises );
  const { sets, selected } = state;

  const updatedSets = [ ...sets ];
  updatedSets.splice(
    selected.exercise + 1,
    0,
    ...newSets,
  );

  const newExercises = exercises.map( exercise => {
    const name = ( exercise.exercise ) ? exercise.exercise : exercise.name;

    return {
      exercise: name,
      weight: '',
      sets: '3',
      reps: '',
      compound: exercise.compound,
      isolation: exercise.isolation,
      muscleGroup: exercise.muscleGroup,
    };
  } );

  const updatedExercises = [ ...state.exercises ];
  updatedExercises.splice(
    selected.exercise + 1,
    0,
    ...newExercises,
  );

  return {
    ...state,
    exercises: updatedExercises,
    sets: updatedSets,
  };
};

const removeExercise = ( state, action ) => {
  const { exercises, sets } = state;

  const updatedExercises = [ ...exercises ];
  updatedExercises.splice( action.payload, 1 );

  const updatedSets = [ ...sets ];
  updatedSets.splice( action.payload, 1 );

  return {
    ...state,
    exercises: updatedExercises,
    sets: updatedSets,
  };
};

const track = ( state = {}, action ) => {
  switch ( action.type ) {

    case MODIFY_SETS:
      return modifySets( state, action );

    case TRACK_ADD_EXERCISES:
      return addExercises( state, action );

    case TRACK_ADD_EXERCISE_INDEX:
      return {
        ...state,
        selected: {
          ...state.selected,
          ...action.payload,
        },
      };

    case TRACK_EDIT_FIELD:
      return editSets( state, action );

    case TRACK_REMOVE_EXERCISE:
      return removeExercise( state, action );

    case TRACK_SELECTED_PROGRAM:
      return {
        type: 'program',
        trackObject: action.payload,
      };

    case TRACK_SELECTED_WORKOUT:
      return {
        type: 'workout',
        trackObject: action.payload,
        sets: createSets( action.payload.workout.exercises ),
        exercises: [ ...action.payload.workout.exercises ],
      };

    case TRACK_SELECTED_PROGRAM_DAY: {
      const { week, dayIndex } = action.payload;
      return {
        ...state,
        selected: {
          week,
          day: dayIndex,
        },
        sets: createSets( state.trackObject.program[ week ][ dayIndex ].exercises ),
        exercises: [ ...state.trackObject.program[ week ][ dayIndex ].exercises ],
      };
    }

    default:
      return state;
  }
};

export default track;
