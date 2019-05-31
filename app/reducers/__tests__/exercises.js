import exercises from '../exercises';
import { listenForExerciseListAction } from '../../actions/exerciseList';
import {
  addCustomExerciseSuccessAction,
  buildingAddExercisesAction,
  filterExerciseListAction,
  selectExerciseAction,
  selectMuscleGroupAction,
  setUpExerciseListAction,
} from '../../actions/exercises';
import exerciseList from '../exerciseList';

describe( 'exercises reducer unit tests', () => {

  it( 'should return initial state', () => {
    expect( exercises( {}, {} ) ).toEqual( {} );
  } );

  it( 'selectMusclegroupAction()  should store selected muscle group in response to SELECT_MUSCLE_GROUP event', () => {

    const action = selectMuscleGroupAction( 'Abs' );
    const expectedState = {
      selectedMuscleGroup: 'Abs',
    };

    expect( exercises( {}, action ) ).toEqual( expectedState );
  } );

  it( 'selectExerciseAction() should store selected exercise', () => {
    const action = selectExerciseAction( {
      'compound': false,
      'name': 'Situps',
      'muscleGroup': 'Abs',
      'isolation': true,
      'selected': false,
    } );

    const previousState = {
      'selectedExercises': [],
      'exerciseList': {
        'Abs': [
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
        'Quads': [
          {
            'compound': true,
            'name': 'Barbell Lunge',
            'muscleGroup': 'Quads',
            'isolation': false,
            'selected': false,
          },
        ],
      },
      'selectedMuscleGroup': 'Abs',
    };

    const expectedState = {
      selectedExercises: [ {
        'compound': false,
        'name': 'Situps',
        'muscleGroup': 'Abs',
        'isolation': true,
        'selected': false,
      } ],
      selectedMuscleGroup: 'Abs',
      exerciseList: {
        'Abs': [
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': true,
          },
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
        'Quads': [
          {
            'compound': true,
            'name': 'Barbell Lunge',
            'muscleGroup': 'Quads',
            'isolation': false,
            'selected': false,
          },
        ],
      },
    };

    expect( exercises( previousState, action ) ).toEqual( expectedState );

    const previousState2 = {
      selectedExercises: [ {
        'compound': false,
        'name': 'Situps',
        'muscleGroup': 'Abs',
        'isolation': true,
        'selected': false,
      } ],
      selectedMuscleGroup: 'Abs',
      exerciseList: {
        'Abs': [
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': true,
          },
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
        'Quads': [
          {
            'compound': true,
            'name': 'Barbell Lunge',
            'muscleGroup': 'Quads',
            'isolation': false,
            'selected': false,
          },
        ],
      },
    };
    const expectedState2 = {
      selectedExercises: [],
      selectedMuscleGroup: 'Abs',
      exerciseList: {
        'Abs': [
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
        'Quads': [
          {
            'compound': true,
            'name': 'Barbell Lunge',
            'muscleGroup': 'Quads',
            'isolation': false,
            'selected': false,
          },
        ],
      },
    };

    expect( exercises( previousState2, action ) ).toEqual( expectedState2 );

  } );

  it( 'setUpExerciseListAction() should store the cloned copy of the exerciseList into the reducer', () => {
    const data = { 'Abs': [ 1 ] };
    const action = setUpExerciseListAction( data );
    const expectedState = {
      selectedExercises: [],
      exerciseList: { 'Abs': [ 1 ] },
    };

    expect( exercises( {}, action ) ).toEqual( expectedState );
  } );


  it( 'setUpExerciseListAction() should store the cloned copy of the exerciseList into the reducer', () => {
    const data = { 'Abs': [ 1 ] };
    const action = setUpExerciseListAction( data );
    const expectedState = {
      selectedExercises: [],
      exerciseList: { 'Abs': [ 1 ] },
    };

    expect( exercises( {}, action ) ).toEqual( expectedState );
  } );

  it( 'should handle storing the custom exercise and adding it to the selectedExercises list in response ADD_CUSTOM_EXERCISE_SUCCESS event', () => {
    const data = {
      compound: true,
      isolation: false,
      name: 'test',
      muscleGroup: 'Abs',
    };
    const action = addCustomExerciseSuccessAction( data );
    const previousState = {
      exerciseList: {
        Abs: [
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
      },
      selectedExercises: [],
    };
    const expectedState = {
      exerciseList: {
        Abs: [
          {
            'compound': false,
            'name': 'Machine Crunch',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
          {
            'compound': false,
            'name': 'Situps',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
          {
            compound: true,
            isolation: false,
            name: 'test',
            muscleGroup: 'Abs',
            selected: true,
          },
        ],
      },
      selectedExercises: [
        {
          compound: true,
          isolation: false,
          name: 'test',
          muscleGroup: 'Abs',
          selected: true,
        },
      ],
    };

    expect( exercises( previousState, action ) ).toEqual( expectedState );
  } );

} );
