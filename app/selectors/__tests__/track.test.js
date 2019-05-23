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
} from '../track';

import { program, completedExercises, savedWorkouts } from '../mockData/exampleData';

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
  },
  completedExercises,
  savedWorkouts,
};

const workoutState = {
  track: {
    type: 'workout',
    trackObject: {},
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

  it( 'markCompletedFlagsByDate() should mark a week completed if the start-end date of the week is less then the most recent monday', () => {
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
        'label': 'Week 7 --- Current Week',
        'week': 'week7',
        'completed': false,
        'currentWeek': true,
      },
      {
        'label': 'Week 8',
        'week': 'week8',
        'completed': false,
        'currentWeek': false,
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
    expect( markCompletedFlagsByDate( state ) ).toEqual( expectedValue );
  } );

  it( 'getActiveAttempt() should return the active attempt of the selected program', () => {
    expect( getActiveAttempt( state ) )
      .toEqual( state.track.trackObject.activeAttempt );
  } );

  it( 'getTrackProgramWeeks() should get an array of week object to display to the user so they can pick a week to track', () => {
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
        'label': 'Week 7 --- Current Week',
        'week': 'week7',
        'completed': false,
        'currentWeek': true,
      },
      {
        'label': 'Week 8',
        'week': 'week8',
        'completed': false,
        'currentWeek': false,
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
  } );

  it( 'getStartedTrackingByProgram() should return the started tracking date/timestamp for the selected program', () => {
    expect( getStartedTrackingByProgram( state ) ).toEqual( state.track.trackObject.attempts[ 0 ].startedTracking.seconds );
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

} );
