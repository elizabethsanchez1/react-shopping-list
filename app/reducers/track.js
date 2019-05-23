import { TRACK_SELECTED_PROGRAM_DAY, TRACK_SELECTED_PROGRAM, TRACK_SELECTED_WORKOUT } from '../constants/track';

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

const track = ( state = {}, action ) => {
  switch ( action.type ) {

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
      };
    }

    default:
      return state;
  }
};

export default track;
