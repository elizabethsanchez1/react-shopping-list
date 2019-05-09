import { createSelector } from 'reselect';


export const getExercises = state => state.exercisesNEW;

export const getSelectedMuscleGroup = createSelector(
  state => getExercises( state ),
  reducer => reducer.selectedMuscleGroup,
);
