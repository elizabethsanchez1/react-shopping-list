import {
  LOG_SELECTED_DAY,
  LOG_UPDATE_BODY_LOG,
  LOG_UPDATE_WORKOUT,
  SAVE_LOGS,
  SAVE_LOGS_FAILED
} from '../constants/logs';

export const logSelectDayAction = data => {
  return {
    type: LOG_SELECTED_DAY,
    payload: data,
  };
};

export const logUpdateWorkoutAction = data => {
  return {
    type: LOG_UPDATE_WORKOUT,
    payload: data,
  };
};

export const logUpdateBodyLogAction = data => {
  return {
    type: LOG_UPDATE_BODY_LOG,
    payload: data,
  };
};

export const saveLogsAction = data => {
  return {
    type: SAVE_LOGS,
    payload: data,
  };
};

export const saveLogsFailedAction = data => {
  return {
    type: SAVE_LOGS_FAILED,
    payload: data,
  };
};
