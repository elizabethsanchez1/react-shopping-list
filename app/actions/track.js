import {
  MODIFY_SETS,
  TRACK_SELECTED_PROGRAM,
  TRACK_SELECTED_WORKOUT,
  TRACK_SELECTED_PROGRAM_DAY,
  TRACK_EDIT_FIELD,
  TRACK_ADD_EXERCISE_INDEX, TRACK_ADD_EXERCISES, TRACK_REMOVE_EXERCISE, TRACK_SAVE_EXERCISES,
} from '../constants/track';

export const modifySetsAction = data => ( {
  type: MODIFY_SETS,
  payload: data,
} );

export const trackAddExercisesAction = data => ( {
  type: TRACK_ADD_EXERCISES,
  payload: data,
} );

export const trackAddExerciseIndexAction = data => ( {
  type: TRACK_ADD_EXERCISE_INDEX,
  payload: data,
} );

export const trackEditFieldAction = data => ( {
  type: TRACK_EDIT_FIELD,
  payload: data,
} );

export const trackRemoveExerciseAction = data => ( {
  type: TRACK_REMOVE_EXERCISE,
  payload: data,
} );

export const trackSaveExercisesAction = data => ( {
  type: TRACK_SAVE_EXERCISES,
  payload: data,
} );

export const trackSelectedDayAction = data => ( {
  type: TRACK_SELECTED_PROGRAM_DAY,
  payload: data,
} );

export const trackSelectedProgramAction = data => ( {
  type: TRACK_SELECTED_PROGRAM,
  payload: data,
} );

export const trackSelectedWorkoutAction = data => ( {
  type: TRACK_SELECTED_WORKOUT,
  payload: data,
} );
