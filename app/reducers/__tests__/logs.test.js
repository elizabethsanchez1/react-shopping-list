import logs from '../logs';
import { logSelectDayAction, logUpdateBodyLogAction, logUpdateWorkoutAction } from '../../actions/logs';

const state = {
  logs: {},
  completedExercises: [
    {
      'week': 'week7',
      'weight': 20,
      'trackedOn': {
        'seconds': 1558478036,
        'nanoseconds': 734999000,
      },
      'totalVolume': 750,
      'trackedWeights': [
        25,
        25,
        25,
      ],
      'estimated1RM': 33,
      'estimated8RM': 26,
      'totalReps': 30,
      'belongsTo': 'cutting_04_-_06_attempt_1',
      'exercise': 'Side Laterals',
      'day': 0,
      'estimated12RM': 24,
      'trackedReps': [
        10,
        10,
        10,
      ],
      'type': 'program',
      'estimated3RM': 30,
      'estimated10RM': 25,
      'program': 'Cutting 04 - 06',
      'dayName': 'Upper Body 1',
      'estimated5RM': 29,
      'muscleGroup': 'Shoulders',
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'uid': 'YpQrpYsdlCtEgpJelqEk',
    },
    {
      'week': 'week7',
      'weight': 60,
      'trackedOn': {
        'seconds': 1558478036,
        'nanoseconds': 734999000,
      },
      'totalVolume': 1320,
      'trackedWeights': [
        55,
        55,
        55,
      ],
      'estimated1RM': 69,
      'estimated8RM': 55,
      'totalReps': 24,
      'belongsTo': 'cutting_04_-_06_attempt_1',
      'exercise': 'Barbell Curl',
      'day': 0,
      'estimated12RM': 50,
      'trackedReps': [
        8,
        8,
        8,
      ],
      'type': 'program',
      'estimated3RM': 63,
      'estimated10RM': 53,
      'program': 'Cutting 04 - 06',
      'dayName': 'Upper Body 1',
      'estimated5RM': 60,
      'muscleGroup': 'Biceps',
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'uid': 'WQeKcx6WFFLiCIgkNQax',
    },
    {
      'week': 'week6',
      'weight': 150,
      'trackedOn': {
        'seconds': 1558299858,
        'nanoseconds': 114000000,
      },
      'totalVolume': 6600,
      'trackedWeights': [
        165,
        165,
        165,
        165,
        165,
      ],
      'estimated1RM': 206,
      'estimated8RM': 165,
      'totalReps': 40,
      'belongsTo': 'cutting_04_-_06_attempt_1',
      'exercise': 'Standing Calf Raise',
      'day': 3,
      'estimated12RM': 150,
      'trackedReps': [
        8,
        8,
        8,
        8,
        8,
      ],
      'type': 'program',
      'estimated3RM': 189,
      'estimated10RM': 157,
      'program': 'Cutting 04 - 06',
      'dayName': 'Lower Body 2',
      'estimated5RM': 178,
      'muscleGroup': 'Calves',
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    },
  ],
  bodyLogs: [
    {
      'uid': 'zihWvjqFayMu6DOAuj9y',
      'trackedOn': {
        'seconds': 1559365200,
        'nanoseconds': 0,
        'formatted': '06/01/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'weight': {
        'value': '171.6',
        'measurement': 'lbs',
      },
    },
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
        'formatted': '05/21/2019',
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
};

describe( 'logs reducer unit tests', () => {

  it( 'should return empty inital state', () => {
    expect( logs( {}, {} ) ).toEqual( {} );
  } );

  it( 'logSelectedDayAction() should dispatch LOG_SELECTED_DAY and pass in a date that was selected', () => {
    const data = {
      selectedDay: '5/21/2019',
      exercises: state.completedExercises,
      bodyLogs: state.bodyLogs,
    };
    const action = logSelectDayAction( data );

    const expectedState = {
      selectedDay: '5/21/2019',
      changedExercises: false,
      changedBodyLogs: false,
      exercises: [
        {
          name: 'Side Laterals',
          uid: 'YpQrpYsdlCtEgpJelqEk',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          uid: 'WQeKcx6WFFLiCIgkNQax',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
      bodyLogs: [
        {
          'title': 'Arms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Body Fat',
          'measurement': '%',
          'value': '',
        },
        {
          'title': 'Calves',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Chest',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Forearms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Hips',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Thighs',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Waist',
          'measurement': 'in',
          'value': '',
        },
        {
          'uid': 'MA02hmUi1o4XhZRACC25',
          'title': 'Weight',
          'measurement': 'lbs',
          'value': '172.2',
        },
      ],
    };

    expect( logs( state, action ) ).toEqual( expectedState );
  } );


  it( 'logUpdateWorkoutAction() should dispatch LOG_UPDATE_WORKOUT_ACTION with an update object telling us how to mofidy the exercises in state as well as flip the changed exercises flag so we know that we have to enable save functionality', () => {
    const data = {
      setLocation: 2,
      field: 'reps',
      exerciseLocation: 0,
      value: '15',
    };
    const action = logUpdateWorkoutAction( data );
    const previousState = {
      selectedDay: '5/21/2019',
      changedExercises: false,
      changedBodyLogs: false,
      exercises: [
        {
          name: 'Side Laterals',
          uid: 'YpQrpYsdlCtEgpJelqEk',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          uid: 'WQeKcx6WFFLiCIgkNQax',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
      bodyLogs: [
        {
          'title': 'Arms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Body Fat',
          'measurement': '%',
          'value': '',
        },
        {
          'title': 'Calves',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Chest',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Forearms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Hips',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Thighs',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Waist',
          'measurement': 'in',
          'value': '',
        },
        {
          'uid': 'MA02hmUi1o4XhZRACC25',
          'title': 'Weight',
          'measurement': 'lbs',
          'value': '172.2',
        },
      ],
    };
    const expectedState = {
      selectedDay: '5/21/2019',
      changedExercises: true,
      changedBodyLogs: false,
      exercises: [
        {
          name: 'Side Laterals',
          uid: 'YpQrpYsdlCtEgpJelqEk',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '15', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          uid: 'WQeKcx6WFFLiCIgkNQax',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
      bodyLogs: [
        {
          'title': 'Arms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Body Fat',
          'measurement': '%',
          'value': '',
        },
        {
          'title': 'Calves',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Chest',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Forearms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Hips',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Thighs',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Waist',
          'measurement': 'in',
          'value': '',
        },
        {
          'uid': 'MA02hmUi1o4XhZRACC25',
          'title': 'Weight',
          'measurement': 'lbs',
          'value': '172.2',
        },
      ],
    };


    expect( logs( previousState, action ) ).toEqual( expectedState );
  } );


  it( 'logUpdateBodyLogAction() should dispatch LOG_UPDATE_BODY_LOG with an object for that property that has been updated. it just needs to replace the once property in the body logs array', () => {
    const data = {
      title: 'Arms',
      measurement: 'in',
      value: '16',
    };
    const action = logUpdateBodyLogAction( data );
    const previousState = {
      selectedDay: '5/21/2019',
      changedExercises: false,
      changedBodyLogs: false,
      exercises: [
        {
          name: 'Side Laterals',
          uid: 'YpQrpYsdlCtEgpJelqEk',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          uid: 'WQeKcx6WFFLiCIgkNQax',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
      bodyLogs: [
        {
          'title': 'Arms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Body Fat',
          'measurement': '%',
          'value': '',
        },
        {
          'title': 'Calves',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Chest',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Forearms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Hips',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Thighs',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Waist',
          'measurement': 'in',
          'value': '',
        },
        {
          'uid': 'MA02hmUi1o4XhZRACC25',
          'title': 'Weight',
          'measurement': 'lbs',
          'value': '172.2',
        },
      ],
    };
    const expectedState = {
      selectedDay: '5/21/2019',
      changedExercises: false,
      changedBodyLogs: true,
      exercises: [
        {
          name: 'Side Laterals',
          uid: 'YpQrpYsdlCtEgpJelqEk',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          uid: 'WQeKcx6WFFLiCIgkNQax',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
      bodyLogs: [
        {
          'title': 'Arms',
          'measurement': 'in',
          'value': '16',
        },
        {
          'title': 'Body Fat',
          'measurement': '%',
          'value': '',
        },
        {
          'title': 'Calves',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Chest',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Forearms',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Hips',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Thighs',
          'measurement': 'in',
          'value': '',
        },
        {
          'title': 'Waist',
          'measurement': 'in',
          'value': '',
        },
        {
          'uid': 'MA02hmUi1o4XhZRACC25',
          'title': 'Weight',
          'measurement': 'lbs',
          'value': '172.2',
        },
      ],
    };

    expect( logs( previousState, action ) ).toEqual( expectedState );
  } );

} );
