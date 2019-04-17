import { MARK_DATES, SELECTED_CALENDAR_DAY, UPDATE_BODY_LOG, UPDATE_WORKOUT_LOG } from "../constants/logs";


export const markDatesAction = ( completedExercises, savedBodyLogs ) => {
 return {
   type: MARK_DATES,
   payload: { completedExercises, savedBodyLogs },
 }
};

export const selectedDayAction = ( dateObject, completedExercises ) => {
  return {
    type: SELECTED_CALENDAR_DAY,
    payload: { dateObject, completedExercises },
  }
};

export const updateWorkoutLogAction = change => {
  return {
    type: UPDATE_WORKOUT_LOG,
    payload: change,
  }
};

export const updateBodyLogAction = change => {
  return {
    type: UPDATE_BODY_LOG,
    payload: change,
  }
};
