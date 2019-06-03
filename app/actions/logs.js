import { LOG_SELECTED_DAY, UPDATE_BODY_LOG, LOG_UPDATE_WORKOUT } from '../constants/logs';

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

export const updateBodyLogAction = change => {
  return {
    type: UPDATE_BODY_LOG,
    payload: change,
  };
};
