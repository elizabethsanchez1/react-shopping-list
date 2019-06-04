import { LOG_SELECTED_DAY, LOG_UPDATE_BODY_LOG, LOG_UPDATE_WORKOUT, SAVE_LOG_UPDATE } from '../constants/logs';

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

export const saveUpdateLogAction = data => {
  return {
    type: SAVE_LOG_UPDATE,
    payload: data,
  };
};
