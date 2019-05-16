import exerciseList, { sortAlphabetically } from '../exerciseList';
import { receivedCustomExercisesAction, receivedExerciseListAction } from '../../actions/exerciseList';
import { addCustomExerciseSuccessAction } from '../../actions/exercises';

describe( 'exercise list reducer', () => {

  it( 'should return initial state', () => {
    expect( exerciseList( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle storing exercise in response to RECEIVED_EXERCISE_LIST event', () => {
    const data = {
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
          {
            'compound': false,
            'name': 'Hanging Leg Raises',
            'muscleGroup': 'Abs',
            'isolation': true,
            'selected': false,
          },
        ],
      },
    };

    const expectedState = {
      Abs: [
        {
          'compound': false,
          'name': 'Hanging Leg Raises',
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
        {
          'compound': false,
          'name': 'Situps',
          'muscleGroup': 'Abs',
          'isolation': true,
          'selected': false,
        },
      ],
    };

    const action = receivedExerciseListAction( data );
    expect( exerciseList( {}, action ) ).toEqual( expectedState );
  } );

  it( 'should handle storing the custom exercise that the user just successfully added in response to ADD_CUSTOM_EXERCISE_SUCCESS event', () => {
    const data = {
      compound: true,
      isolation: false,
      name: 'test',
      muscleGroup: 'Abs',
    };
    const action = addCustomExerciseSuccessAction( data );
    const previousState = {
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
    };
    const expectedState = {
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
          selected: false,
        },
      ],
    };

    expect( exerciseList( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'should handle storing the custom exercises retrieved from the users profile in response to RECEIVED_CUSTOM_EXERCISES event', () => {
    const data = [
      {
        compound: true,
        isolation: false,
        name: 'test',
        muscleGroup: 'Abs',
      },
      {
        compound: true,
        isolation: false,
        name: 'chest exercise',
        muscleGroup: 'Chest',
      },
    ];
    const action = receivedCustomExercisesAction( data );
    const previousState = {
      Abs: [
        {
          'compound': false,
          'name': 'Situps',
          'muscleGroup': 'Abs',
          'isolation': true,
          'selected': false,
        },
      ],
      Chest: [
        {
          'compound': true,
          'name': 'Bench Press',
          'muscleGroup': 'Chest',
          'isolation': false,
          'selected': false,
        },
      ],
    };
    const expectedState = {
      Abs: [
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
          selected: false,
        },
      ],
      Chest: [
        {
          'compound': true,
          'name': 'Bench Press',
          'muscleGroup': 'Chest',
          'isolation': false,
          'selected': false,
        },
        {
          compound: true,
          isolation: false,
          name: 'chest exercise',
          muscleGroup: 'Chest',
          selected: false,
        },
      ],
    };

    expect( exerciseList( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'should take an exerciseList passed to it and sort the exercises in alphabetical order', () => {
    const list = {
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
      Forearms: [
        {
          'compound': true,
          'name': 'Wrist Roller',
          'muscleGroup': 'Forearms',
          'isolation': false,
          'selected': false,
        },
        {
          'compound': true,
          'name': "Farmer's Walk",
          'muscleGroup': 'Forearms',
          'isolation': false,
          'selected': false,
        },
      ],
    };

    const expectedValue = {
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
      ],
      Forearms: [
        {
          'compound': true,
          'name': "Farmer's Walk",
          'muscleGroup': 'Forearms',
          'isolation': false,
          'selected': false,
        },
        {
          'compound': true,
          'name': 'Wrist Roller',
          'muscleGroup': 'Forearms',
          'isolation': false,
          'selected': false,
        },
      ],
    };

    expect( sortAlphabetically( list ) ).toEqual( expectedValue );


  } );

} );
