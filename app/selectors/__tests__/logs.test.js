import { getLogs, getMarkedDates } from '../logs';

const state = {
  logs: {
    test: true,
  },
  bodyLogs: [
    {
      'uid': 'CeUI5gCFrQ7E7MAfyBUW',
      'trackedOn': {
        'seconds': 1559278800,
        'nanoseconds': 0,
        'formatted': '05/31/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'weight': {
        'value': '173.2',
        'measurement': 'lbs',
      },
    },
    {
      'uid': 'UckDUD26rSmxSHNeEpGS',
      'trackedOn': {
        'seconds': 1558674000,
        'nanoseconds': 0,
        'formatted': '05/24/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'weight': {
        'value': '171.1',
        'measurement': 'lbs',
      },
    },
    {
      'uid': 'MA02hmUi1o4XhZRACC25',
      'trackedOn': {
        'seconds': 1558587600,
        'nanoseconds': 0,
        'formatted': '05/23/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'weight': {
        'value': '172.2',
        'measurement': 'lbs',
      },
    },
    {
      'uid': 'OW5lA2Jg63ea2sFpJ5We',
      'trackedOn': {
        'seconds': 1558069200,
        'nanoseconds': 0,
        'formatted': '05/17/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'weight': {
        'value': '173.7',
        'measurement': 'lbs',
      },
    },
  ],
  completedExercises: [
    {
      'week': 'week1',
      'weight': 55,
      'rpe': '',
      'trackedOn': {
        'seconds': 1559302767,
        'nanoseconds': 71000000,
      },
      'totalVolume': 935,
      'trackedWeights': [
        55,
        55,
      ],
      'estimated1RM': 69,
      'estimated8RM': 55,
      'isolation': true,
      'belongsTo': 'test_program_attempt_1',
      'exercise': 'Barbell Curl',
      'day': 0,
      'estimated12RM': 50,
      'name': 'Test Program',
      'trackedReps': [
        8,
        9,
      ],
      'type': 'program',
      'estimated3RM': 63,
      'compound': false,
      'estimated10RM': 53,
      'dayName': 'Day 1',
      'estimated5RM': 60,
      'muscleGroup': 'Biceps',
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    },
    {
      'week': 'week8',
      'weight': 235,
      'trackedOn': {
        'seconds': 1559216129,
        'nanoseconds': 0,
      },
      'totalVolume': 4140,
      'trackedWeights': [
        230,
        230,
        230,
      ],
      'estimated1RM': 273,
      'estimated8RM': 219,
      'isolation': false,
      'belongsTo': 'cutting_04_-_06_attempt_1',
      'exercise': 'Barbell Squat',
      'day': 1,
      'estimated12RM': 199,
      'name': 'Cutting 04 - 06',
      'trackedReps': [
        6,
        6,
        6,
      ],
      'type': 'program',
      'estimated3RM': 250,
      'compound': true,
      'estimated10RM': 208,
      'dayName': 'Lower Body 1',
      'estimated5RM': 236,
      'muscleGroup': 'Quads',
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    },
  ],
};

describe( 'unit tests for logs selectors', () => {

  it( 'getLogs() should return the logs reducer', () => {
    expect( getLogs( state ) ).toEqual( state.logs );
  } );

  it( 'getMarkedDates() should return an object of dates that stating whether a working or bodylog was completed on that day', () => {
    const expectedValues = {
      '2019-05-17': {
        'dots': [ { 'color': '#1EB980', 'key': 'bodyLog' } ],
      },
      '2019-05-23': {
        'dots': [ { 'color': '#1EB980', 'key': 'bodyLog' } ],
      },
      '2019-05-24': {
        'dots': [ { 'color': '#1EB980', 'key': 'bodyLog' } ],
      },
      '2019-05-30': {
        'dots': [ { 'color': '#FFCF44', 'key': 'workoutLog' } ],
      },
      '2019-05-31': {
        'dots': [
          { 'color': '#FFCF44', 'key': 'workoutLog' },
          { 'color': '#1EB980', 'key': 'bodyLog' },
        ],
      },
    };

    expect( getMarkedDates( state ) ).toEqual( expectedValues );

  } );

} );
