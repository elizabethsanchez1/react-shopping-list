import { trackSelectedDayAction, trackSelectedProgramAction, trackSelectedWorkoutAction } from '../../actions/track';
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
    };

    expect( track( {}, action ) ).toEqual( expectedState );
  } );

  it( 'trackSelectedDayAction() should dispatch TRACK_SELECTED_PROGRAM_DAY with the selected program information to compute the trackable sets to begin using on the tracker page', () => {
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
    };


    expect( track( previousState, action ) ).toEqual( expectedState );
  } );

} );
