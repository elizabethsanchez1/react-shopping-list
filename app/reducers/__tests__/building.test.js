import building from '../building';
import {
  addProgramAction,
  createProgramAction,
  editProgramAction,
  storeProgramConfigAction
} from '../../actions/building';

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
      weekSelected: 'week1',
      daySelected: 0,
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

} );
