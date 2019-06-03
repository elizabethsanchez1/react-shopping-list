import {
  getActiveAttempt,
  getCompletedPercentages,
  getWeeksFromProgram,
  getTrack,
  getTrackObject,
  markCompletedFlagsByDaysCompleted,
  getTrackProgramWeeks,
  getStartedTrackingByProgram,
  markCompletedFlagsByDate,
  getDaysForEachWeek,
  getTrackSets,
  getTrackSelectedInfo,
  getTrackType,
  getTrackDay,
  getTrackExercisesByDay,
  getPreviousExercisesByCount,
  getMaxesInfoByExercise,
  getTrackSaveInfo,
  calculateActiveAttempt,
  calculateTrackedExerciseNumbers, calculateTrackedExerciseProgramInfo, getTrackDocumentId, getTrackSummaryData,
} from '../track';

import { program, completedExercises, savedWorkouts, workout, newProgram } from '../mockData/exampleData';

// const savedWorkouts = {
//   programs: [
//     {
//       'program': {
//         'week1': [
//           {
//             'completed': false,
//             'day': 'Lower Body 1',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Upper Body 1',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Lower Body 2',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Upper Body 2',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//         ],
//         'week2': [
//           {
//             'completed': false,
//             'day': 'Lower Body 1',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Upper Body 1',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Lower Body 2',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//           {
//             'completed': false,
//             'day': 'Upper Body 2',
//             exercises: [ 1, 2, 3, 4 ],
//           },
//         ],
//       },
//       'created': {
//         'seconds': 1546379755,
//         'nanoseconds': 558000000,
//         'formatted': '01/01/2019',
//       },
//       'attempts': [
//         {
//           'attempt': 'maintenance_01-04_attempt_1',
//           'startedTracking': {
//             'seconds': 1546927200,
//             'nanoseconds': 0,
//           },
//           'finishedTracking': '',
//         },
//       ],
//       'type': 'program',
//       'activeAttempt': 'maintenance_01-04_attempt_1',
//       'name': 'Maintenance 01-04',
//       'documentId': 'G2Mf8phoH3SwHmGAYBsO',
//     },
//   ],
// };

const state = {
  track: {
    type: 'program',
    trackObject: program,
    selected: {
      week: 'week1',
      day: 0,
    },
    sets: [
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
        { set: 4, weight: '', reps: '', previous: '' },
      ],
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
      ],
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
      ],
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
      ],
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
      ],
      [
        { set: 1, weight: '', reps: '', previous: '' },
        { set: 2, weight: '', reps: '', previous: '' },
        { set: 3, weight: '', reps: '', previous: '' },
      ],
    ],
    exercises: [
      {
        'exercise': 'Barbell Bench Press',
        'weight': '225',
        'sets': '4',
        'reps': '5',
        'compound': true,
        'isolation': false,
        'muscleGroup': 'Chest',
      },
      {
        'exercise': 'Barbell Curl',
        'weight': '60',
        'sets': '3',
        'reps': '10',
        'compound': false,
        'isolation': true,
        'muscleGroup': 'Biceps',
      },
      {
        'exercise': 'Cable Overhead Tricep Extension',
        'weight': '120',
        'sets': '3',
        'reps': '10',
        'compound': false,
        'isolation': true,
        'muscleGroup': 'Triceps',
      },
      {
        'exercise': 'Pull ups',
        'weight': '175',
        'sets': '3',
        'reps': '7',
        'compound': true,
        'isolation': false,
        'muscleGroup': 'Back',
      },
      {
        'exercise': 'Side Laterals',
        'weight': '20',
        'sets': '3',
        'reps': '12',
        'compound': false,
        'isolation': true,
        'muscleGroup': 'Shoulders',
      },
      {
        'exercise': 'Machine Bicep Curl',
        'weight': '90',
        'sets': '3',
        'reps': '8',
        'compound': false,
        'isolation': true,
        'muscleGroup': 'Biceps',
      },
    ],
  },
  completedExercises,
  savedWorkouts,
};

const workoutState = {
  track: {
    type: 'workout',
    trackObject: workout,
    exercises: [
      {
        'weight': '50',
        'sets': '3',
        'reps': '10',
        'compound': false,
        'isolation': true,
        'rpe': '',
        'type': 'standard',
        'muscleGroup': 'Biceps',
        'name': 'Barbell Curl',
      },
      {
        'weight': '25',
        'sets': '3',
        'reps': '12',
        'compound': false,
        'isolation': true,
        'rpe': '',
        'type': 'standard',
        'muscleGroup': 'Biceps',
        'name': 'Dumbbell Hammer Curl',
      },
    ],
  },
  completedExercises,
  savedWorkouts,
};


describe( 'Track selectors', () => {

  it( 'getTrack() should return the track reducer', () => {
    expect( getTrack( state ) ).toEqual( state.track );
  } );

  it( 'getTrackObject() should return the selected program/workout that has been selected', () => {
    expect( getTrackObject( state ) ).toEqual( state.track.trackObject );
  } );

  it( 'getCompletedPercentage() should return a percentage of how close the user is to completing that workout', () => {
    const expectedValue = {
      'Cutting 04 - 06': 51,
      'Test Program': 0,
    };

    expect( getCompletedPercentages( state ) ).toEqual( expectedValue );
  } );

  it( 'getWeeksFromProgram() should return an array of ordered object that show each week the selected program has', () => {
    const expectedValue = [
      {
        'label': 'Week 1',
        'week': 'week1',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 2',
        'week': 'week2',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 3',
        'week': 'week3',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 4',
        'week': 'week4',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 5',
        'week': 'week5',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 6',
        'week': 'week6',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 7',
        'week': 'week7',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 8',
        'week': 'week8',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 9',
        'week': 'week9',
        'daysPerWeek': 4,
      },
      {
        'label': 'Week 10',
        'week': 'week10',
        'daysPerWeek': 4,
      },
    ];

    expect( getWeeksFromProgram( state.track.trackObject ) ).toEqual( expectedValue );
  } );

  it( 'markCompletedFlagsByDaysCompleted() return the program weeks list with extra property completed= true or false depending on whether the user has completed that week', () => {
    const expectedValue = [
      {
        'label': 'Week 1',
        'week': 'week1',
        'daysPerWeek': 4,
        'completed': true,
      },
      {
        'label': 'Week 2',
        'week': 'week2',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 3',
        'week': 'week3',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 4',
        'week': 'week4',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 5',
        'week': 'week5',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 6',
        'week': 'week6',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 7',
        'week': 'week7',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 8',
        'week': 'week8',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 9',
        'week': 'week9',
        'daysPerWeek': 4,
        'completed': false,
      },
      {
        'label': 'Week 10',
        'week': 'week10',
        'daysPerWeek': 4,
        'completed': false,
      },
    ];

    expect( markCompletedFlagsByDaysCompleted( state ) ).toEqual( expectedValue );
  } );

  it( 'getActiveAttempt() should return the active attempt of the selected program', () => {
    expect( getActiveAttempt( state ) )
      .toEqual( state.track.trackObject.activeAttempt );
  } );

  // TODO need to figure out how to mock out Moment correctly
  it( 'getTrackProgramWeeks() should get an array of week object to display to the user so they can pick a week to track', () => {

    // this is not working
    jest.mock( 'moment', () => () => (
      {
        format: () => '2019-05-21T19:46:09-05:00',
        unix: () => '2019-04-09T20:52:09-05:00',
      } ) );


    const expectedValue = [
      {
        'label': 'Week 1 Completed',
        'week': 'week1',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 2 Completed',
        'week': 'week2',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 3 Completed',
        'week': 'week3',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 4 Completed',
        'week': 'week4',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 5 Completed',
        'week': 'week5',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 6 Completed',
        'week': 'week6',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 7 Completed',
        'week': 'week7',
        'completed': true,
        'currentWeek': false,
      },
      {
        'label': 'Week 8 --- Current Week',
        'week': 'week8',
        'completed': false,
        'currentWeek': true,
      },
      {
        'label': 'Week 9',
        'week': 'week9',
        'completed': false,
        'currentWeek': false,
      },
      {
        'label': 'Week 10',
        'week': 'week10',
        'completed': false,
        'currentWeek': false,
      },
    ];
    expect( getTrackProgramWeeks( state ) ).toEqual( expectedValue );

    // scenario where its a new program
    const state1 = {
      track: {
        type: 'program',
        selected: {
          week: 'week1',
          day: 0,
        },
        trackObject: newProgram,
      },
      completedExercises,
      savedWorkouts,
    };
    const expectedValue2 = [
      { label: 'Week 1 --- Current Week', week: 'week1', completed: false, currentWeek: true },
      { label: 'Week 2', week: 'week2', completed: false, currentWeek: false },
    ];

    expect( getTrackProgramWeeks( state1 ) ).toEqual( expectedValue2 );

  } );

  it( 'getStartedTrackingByProgram() should return the started tracking date/timestamp for the selected program', () => {

    expect( getStartedTrackingByProgram( state ) )
      .toEqual( state.track.trackObject.attempts[ 0 ].startedTracking.seconds );

    // TODO need to mock scenario where I return unix timestamp for today
    // TODO need to be able to mock Moment.js for just this test

    // let state1 = { ...state };
    // state1.track.trackObject = newProgram;

    // expect( getStartedTrackingByProgram( state1 ) )
    //   .toEqual(  );

  } );

  it( 'getDaysForEachWeek() should return an object of weeks for a program that has all the day names as an array for each week', () => {
    const expectedValues = {
      'week1': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2  Completed',
          'completed': true,
        },
      ],
      'week2': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week3': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week4': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week5': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week6': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 2  Completed',
          'completed': true,
        },
      ],
      'week7': [
        {
          'label': 'Upper Body 1  Completed',
          'completed': true,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2',
          'completed': false,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week8': [
        {
          'label': 'Upper Body 1',
          'completed': false,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2',
          'completed': false,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week9': [
        {
          'label': 'Upper Body 1',
          'completed': false,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2',
          'completed': false,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
      'week10': [
        {
          'label': 'Upper Body 1',
          'completed': false,
        },
        {
          'label': 'Lower Body 1',
          'completed': false,
        },
        {
          'label': 'Upper Body 2',
          'completed': false,
        },
        {
          'label': 'Lower Body 2',
          'completed': false,
        },
      ],
    };
    expect( getDaysForEachWeek( state ) ).toEqual( expectedValues );
  } );

  it( 'getTrackSets() should return the trackable sets for both programs and workout', () => {
    const expectedValues = state.track.sets;

    expect( getTrackSets( state ) ).toEqual( expectedValues );
  } );

  it( 'getTrackType() should return whether we are tracking a program or workout', () => {
    const expectedValues = state.track.type;
    expect( getTrackType( state ) ).toEqual( expectedValues );
  } );

  it( 'getTrackSelectedInfo() should return the selected information', () => {
    const expectedValue = state.track.selected;
    expect( getTrackSelectedInfo( state ) ).toEqual( expectedValue );
  } );

  it( 'getTrackName() should return the name of the day the user is currently tracking', () => {
    const expectedValue = 'Upper Body 1';
    expect( getTrackDay( state ) ).toEqual( expectedValue );

    const expectedValue1 = 'Arm Day';
    expect( getTrackDay( workoutState ) ).toEqual( expectedValue1 );
  } );

  it( 'getTrackExercisesByDay() should return an array of exercises for the selected day for either a program or workout', () => {
    const expectedValue = state.track.exercises;
    expect( getTrackExercisesByDay( state ) ).toEqual( expectedValue );


    const expectedValue1 = workoutState.track.exercises;
    expect( getTrackExercisesByDay( workoutState ) ).toEqual( expectedValue1 );
  } );

  it( 'getPreviousExercisesByCount() should return the previous exercises by the count specified', () => {
    const options = { exercise: 'Barbell Bench Press', count: 5 };
    const expectedValue = [
      {
        'sets': 3,
        'weight': 225,
        'reps': 3,
        'trackedReps': [
          6,
          4,
          5,
        ],
        'trackedWeights': [
          235,
          235,
          230,
        ],
        'estimated1RM': 279,
        'estimated3RM': 255,
        'estimated5RM': 242,
        'estimated8RM': 224,
        'estimated10RM': 213,
        'trackedOn': '05/21/19',
      },
      {
        'sets': 7,
        'weight': 205,
        'reps': 7,
        'trackedReps': [
          3,
          3,
          3,
          3,
          3,
          3,
          3,
        ],
        'trackedWeights': [
          170,
          170,
          170,
          170,
          170,
          170,
          170,
        ],
        'estimated1RM': 186,
        'estimated3RM': 170,
        'estimated5RM': 161,
        'estimated8RM': 149,
        'estimated10RM': 142,
        'trackedOn': '05/18/19',
      },
      {
        'sets': 3,
        'weight': 225,
        'reps': 3,
        'trackedReps': [
          8,
          8,
          8,
        ],
        'trackedWeights': [
          195,
          195,
          195,
        ],
        'estimated1RM': 243,
        'estimated3RM': 222,
        'estimated5RM': 210,
        'estimated8RM': 195,
        'estimated10RM': 186,
        'trackedOn': '05/14/19',
      },
      {
        'sets': 2,
        'weight': 205,
        'reps': 2,
        'trackedReps': [
          6,
          6,
        ],
        'trackedWeights': [
          185,
          185,
        ],
        'estimated1RM': 219,
        'estimated3RM': 200,
        'estimated5RM': 190,
        'estimated8RM': 176,
        'estimated10RM': 167,
        'trackedOn': '05/11/19',
      },
      {
        'sets': 2,
        'weight': 225,
        'reps': 2,
        'trackedReps': [
          6,
          6,
        ],
        'trackedWeights': [
          185,
          185,
        ],
        'estimated1RM': 219,
        'estimated3RM': 200,
        'estimated5RM': 190,
        'estimated8RM': 176,
        'estimated10RM': 167,
        'trackedOn': '05/07/19',
      },
      {
        'sets': 3,
        'weight': 205,
        'reps': 3,
        'trackedReps': [
          4,
          4,
          4,
        ],
        'trackedWeights': [
          235,
          235,
          235,
        ],
        'estimated1RM': 264,
        'estimated3RM': 242,
        'estimated5RM': 229,
        'estimated8RM': 212,
        'estimated10RM': 202,
        'trackedOn': '05/04/19',
      },
    ];
    expect( getPreviousExercisesByCount( state, options ) )
      .toEqual( expectedValue );
  } );

  it( 'getMaxesInfoByExercise() should return max/PR related information for a given exercise', () => {
    const options = { exercise: 'Barbell Bench Press', count: 5 };
    const expectedValues = {
      'allTimeMaxes': {
        'estimated1RM': 279,
        'estimated3RM': 255,
        'estimated5RM': 242,
        'estimated8RM': 224,
        'estimated10RM': 213,
      },
      'allTimeMaxesDate': '05/21/19',
      'latestMaxes': {
        'estimated1RM': 279,
        'estimated3RM': 255,
        'estimated5RM': 242,
        'estimated8RM': 224,
        'estimated10RM': 213,
      },
      'latestMaxesDate': '05/21/19',
    };

    expect( getMaxesInfoByExercise( state, options ) ).toEqual( expectedValues );


    // simulate what happens when we have no completed exercises
    const state1 = {
      ...state,
      completedExercises: [],
    };

    expect( getMaxesInfoByExercise( state1, options ) ).toEqual( {} );
  } );

  // it( 'getTrackSaveInfo() should return exercises that are tracked inside the track reducer in a formatted array so we can save that information', () => {
  //   const expectedValues = [
  //
  //   ];
  //
  //   expect( getTrackSaveInfo( state ) ).toEqual( expectedValues );
  // } );


  describe( 'Saving Tracked Exercises related functions', () => {
    const trackedSets = [
      [
        { set: 1, weight: 100, reps: 8, previous: '' },
        { set: 2, weight: 100, reps: 8, previous: '' },
        { set: 3, weight: 100, reps: 8, previous: '' },
      ],
      [
        { set: 1, weight: 120, reps: 6, previous: '' },
        { set: 2, weight: 120, reps: 6, previous: '' },
        { set: 3, weight: 120, reps: 6, previous: '' },
      ],
      [
        { set: 1, weight: 140, reps: 7, previous: '' },
        { set: 2, weight: 140, reps: 7, previous: '' },
        { set: 3, weight: 140, reps: 7, previous: '' },
      ],
      [
        { set: 1, weight: 150, reps: 5, previous: '' },
        { set: 2, weight: 150, reps: 5, previous: '' },
        { set: 3, weight: 150, reps: 5, previous: '' },
      ],
      [
        { set: 1, weight: 200, reps: 3, previous: '' },
        { set: 2, weight: 200, reps: 3, previous: '' },
        { set: 3, weight: 200, reps: 3, previous: '' },
      ],
      [
        { set: 1, weight: 150, reps: 6, previous: '' },
        { set: 2, weight: 150, reps: 6, previous: '' },
        { set: 3, weight: 150, reps: 6, previous: '' },
      ],
    ];
    const state1 = {
      ...state,
      track: {
        ...state.track,
        trackObject: newProgram,
        sets: trackedSets,
      },
    };

    it( 'calculateActiveAttempt() should return an attempt string', () => {

      const expectedValue = 'test_program_attempt_1';
      expect( calculateActiveAttempt( state1 ) ).toEqual( expectedValue );


      const expectedValue1 = 'cutting_04_-_06_attempt_1';
      expect( calculateActiveAttempt( state ) ).toEqual( expectedValue1 );
    } );

    it( 'calcuateTrackedExercisesNumbers() should return an array of exercises with all math based properties it needs in order to save the tracked exercises', () => {
      const expectedValues = [
        {
          'exercise': 'Barbell Bench Press',
          'weight': 225,
          'compound': true,
          'isolation': false,
          'muscleGroup': 'Chest',
          'trackedWeights': [
            100,
            100,
            100,
          ],
          'trackedReps': [
            8,
            8,
            8,
          ],
          'totalVolume': 2400,
        },
        {
          'exercise': 'Barbell Curl',
          'weight': 60,
          'compound': false,
          'isolation': true,
          'muscleGroup': 'Biceps',
          'trackedWeights': [
            120,
            120,
            120,
          ],
          'trackedReps': [
            6,
            6,
            6,
          ],
          'totalVolume': 2160,
        },
        {
          'exercise': 'Cable Overhead Tricep Extension',
          'weight': 120,
          'compound': false,
          'isolation': true,
          'muscleGroup': 'Triceps',
          'trackedWeights': [
            140,
            140,
            140,
          ],
          'trackedReps': [
            7,
            7,
            7,
          ],
          'totalVolume': 2940,
        },
        {
          'exercise': 'Pull ups',
          'weight': 175,
          'compound': true,
          'isolation': false,
          'muscleGroup': 'Back',
          'trackedWeights': [
            150,
            150,
            150,
          ],
          'trackedReps': [
            5,
            5,
            5,
          ],
          'totalVolume': 2250,
        },
        {
          'exercise': 'Side Laterals',
          'weight': 20,
          'compound': false,
          'isolation': true,
          'muscleGroup': 'Shoulders',
          'trackedWeights': [
            200,
            200,
            200,
          ],
          'trackedReps': [
            3,
            3,
            3,
          ],
          'totalVolume': 1800,
        },
        {
          'exercise': 'Machine Bicep Curl',
          'weight': 90,
          'compound': false,
          'isolation': true,
          'muscleGroup': 'Biceps',
          'trackedWeights': [
            150,
            150,
            150,
          ],
          'trackedReps': [
            6,
            6,
            6,
          ],
          'totalVolume': 2700,
        },
      ];
      expect( calculateTrackedExerciseNumbers( state1 ) ).toEqual( expectedValues );
    } );


    // it( 'calculateTrackedExerciseProgramInfo() should return an array of exercises with all the program/workout related info in each exercise in order to save the tracked exercises', () => {
    //   const expectedValues = [
    //     {
    //       'exercise': 'Barbell Bench Press',
    //       'weight': 225,
    //       'compound': true,
    //       'isolation': false,
    //       'muscleGroup': 'Chest',
    //       'trackedWeights': [
    //         100,
    //         100,
    //         100,
    //       ],
    //       'trackedReps': [
    //         8,
    //         8,
    //         8,
    //       ],
    //       'totalVolume': 2400,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //     {
    //       'exercise': 'Barbell Curl',
    //       'weight': 60,
    //       'compound': false,
    //       'isolation': true,
    //       'muscleGroup': 'Biceps',
    //       'trackedWeights': [
    //         120,
    //         120,
    //         120,
    //       ],
    //       'trackedReps': [
    //         6,
    //         6,
    //         6,
    //       ],
    //       'totalVolume': 2160,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //     {
    //       'exercise': 'Cable Overhead Tricep Extension',
    //       'weight': 120,
    //       'compound': false,
    //       'isolation': true,
    //       'muscleGroup': 'Triceps',
    //       'trackedWeights': [
    //         140,
    //         140,
    //         140,
    //       ],
    //       'trackedReps': [
    //         7,
    //         7,
    //         7,
    //       ],
    //       'totalVolume': 2940,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //     {
    //       'exercise': 'Pull ups',
    //       'weight': 175,
    //       'compound': true,
    //       'isolation': false,
    //       'muscleGroup': 'Back',
    //       'trackedWeights': [
    //         150,
    //         150,
    //         150,
    //       ],
    //       'trackedReps': [
    //         5,
    //         5,
    //         5,
    //       ],
    //       'totalVolume': 2250,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //     {
    //       'exercise': 'Side Laterals',
    //       'weight': 20,
    //       'compound': false,
    //       'isolation': true,
    //       'muscleGroup': 'Shoulders',
    //       'trackedWeights': [
    //         200,
    //         200,
    //         200,
    //       ],
    //       'trackedReps': [
    //         3,
    //         3,
    //         3,
    //       ],
    //       'totalVolume': 1800,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //     {
    //       'exercise': 'Machine Bicep Curl',
    //       'weight': 90,
    //       'compound': false,
    //       'isolation': true,
    //       'muscleGroup': 'Biceps',
    //       'trackedWeights': [
    //         150,
    //         150,
    //         150,
    //       ],
    //       'trackedReps': [
    //         6,
    //         6,
    //         6,
    //       ],
    //       'totalVolume': 2700,
    //       'type': 'program',
    //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
    //       'dayName': 'Day 1',
    //       'trackedOn': '2019-05-29T19:57:34.386Z',
    //       'belongsTo': 'test_program_attempt_1',
    //       'name': 'Test Program',
    //       'day': 0,
    //       'week': 'week1',
    //     },
    //   ];
    //   expect( calculateTrackedExerciseProgramInfo( state1 ) )
    //     .toEqual( expectedValues );
    // } );

    it( 'getTrackDocumentId() should return firebase document id for the program whose exercises were just tracked', () => {
      const expectedValue = 'r1YwPJm87oVHFVdPfk9G';

      expect( getTrackDocumentId( state ) ).toEqual( expectedValue );
    } );

    it( 'getTrackSummaryData() should return the sets per exercises needed to show what was lifted on the track summary page', () => {
      const expectedValue = {
        exercises: [
          {
            exercise: 'Barbell Bench Press',
            sets: [
              { set: 1, weight: 100, reps: 8, previous: '' },
              { set: 2, weight: 100, reps: 8, previous: '' },
              { set: 3, weight: 100, reps: 8, previous: '' },
            ],
            totalReps: 24,
            totalVolume: 2400,
          },
          {
            exercise: 'Barbell Curl',
            sets: [
              { set: 1, weight: 120, reps: 6, previous: '' },
              { set: 2, weight: 120, reps: 6, previous: '' },
              { set: 3, weight: 120, reps: 6, previous: '' },
            ],
            totalReps: 18,
            totalVolume: 2160,
          },
          {
            exercise: 'Cable Overhead Tricep Extension',
            sets: [
              { set: 1, weight: 140, reps: 7, previous: '' },
              { set: 2, weight: 140, reps: 7, previous: '' },
              { set: 3, weight: 140, reps: 7, previous: '' },
            ],
            totalReps: 21,
            totalVolume: 2940,
          },
          {
            exercise: 'Pull ups',
            sets: [
              { set: 1, weight: 150, reps: 5, previous: '' },
              { set: 2, weight: 150, reps: 5, previous: '' },
              { set: 3, weight: 150, reps: 5, previous: '' },
            ],
            totalReps: 15,
            totalVolume: 2250,
          },
          {
            exercise: 'Side Laterals',
            sets: [
              { set: 1, weight: 200, reps: 3, previous: '' },
              { set: 2, weight: 200, reps: 3, previous: '' },
              { set: 3, weight: 200, reps: 3, previous: '' },
            ],
            totalReps: 9,
            totalVolume: 1800,
          },
          {
            exercise: 'Machine Bicep Curl',
            sets: [
              { set: 1, weight: 150, reps: 6, previous: '' },
              { set: 2, weight: 150, reps: 6, previous: '' },
              { set: 3, weight: 150, reps: 6, previous: '' },
            ],
            totalReps: 18,
            totalVolume: 2700,
          },
        ],
        workoutRepsTotal: 105,
        workoutVolumeTotal: 14250,
      };

      expect( getTrackSummaryData( state1 ) )
        .toEqual( expectedValue );
    } );

  } );





} );
