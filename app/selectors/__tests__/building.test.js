import {
  getBuilding,
  getType,
  calculateWeeksForDropdown,
  getSelectedBuildObject,
  getBuildingSelectedWeek, getBuildingDayTitle, haveCustomSetsBeenAdded,
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

    const state = {
      building: {
        type: 'program',
        program: { test: true },
      },
    };

    expect( getSelectedBuildObject( state ) ).toEqual( state.building.program );

    const state1 = {
      building: {
        type: 'workout',
        workout: { test: true },
      },
    };

    expect( getSelectedBuildObject( state1 ) ).toEqual( state1.building.workout );

  } );

  it( 'getSelectedBuildObject() should based on the currently selected type return either the program or workout object in the redux store', () => {

    const state1 = {
      building: {
        selectedWeek: 0,
      },
    };

    expect( getBuildingSelectedWeek( state1 ) ).toEqual( state1.building.selectedWeek );

  } );

  it( 'getBuildingSelectedWeek() should return the selected week', () => {
    expect( getBuildingSelectedWeek( state ) ).toEqual( state.building.selectedWeek );
  } );

  it( 'getBuildingDayTitle() should return the title for the given for that day', () => {
    expect( getBuildingDayTitle( state, 0 ) ).toEqual( 'Day 1' );
  } );


} );
