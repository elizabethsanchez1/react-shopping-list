import building from '../building';
import {
  addProgramAction, buildChangeWeekAction,
  buildDeleteExerciseAction,
  buildEditFieldAction,
  buildUpdateExerciseOrderAction,
  copyBuildObjectAction,
  createProgramAction,
  editProgramAction,
  openDeleteScreenAction,
  storeProgramConfigAction,
  updateDayTitleAction,
} from '../../actions/building';
import {
  buildingAddExercisesAction,
  openCustomSetAction,
  openExerciseListAction,
  saveCustomSetAction,
} from '../../actions/exercises';

describe( 'Building reducer logic', () => {

  it( 'should return initial state', () => {
    expect( building( {}, {} ) ).toEqual( {} );
  } );

  it( 'should handle EDIT_PROGRAM', () => {
    const program = {
      week1: [ {}, {}, {}, {} ],
      week2: [ {}, {}, {}, {} ],
      week3: [ {}, {}, {}, {} ],
      week4: [ {}, {}, {}, {} ],
      week5: [ {}, {}, {}, {} ],
    };
    const previousState = {};
    const action = editProgramAction( program );
    const expectedState = {
      active: true,
      type: 'program',
      program: JSON.parse( JSON.stringify( program ) ),
      editing: true,
      weeks: Object.keys( program ).length,
      daysPerWeek: action.payload.week1.length,
      name: action.payload.name,
      selectedWeek: 'week1',
      selectedDay: 0,
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'should handle ADD_PROGRAM event', () => {
    const previousState = {};
    const action = addProgramAction();
    const expectedState = {
      active: true,
      type: 'program',
      editing: false,
      selectedWeek: 'week1',
      selectedDay: 0,
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'should handle STORE_PROGRAM_CONFIG', () => {
    const previousState = {};
    const payload = {
      name: 'test',
      weeks: [],
      daysPerWeek: 4,
      schedule: '',
      template: '',
    };
    const action = storeProgramConfigAction( payload );
    const expectedState = {
      name: 'test',
      weeks: [],
      daysPerWeek: 4,
      schedule: '',
      template: '',
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'should handle CREATE_PROGRAM', () => {
    const previousState = { weeks: 4, daysPerWeek: 2 };
    const action = createProgramAction();
    const expectedState = {
      weeks: 4,
      daysPerWeek: 2,
      program: {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
        'week2': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
        'week3': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
        'week4': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'buidlingAddExercisesAction() should store newly add exercises in response to  BUILDING_ADD_EXERCISES', () => {
    const previousState = {
      'active': true,
      'type': 'program',
      'editing': false,
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'name': 'Test',
      'weeks': 1,
      'daysPerWeek': '2',
      'schedule': '',
      'template': '',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };
    const data = [
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
    ];
    const action = buildingAddExercisesAction( data );
    const expectedState = {
      'active': true,
      'type': 'program',
      'editing': false,
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'name': 'Test',
      'weeks': 1,
      'daysPerWeek': '2',
      'schedule': '',
      'template': '',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                'compound': false,
                'name': 'Situps',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
              },
              {
                'compound': false,
                'name': 'Machine Crunch',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
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
    };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'updateDayTitleAction() should update title of the day for the selectedWeek in response to UPDATE_DAY_TITLE event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };
    const data = { text: 'Upper Body', index: 0 };
    const action = updateDayTitleAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Upper Body',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'buildEditFieldAction() should update the field described in the action in response to BUILD_EDIT_FIELD event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                'compound': false,
                'name': 'Situps',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
              },
              {
                'compound': false,
                'name': 'Machine Crunch',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
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
    };

    const data = { exerciseLocation: 0, field: 'weight', value: '10', selectedDay: 0 };
    const action = buildEditFieldAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                'compound': false,
                'name': 'Situps',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '10',
                type: 'standard',
              },
              {
                'compound': false,
                'name': 'Machine Crunch',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
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
    };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'openExerciseListAction should pass the day selected so we can store that information so that when we add exercises, we know what day to add them to in response to OPEN_EXERCISE_LIST event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {},
    };

    const data = 1;
    const action = openExerciseListAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 1,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {},
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'openCustomSetAction() should pass us day selected index and exercises location index so that when we finish adding a custom set we know where to store it in response to OPEN_CUSTOM_SET event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {},
    };

    const data = { selectedDay: 1, selectedExercise: 4 };
    const action = openCustomSetAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 1,
      selectedExercise: 4,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {},
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'openCustomSetAction() should pass us day selected index and exercises location index so that when we finish adding a custom set we know where to store it in response to OPEN_CUSTOM_SET event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                'compound': false,
                'name': 'Situps',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
              },
            ],
          },
        ],
      },
    };

    const data = {
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
    };
    const action = saveCustomSetAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
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
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'buildUpdateExerciseOrderAction() should pass in an object of exercises and an array specifying what the new order should be, the reducer should re-order the exercises and store them in response to BUILD_UPDATE_EXERCISE_ORDER event', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                compound: false,
                name: 'Bench press',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '1',
                weight: '2',
                sets: '3',
              },
              {
                compound: false,
                name: 'Situps',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '5',
                weight: '6',
                sets: '7',
              },
              {
                compound: false,
                name: 'Pull ups',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '8',
                weight: '9',
                sets: '10',
              },
            ],
          },
        ],
      },
    };

    const data = {
      newOrder: [ '3', '2', '1' ],
    };
    const action = buildUpdateExerciseOrderAction( data );

    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                compound: false,
                name: 'Pull ups',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '8',
                weight: '9',
                sets: '10',
              },
              {
                compound: false,
                name: 'Situps',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '5',
                weight: '6',
                sets: '7',
              },
              {
                compound: false,
                name: 'Bench press',
                muscleGroup: 'Abs',
                isolation: true,
                type: 'standard',
                rpe: '',
                reps: '1',
                weight: '2',
                sets: '3',
              },
            ],
          },
        ],
      },
    };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'openDeleteScreenAction() should pass in a selectedDay index to store so we know what exercises to retrieve on the delete page', () => {
    const previousState = {
      selectedDay: '',
    };
    const data = { selectedDay: 0 };
    const action = openDeleteScreenAction( data );
    const expectedState = { selectedDay: 0 };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'buildDeleteExerciseAction() should pass in an index of the exercises that we need to delete from the exercises for the specific day', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [
              {
                'compound': false,
                'name': 'Situps',
                'muscleGroup': 'Abs',
                'isolation': true,
                rpe: '',
                reps: '',
                sets: '',
                weight: '',
                type: 'standard',
              },
            ],
          },
        ],
      },
    };
    const data = { deleteIndex: 0 };
    const action = buildDeleteExerciseAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 1,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
        ],
      },
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

  } );

  it( 'copyBuildObjectAction() should pass in a copyFrom and copyTo string that tells us what week from the build object to copy from and where to copy the data', () => {
    const previousState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 3,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
        'week2': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
        'week3': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };
    const data = { copyFrom: 'Week 1', copyTo: 'Week 2' };
    const action = copyBuildObjectAction( data );
    const expectedState = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 3,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
        'week2': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
        'week3': [
          {
            'completed': false,
            'day': 'Day 1',
            'exercises': [],
          },
          {
            'completed': false,
            'day': 'Day 2',
            'exercises': [],
          },
        ],
      },
    };

    expect( building( previousState, action ) ).toEqual( expectedState );

    const data1 = { copyFrom: 'Week 1', copyTo: 'All Weeks' };
    const action1 = copyBuildObjectAction( data1 );
    const expectedState1 = {
      'type': 'program',
      'selectedWeek': 'week1',
      'selectedDay': 0,
      selectedExercise: 0,
      'weeks': 3,
      'daysPerWeek': '2',
      'program': {
        'week1': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
        'week2': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
        'week3': [
          {
            'completed': false,
            'day': 'Ab Day',
            'exercises': [
              {
                'compound': false,
                'name': 'Hanging Leg Raises',
                'muscleGroup': 'Abs',
                'isolation': true,
                'rpe': '',
                'reps': '10',
                'sets': '3',
                'weight': '50',
                'type': 'standard',
              },
            ],
          },
          {
            'completed': false,
            'day': 'Chest Day',
            'exercises': [
              {
                'compound': true,
                'name': 'Barbell Bench Press',
                'muscleGroup': 'Chest',
                'isolation': false,
                'rpe': '',
                'reps': '8',
                'sets': '5',
                'weight': '225',
                'type': 'standard',
              },
            ],
          },
        ],
      },
    };

    expect( building( previousState, action1 ) ).toEqual( expectedState1 );
  } );

  it( 'buildChangeWeekAction() will pass in a new selected week that needs to update the selectedWeek field', () => {
    const previousState = { selectedWeek: 'week1' };
    const data = 'Week 3';
    const action = buildChangeWeekAction( data );
    const expectedState = { selectedWeek: 'week3' };

    expect( building( previousState, action ) ).toEqual( expectedState );
  } );

} );
