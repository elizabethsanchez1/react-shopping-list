import { RECEIVED_SAVED_WORKOUTS } from '../constants/savedWorkouts';
import dateHelpers from '../utilities/dateHelpers';


export const handleStoringWorkouts = ( state, action ) => {
  const programs = [];
  const workouts = [];

  action.payload.savedWorkouts.forEach( item => {

    const created = {
      ...item.created,
      formatted: dateHelpers.formatUnix( item.created.seconds ),
    };

    const updatedItem = {
      ...item,
      created,
    };

    if ( item.type === 'program' ) {
      programs.push( updatedItem );
    }

    if ( item.type === 'workout' ) {
      workouts.push( updatedItem );
    }
  } );

  return {
    programs,
    workouts,
  };
};

const savedWorkouts = ( state = {}, action ) => {
  switch ( action.type ) {

    case RECEIVED_SAVED_WORKOUTS:
      return handleStoringWorkouts( state, action );

    default: return state;
  }
};

export default savedWorkouts;
