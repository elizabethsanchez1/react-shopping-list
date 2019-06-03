import logs from '../logs';
import { logSelectDayAction, logUpdateWorkoutAction } from '../../actions/logs';

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

describe( 'logs reducer unit tests', () => {

  it( 'should return empty inital state', () => {
    expect( logs( {}, {} ) ).toEqual( {} );
  } );

  it( 'logSelectedDayAction() should dispatch LOG_SELECTED_DAY and pass in a date that was selected', () => {
    const data = {
      selectedDay: '5/21/2019',
      exercises: state.completedExercises,
    };
    const action = logSelectDayAction( data );

    const expectedState = {
      selectedDay: '5/21/2019',
      changedExercises: false,
      exercises: [
        {
          name: 'Side Laterals',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
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
      exercises: [
        {
          name: 'Side Laterals',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '10', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
    };
    const expectedState = {
      selectedDay: '5/21/2019',
      changedExercises: true,
      exercises: [
        {
          name: 'Side Laterals',
          sets: [
            { set: 1, reps: '10', weight: '25' },
            { set: 2, reps: '15', weight: '25' },
            { set: 3, reps: '10', weight: '25' },
          ],
        },
        {
          name: 'Barbell Curl',
          sets: [
            { set: 1, reps: '8', weight: '55' },
            { set: 2, reps: '8', weight: '55' },
            { set: 3, reps: '8', weight: '55' },
          ],
        },
      ],
    };;


    expect( logs( previousState, action ) ).toEqual( expectedState );
  } );

} );
