import { RECIEVED_BODY_LOGS } from '../constants/bodyLogs';
import dateHelpers from '../utilities/dateHelpers';

export const handleLogs = ( state, action ) => {

  return action.payload
    .map( log => {
      return {
        ...log,
        trackedOn: {
          ...log.trackedOn,
          formatted: dateHelpers.formatUnix( log.trackedOn.seconds ),
        },
      };
    } );
};

const bodyLogsReducer = ( state = [], action ) => {
  switch ( action.type ) {

    case RECIEVED_BODY_LOGS:
      return handleLogs( state, action );

    default: return state;
  }
};

export default bodyLogsReducer;
