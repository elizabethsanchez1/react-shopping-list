import {
  LISTEN_FOR_BODY_LOGS,
  RECIEVED_BODY_LOGS,
} from '../constants/bodyLogs';


export const listenForBodyLogsAction = data => ( {
  type: LISTEN_FOR_BODY_LOGS,
  payload: data,
} );

export const recievedBodyLogsAction = data => ( {
  type: RECIEVED_BODY_LOGS,
  payload: data,
} );