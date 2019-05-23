import { TRACK_SELECTED_PROGRAM, TRACK_SELECTED_WORKOUT } from '../constants/track';

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
      };

    default:
      return state;
  }
};

export default track;
