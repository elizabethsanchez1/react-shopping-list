import {
  getBuilding,
  getType,
  calculateWeeksForDropdown,
  getSelectedBuildObject,
  getBuildingSelectedWeek,
  getBuildingDayTitle,
  getExercisesBySelectedDay,
  getBuildingSelectedDay,
  getBuildingSelectedExercise,
  getBuildingSelectedExerciseObject,
  computeDropdownWeeks,
  getBuildObjectName, getBuildSaveInfo, getBuildEditFlag, getBuildDocumentId,
} from '../building';

const state = {
  building: {
    type: 'program',
    program: {
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
              'name': 'Pullups',
              'muscleGroup': 'Abs',
              'isolation': true,
              rpe: '',
              reps: '8-12',
              sets: '',
              weight: '10',
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
    },
    selectedWeek: 'week1',
    selectedDay: 0,
    selectedExercise: 0,
    name: 'testing',
    documentId: 5,
  },
  user: {
    uid: 15,
  },
};

const workoutState = {
  building: {
    editing: true,
    type: 'workout',
    template: '',
    selectedExercise: 0,
    workout: {
      completed: false,
      day: 'Upper body',
      exercises: [
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
      ],
    },
  },
  user: {
    uid: 15,
  },
};

describe( 'Building selectors', () => {

  it( 'getBuilding() should return building reducer', () => {
    expect( getBuilding( state ) ).toEqual( state.building );
  } );

  it( 'getType() should return whether the selected item is of type program or workout', () => {
    expect( getType( state ) ).toEqual( state.building.type );
  } );

  it( 'calculateWeeksForDropdown()  should take a number and convert that into an array of objects that our dropdown can use to display all the weeks', () => {

    const program = {
      week1: [ {}, {}, {}, {} ],
      week2: [ {}, {}, {}, {} ],
      week3: [ {}, {}, {}, {} ],
      week4: [ {}, {}, {}, {} ],
      week5: [ {}, {}, {}, {} ],
    };

    const expectedValues = [
      { value: 'Week 1' },
      { value: 'Week 2' },
      { value: 'Week 3' },
      { value: 'Week 4' },
      { value: 'Week 5' },
    ];

    expect( calculateWeeksForDropdown( program ) )
      .toEqual( expectedValues );

    expect( calculateWeeksForDropdown( 5 ) ).toEqual( expectedValues );

  } );

  it( 'getSelectedBuildObject() should based on the currently selected type return either the program or workout object in the redux store', () => {

    const state1 = {
      building: {
        type: 'program',
        program: { test: true },
      },
    };

    expect( getSelectedBuildObject( state1 ) ).toEqual( state1.building.program );

    const state2 = {
      building: {
        type: 'workout',
        workout: { test: true },
      },
    };

    expect( getSelectedBuildObject( state2 ) ).toEqual( state2.building.workout );

  } );

  it( 'getBuildingSelectedWeek() should return the selected week', () => {
    expect( getBuildingSelectedWeek( state ) ).toEqual( state.building.selectedWeek );
  } );

  it( 'getBuildingDayTitle() should return the title for the given for that day', () => {
    expect( getBuildingDayTitle( state, 0 ) ).toEqual( 'Day 1' );

    expect( getBuildingDayTitle( workoutState, undefined ) )
      .toEqual( 'Upper body' );
  } );

  it( 'getExercisesBySelectedDay() for type program should return the array of exercises for the given day', () => {
    const { selectedWeek, selectedDay } = state.building;

    expect( getExercisesBySelectedDay( state ) ).toEqual( state.building.program[ selectedWeek ][ selectedDay ].exercises );
  } );

  it( 'getExercisesBySelectedDay() for type workout should return the array of exercises for the given day', () => {

    expect( getExercisesBySelectedDay( workoutState ) )
      .toEqual( workoutState.building.workout.exercises );
  } );

  it( 'getBuildingSelectedWeek() should return selected week property', () => {
    expect( getBuildingSelectedWeek( state ) ).toEqual( state.building.selectedWeek );
  } );

  it( 'getBuildingSelectedDay() should return selected day property', () => {
    expect( getBuildingSelectedDay( state ) ).toEqual( state.building.selectedDay );
  } );

  it( 'getBuildingSelectedExercise() should return selectedExericise property', () => {
    expect( getBuildingSelectedExercise( state ) ).toEqual( state.building.selectedExercise );
  } );

  it( 'getBuildingSelectedExerciseObject() for type programs should return the selected exercise object itself', () => {
    const { selectedWeek, selectedDay, selectedExercise, type } = state.building;
    expect( getBuildingSelectedExerciseObject( state ) )
      .toEqual( state.building[ type ][ selectedWeek ][ selectedDay ].exercises[ selectedExercise ] );
  } );

  it( 'getBuildingSelectedExerciseObject() for type workouts should return the selected exercise object itself', () => {
    const { selectedExercise } = workoutState.building;

    expect( getBuildingSelectedExerciseObject( workoutState ) )
      .toEqual( workoutState.building.workout.exercises[ selectedExercise ] );
  } );

  it( 'computeDropdownWeeks() should take some values and format them in a way that our dropdown component can read as well as add as the first option All Weeks ', () => {

    const data = [
      { 'value': 'Week 1' },
      { 'value': 'Week 2' },
      { 'value': 'Week 3' },
    ];
    const expectedValue = [
      { 'value': 'All Weeks' },
      { 'value': 'Week 1' },
      { 'value': 'Week 2' },
      { 'value': 'Week 3' },
    ];
    expect( computeDropdownWeeks( data ) ).toEqual( expectedValue );

  } );

  it( 'getBuildObjectName() should return the name of the program/workout', () => {
    expect( getBuildObjectName( state ) ).toEqual( state.building.name );

    expect( getBuildObjectName( workoutState ) )
      .toEqual( workoutState.building.workout.day );

  } );

  it( 'getBuildSaveInfo() should return the uid, type of program being build, the project object and the name given to the program/workout all in one selector call', () => {
    const { type } = state.building;
    const expectedValues = {
      userId: state.user.uid,
      name: state.building.name,
      type,
      [ type ] : state.building[ type ],
      editing: false,
      documentId: state.building.documentId,
    };

    expect( getBuildSaveInfo( state ) ).toEqual( expectedValues );


    const expectedValues1 = {
      userId: state.user.uid,
      type: 'workout',
      workout : workoutState.building.workout,
      editing: true,
      documentId: workoutState.building.documentId,
    };

    expect( getBuildSaveInfo( workoutState ) ).toEqual( expectedValues1 );

  } );

  it( 'getBuildEditFlag() should return a boolean depending on whether we are editing a program or workout', () => {

    expect( getBuildEditFlag( state ) ).toEqual( false );
    expect( getBuildEditFlag( workoutState ) ).toEqual( true );

  } );

  it( 'getBuildDocumentId() should return the document id for the program or workout we are editing', () => {
    expect( getBuildDocumentId( state ) ).toEqual( 5 );
  } );

} );
