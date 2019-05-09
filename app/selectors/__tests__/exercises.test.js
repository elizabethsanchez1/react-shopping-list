import { getExercises, getSelectedMuscleGroup } from '../exercises';

const state = {
  exercisesNEW: {
    selectedMuscleGroup: 'Abs',
  },
};

describe( 'exercises selectors', () => {

  it( 'getExercises() should return exercises reducer', () => {
    expect( getExercises( state ) ).toEqual( state.exercisesNEW );
  } );

  it( 'getSelectedMuscleGroup() should return selected muscle group', () => {
    expect( getSelectedMuscleGroup( state ) )
      .toEqual( state.exercisesNEW.selectedMuscleGroup );
  } );

} );
