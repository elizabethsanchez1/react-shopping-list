import { getExerciseList, getExercisesByMuscleGroup } from '../exerciseList';

const state = {
  exercisesNEW: {
    selectedMuscleGroup: 'Abs',
  },
  exerciseList: {
    Abs: [ 1 ],
  },
};

describe( 'ExerciseList selectors', () => {

  it( 'getExerciseList() should return the exercise list retrieved from the server', () => {
    expect( getExerciseList( state ) ).toEqual( state.exerciseList );
  } );

  it( 'getExerciseByMuscleGroup() should return array of exercises only for the selected muscle group', () => {
    expect( getExercisesByMuscleGroup( state ) ).toEqual( state.exerciseList.Abs );
  } );

} );
