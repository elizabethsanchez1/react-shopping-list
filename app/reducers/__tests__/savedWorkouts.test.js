import savedWorkouts from '../savedWorkouts';
import { RECEIVED_SAVED_WORKOUTS } from '../../constants/savedWorkouts';


describe( 'savedWorkouts reducer logic', () => {

  it( 'should return initial empty state', () => {
    expect( savedWorkouts( {}, {} ) ).toEqual( {} );
  } );

  it( 'should store saved workouts properly in response to RECEIVED_SAVED_WORKOUTS event', () => {
    const expectedState = {
      programs: [
        {
          userId: 1,
          name: 'cutting program',
          type: 'program',
          documentId: 10,
          created: { nanoseconds: 624000000, seconds: 1538053752, formatted: '09/27/2018' },
        },
        {
          userId: 1,
          name: 'bulking program',
          type: 'program',
          documentId: 12,
          created: { seconds: 1546379755, nanoseconds: 558000000, formatted: '01/01/2019' },
        },
      ],
      workouts: [
        {
          userId: 1,
          name: 'arm day',
          type: 'workout',
          documentId: 15,
          created: { seconds: 1537630081, nanoseconds: 783999000, formatted: '09/22/2018' },
        },
      ],
    };

    const action = {
      type: RECEIVED_SAVED_WORKOUTS,
      payload: {
        savedWorkouts: [
          {
            userId: 1,
            name: 'cutting program',
            type: 'program',
            documentId: 10,
            created: { nanoseconds: 624000000, seconds: 1538053752 },
          },
          {
            userId: 1,
            name: 'bulking program',
            type: 'program',
            documentId: 12,
            created: { seconds: 1546379755, nanoseconds: 558000000 },
          },
          {
            userId: 1,
            name: 'arm day',
            type: 'workout',
            documentId: 15,
            created: { seconds: 1537630081, nanoseconds: 783999000 },
          },
        ],
      },
    };

    expect( savedWorkouts( {}, action ) ).toEqual( expectedState );

  } );

} );
