import { createSelector } from 'reselect';
import { getSelectedMuscleGroup } from './exercises';


export const getExerciseList = state => state.exerciseList;

export const getExercisesByMuscleGroup = createSelector(
  state => getExerciseList( state ),
  state => getSelectedMuscleGroup( state ),
  ( list, muscleGroup ) => list[ muscleGroup ],
);
