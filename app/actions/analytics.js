import {
  CALCULATE_DATE_RANGES,
  FILTER_BODY_MEASUREMENTS,
  FILTER_EXERCISES,
  SELECTED_SCOPE
} from "../constants/analytics";


export const filterBodyMeasurementsAction = bodyMeasurements => {
  return {
    type: FILTER_BODY_MEASUREMENTS,
    payload: bodyMeasurements,
  }
};

export const filterExercises = (program, metric, selectedExercise, completedExercises) => {
 return {
   type: FILTER_EXERCISES,
   payload: { program, metric, selectedExercise, completedExercises }
 }
};


export const selectedScope = scope => {
  return {
    type: SELECTED_SCOPE,
    payload: { scope },
  }
};

export const calculateDateRanges = completedExercises => {
  return {
    type: CALCULATE_DATE_RANGES,
    payload: { completedExercises },
  }
};

