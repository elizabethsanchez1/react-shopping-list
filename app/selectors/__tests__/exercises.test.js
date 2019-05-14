import {
  formatCustomSets,
  getClonedExerciseList, getCustomSetExercise, getCustomSetExerciseSets, getExerciseForCustomSet,
  getExercises,
  getSelectedExercises,
  getSelectedExercisesByMuscleGroup,
  getSelectedMuscleGroup, haveCustomSetsBeenAdded,
} from '../exercises';

const state = {
  building: {
    selectedDay: 0,
    selectedExercise: 0,
    selectedWeek: 'week1',
    type: 'program',
    program: {
      week1: [
        {
          'completed': false,
          'day': 'Day 1',
          'exercises': [
            {
              'compound': false,
              'name': 'Situps',
              'muscleGroup': 'Abs',
              'isolation': true,
              'rpe': '',
              'reps': '',
              'sets': '',
              'weight': '',
              'type': 'standard',
            },
            {
              compound: false,
              name: 'Situps',
              muscleGroup: 'Abs',
              isolation: true,
              type: 'standard',
              rpe: '',
              reps: '8-12',
              weight: '100-120',
              sets: '3',
              customSet: [
                { set: 1, weight: '100', reps: '8' },
                { set: 2, weight: '110', reps: '10' },
                { set: 3, weight: '120', reps: '12' },
              ],
            },
          ],
        },
        {
          'completed': false,
          'day': 'Day 2',
          'exercises': [],
        },
      ],
    },
  },
  exercisesNEW: {
    selectedMuscleGroup: 'Abs',
    selectedExercises: [
      { name: 'Situps' },
      { name: 'Machine Crunch' },
      { name: 'Hanging Leg Raises' },
    ],
    exerciseList: {
      'Abs': [
        { name: 'Situps' },
        { name: 'Machine Crunch' },
        { name: 'Hanging Leg Raises' },
        { name: 'Crunch' },
        { name: 'Decline Crunch' },
      ],
    },
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

  it( 'getSelectedExercises() should return the exercises that have already been added by the user', () => {
    expect( getSelectedExercises( state ) )
      .toEqual( state.exercisesNEW.selectedExercises );
  } );

  it( 'getClonedExerciseList() should return the exerciselist inside of the exercises reducer', () => {
    expect( getClonedExerciseList( state ) ).toEqual( state.exercisesNEW.exerciseList );
  } );

  it( 'getExercisesByMuscleGroup() should return the subset of exercises based on what muscle group the user selected', () => {
    expect( getSelectedExercisesByMuscleGroup( state ) )
      .toEqual( state.exercisesNEW.exerciseList.Abs );
  } );

  it( 'haveCustomSetsBeenAdded() should return true if user is does not have a single number for the weight or reps of a exercise and false if it a normal exercises', () => {
    const exercise = {
      'name': 'Dumbbell Hammer Curl',
      'rpe': '',
      'reps': '',
      'sets': '',
      'weight': '',
      'type': 'standard',
    };

    expect( haveCustomSetsBeenAdded( exercise ) ).toEqual( false );

    const exercise1 = {
      'compound': false,
      'name': 'Dumbbell Hammer Curl',
      'muscleGroup': 'Biceps',
      'isolation': true,
      'rpe': '',
      'reps': '8-12',
      'sets': '',
      'weight': '',
      'type': 'standard',
    };

    expect( haveCustomSetsBeenAdded( exercise1 ) ).toEqual( true );

    const exercise2 = {
      'compound': false,
      'name': 'Dumbbell Hammer Curl',
      'muscleGroup': 'Biceps',
      'isolation': true,
      'rpe': '',
      'reps': '8',
      'sets': '',
      'weight': '100-120',
      'type': 'standard',
    };

    expect( haveCustomSetsBeenAdded( exercise2 ) ).toEqual( true );
  } );

  it( 'getCustomSetExerciseSets() should return the array of sets they need to start making edits', () => {

    const expectedValue = [
      { set: 1, weight: '', reps: '' },
      { set: 2, weight: '', reps: '' },
      { set: 3, weight: '', reps: '' },
    ];

    expect( getCustomSetExerciseSets( state ) ).toEqual( expectedValue );

    const state1 = {
      building: {
        selectedDay: 0,
        selectedExercise: 0,
        selectedWeek: 'week1',
        type: 'program',
        program: {
          week1: [
            {
              'completed': false,
              'day': 'Day 1',
              'exercises': [
                {
                  compound: false,
                  name: 'Situps',
                  muscleGroup: 'Abs',
                  isolation: true,
                  type: 'standard',
                  rpe: '',
                  reps: '8-12',
                  weight: '100-120',
                  sets: '3',
                  customSet: [
                    { set: 1, weight: '100', reps: '8' },
                    { set: 2, weight: '110', reps: '10' },
                    { set: 3, weight: '120', reps: '12' },
                  ],
                },
              ],
            },
          ],
        },
      },
    };

    const expectedValue1 = [
      { set: 1, weight: '100', reps: '8' },
      { set: 2, weight: '110', reps: '10' },
      { set: 3, weight: '120', reps: '12' },
    ];

    expect( getCustomSetExerciseSets( state1 ) ).toEqual( expectedValue1 );
  } );

  it( 'getCustomSetExercise() should return the name of the exercises they are trying to customize', () => {
    expect( getCustomSetExercise( state ) ).toEqual(
      {
        'compound': false,
        'name': 'Situps',
        'muscleGroup': 'Abs',
        'isolation': true,
        'rpe': '',
        'reps': '',
        'sets': '',
        'weight': '',
        'type': 'standard',
      },
    );
  } );

  it( 'formatCustomSets() should take an exercise and the custom sets and format the data so that they build reducer can store it', () => {

    const sets = [
      { set: 1, weight: '100', reps: '8' },
      { set: 2, weight: '110', reps: '10' },
      { set: 3, weight: '120', reps: '12' },
    ];

    const exercise = {
      'compound': false,
      'name': 'Situps',
      'muscleGroup': 'Abs',
      'isolation': true,
      'rpe': '',
      'reps': '',
      'sets': '',
      'weight': '',
      'type': 'standard',
    };

    const expectedValue = {
      compound: false,
      name: 'Situps',
      muscleGroup: 'Abs',
      isolation: true,
      type: 'standard',
      rpe: '',
      reps: '8-12',
      weight: '100-120',
      sets: '3',
      customSet: sets,
    };

    expect( formatCustomSets( { sets, exercise } ) ).toEqual( expectedValue );

  } );

} );
