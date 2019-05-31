import { LOG_SELECTED_DAY, UPDATE_BODY_LOG, UPDATE_WORKOUT_LOG } from '../constants/logs';

export const logSelectDayAction = ( dateObject, completedExercises ) => {
  return {
    type: LOG_SELECTED_DAY,
    payload: { dateObject, completedExercises },
  };
};

export const updateWorkoutLogAction = change => {
  return {
    type: UPDATE_WORKOUT_LOG,
    payload: change,
  };
};

export const updateBodyLogAction = change => {
  return {
    type: UPDATE_BODY_LOG,
    payload: change,
  };
};
