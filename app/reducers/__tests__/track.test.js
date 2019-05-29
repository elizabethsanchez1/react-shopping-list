import {
  modifySetsAction, trackAddExerciseIndexAction, trackAddExercisesAction,
  trackEditFieldAction, trackRemoveExerciseAction,
  trackSelectedDayAction,
  trackSelectedProgramAction,
  trackSelectedWorkoutAction,
} from '../../actions/track';
import track from '../track';


describe( 'Track reducer unit tests', () => {

  it( 'trackSelectedProgramAction() should dispatch an TRACK_SELECTED_PROGRAM event that will setup the intital config info to start tracking', () => {
    const data = { program: true };
    const action = trackSelectedProgramAction( data );
    const expectedState = {
      type: 'program',
      trackObject: action.payload,
    };

    expect( track( {}, action ) ).toEqual( expectedState );
  } );

  it( 'trackSelectedWorkoutAction() should dispatch an TRACK_SELECTED_WORKOUT event that will setup the intital config info to start tracking', () => {
    const data = {
      'editing': false,
      'documentId': 'LGb5866MpxZne4fSz9Hc',
      'workout': {
        'day': 'Arm Day',
        'exercises': [
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
        'completed': false,
      },
      'created': {
        'seconds': 1558615180,
        'nanoseconds': 562000000,
        'formatted': '05/23/2019',
      },
      'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
      'type': 'workout',
    };
    const action = trackSelectedWorkoutAction( data );
    const expectedState = {
      type: 'workout',
      trackObject: {
        'editing': false,
        'documentId': 'LGb5866MpxZne4fSz9Hc',
        'workout': {
          'day': 'Arm Day',
          'exercises': [
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
          'completed': false,
        },
        'created': {
          'seconds': 1558615180,
          'nanoseconds': 562000000,
          'formatted': '05/23/2019',
        },
        'userId': 'JbdTa6ILGLRLecFAoWUB3sp9Stu1',
        'type': 'workout',
      },
      sets: [
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
    };

    expect( track( {}, action ) ).toEqual( expectedState );
  } );

  it( 'trackSelectedDayAction() should dispatch TRACK_SELECTED_PROGRAM_DAY and compute the trackable sets and store an array of exercises for the given day chosen', () => {
    const data = {
      week: 'week1',
      dayIndex: 0,
    };
    const action = trackSelectedDayAction( data );
    const previousState = {
      trackObject: {
        name: 'test',
        program: {
          week1: [
            {
              day: 'Upper Body 1',
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
              ],
            },
          ],
        },
      },
      type: 'program',
    };
    const expectedState = {
      trackObject: {
        name: 'test',
        program: {
          week1: [
            {
              day: 'Upper Body 1',
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
              ],
            },
          ],
        },
      },
      type: 'program',
      selected: {
        day: 0,
        week: 'week1',
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
      ],
    };


    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'trackEditFieldAction() should dispatch TRACK_EDIT_FIELD with an update for a particular set which we should be storing', () => {
    const data = {
      'field': 'reps',
      'value': '100',
      'set': 2,
      'index': 0,
    };
    const action = trackEditFieldAction( data );
    const previousState = {
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
      ],
    };
    const expectedState = {
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '100',
          },
        ],

      ],
    };

    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'modifySetsAction() should dispatch MODIFY_SETS and either signal to add or remove a sets in the payload', () => {
    const data = {
      index: 0,
      option: 'remove',
    };
    const action = modifySetsAction( data );
    const previousState = {
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
      ],
    };
    const expectedState = {
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
      ],
    };

    expect( track( previousState, action ) ).toEqual( expectedState );


    const data1 = {
      index: 0,
      option: 'add',
    };
    const action1 = modifySetsAction( data1 );
    const expectedState1 = {
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 3,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
      ],
    };

    expect( track( previousState, action1 ) ).toEqual( expectedState1 );
  } );

  it( 'trackAddExerciseIndexAction() should dispatch TRACK_ADD_EXERCISES_INDEX with a payload of a number that will be the index location that any added exercises will be inserted into', () => {
    const data = {
      exercise: 2,
    };
    const action = trackAddExerciseIndexAction( data );
    const previousState = {
      selected: { week: 'week1', day: 0 },
    };
    const expectedState = {
      selected: { week: 'week1', day: 0, exercise: 2 },
    };
    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'trackAddExercisesAction() should dispatch TRACK_ADD_EXERCISES with a payload of exercise(s) to add to the session that is currently being tracked', () => {
    const data = [
      {
        'compound': true,
        'name': 'Cable Bicep Curl',
        'muscleGroup': 'Biceps',
        'isolation': true,
        'selected': false,
      },
      {
        'compound': false,
        'exercise': 'Dumbbell Hammer Curl',
        'muscleGroup': 'Biceps',
        'isolation': true,
        'selected': false,
      },
    ];
    const action = trackAddExercisesAction( data );
    const previousState = {
      selected: { week: 'week1', day: 0, exercise: 0 },
      exercises: [
        { exercise: 'Barbell Bench Press', sets: 2 },
        { exercise: 'Barbell Curl', sets: 2 },
      ],
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
        ],
        [
          {
            'set': 1,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
        ],
      ],
    };
    const expectedState = {
      selected: { week: 'week1', day: 0, exercise: 0 },
      exercises: [
        { exercise: 'Barbell Bench Press', sets: 2 },
        {
          'exercise': 'Cable Bicep Curl',
          weight: '',
          reps: '',
          sets: '3',
          'isolation': true,
          'compound': true,
          'muscleGroup': 'Biceps',
        },
        {
          'compound': false,
          'exercise': 'Dumbbell Hammer Curl',
          'muscleGroup': 'Biceps',
          'isolation': true,
          reps: '',
          sets: '3',
          weight: '',
        },
        { exercise: 'Barbell Curl', sets: 2 },
      ],
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
        ],
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 3,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
        [
          {
            'set': 1,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '',
            'reps': '',
          },
          {
            'set': 3,
            'previous': '',
            'weight': '',
            'reps': '',
          },
        ],
        [
          {
            'set': 1,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
        ],
      ],
    };

    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

  it( 'trackRemoveExerciseAction() should dispatch TRACK_REMOVE_EXERCISE with a payload of an index value to remove that exercise', () => {
    const data = 1;
    const action = trackRemoveExerciseAction( data );
    const previousState = {
      exercises: [
        { exercise: 'Barbell Bench Press', sets: 2 },
        { exercise: 'Barbell Curl', sets: 2 },
      ],
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
        ],
        [
          {
            'set': 1,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '150',
            'reps': '',
          },
        ],
      ],
    };
    const expectedState = {
      exercises: [
        { exercise: 'Barbell Bench Press', sets: 2 },
      ],
      sets: [
        [
          {
            'set': 1,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
          {
            'set': 2,
            'previous': '',
            'weight': '100',
            'reps': '',
          },
        ],
      ],
    };

    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

} );
