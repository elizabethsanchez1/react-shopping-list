import {
  TRACK_SELECTED_PROGRAM_DAY,
  TRACK_SELECTED_PROGRAM,
  TRACK_SELECTED_WORKOUT,
  TRACK_EDIT_FIELD, MODIFY_SETS
} from '../constants/track';

const createSets = exercises => {
  return exercises.map( exercise => {
    const sets = parseInt( exercise.sets, 10 );
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

const track = ( state = {}, action ) => {
  switch ( action.type ) {

    case MODIFY_SETS:
      return modifySets( state, action );

    case TRACK_EDIT_FIELD:
      return editSets( state, action );

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
