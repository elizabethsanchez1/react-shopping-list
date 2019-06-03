import {
  getCompletedExercises,
  getCompletedExercisesByAttempt, getCompletedExercisesByDay,
  getDaysCompletedByAttempt,
} from '../completedExercises';

const state = {
  completedExercises: [
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 0,
    },
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 0,
    },
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 1,
    },
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 1,
    },
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 2,
    },
    {
      'week': 'week1',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 3,
    },
    {
      'week': 'week2',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 0,
    },
    {
      'week': 'week2',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 1,
    },
    {
      'week': 'week2',
      'belongsTo': 'maintenance_01-04_attempt_1',
      'day': 1,
    },
  ],
};

const altState = {
  logs: {
    selectedDay: '05/21/2019',
  },
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
};

describe( 'completedExercises selectors', () => {

  it( 'getCompletedExercises() should return the exercises in the completedExercises reducer', () => {
    expect( getCompletedExercises( state ) )
      .toEqual( state.completedExercises );
  } );

  it( 'getCompletedExercisesByAttempt() should return only the exercises for the given attempt passed in', () => {
    const attempt = 'maintenance_01-04_attempt_1';
    expect( getCompletedExercisesByAttempt( state, attempt ) )
      .toEqual( state.completedExercises );
  } );

  it( 'getDaysCompletedByAttempt() should return an object with all the weeks so far completed and a total count for how many days each week has completed already', () => {
    const attempt = 'maintenance_01-04_attempt_1';
    const expectedValue = {
      'week1': 4,
      'week2': 2,
    };

    expect( getDaysCompletedByAttempt( state, attempt ) )
      .toEqual( expectedValue );
  } );

  // it( 'getCompletedExercisesByDay() should return the completed exercises for the given date passed in', () => {
  //   const expectedValues = [
  //     {
  //       'week': 'week7',
  //       'weight': 20,
  //       'trackedOn': {
  //         'seconds': 1558478036,
  //         'nanoseconds': 734999000,
  //       },
  //       'totalVolume': 750,
  //       'trackedWeights': [
  //         25,
  //         25,
  //         25,
  //       ],
  //       'estimated1RM': 33,
  //       'estimated8RM': 26,
  //       'totalReps': 30,
  //       'belongsTo': 'cutting_04_-_06_attempt_1',
  //       'exercise': 'Side Laterals',
  //       'day': 0,
  //       'estimated12RM': 24,
  //       'trackedReps': [
  //         10,
  //         10,
  //         10,
  //       ],
  //       'type': 'program',
  //       'estimated3RM': 30,
  //       'estimated10RM': 25,
  //       'program': 'Cutting 04 - 06',
  //       'dayName': 'Upper Body 1',
  //       'estimated5RM': 29,
  //       'muscleGroup': 'Shoulders',
  //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
  //     },
  //     {
  //       'week': 'week7',
  //       'weight': 60,
  //       'trackedOn': {
  //         'seconds': 1558478036,
  //         'nanoseconds': 734999000,
  //       },
  //       'totalVolume': 1320,
  //       'trackedWeights': [
  //         55,
  //         55,
  //         55,
  //       ],
  //       'estimated1RM': 69,
  //       'estimated8RM': 55,
  //       'totalReps': 24,
  //       'belongsTo': 'cutting_04_-_06_attempt_1',
  //       'exercise': 'Barbell Curl',
  //       'day': 0,
  //       'estimated12RM': 50,
  //       'trackedReps': [
  //         8,
  //         8,
  //         8,
  //       ],
  //       'type': 'program',
  //       'estimated3RM': 63,
  //       'estimated10RM': 53,
  //       'program': 'Cutting 04 - 06',
  //       'dayName': 'Upper Body 1',
  //       'estimated5RM': 60,
  //       'muscleGroup': 'Biceps',
  //       'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
  //     }
  //   ];
  //
  //
  //   expect( getCompletedExercisesByDay( altState ) )
  //     .toEqual( expectedValues );
  // } );

} );
