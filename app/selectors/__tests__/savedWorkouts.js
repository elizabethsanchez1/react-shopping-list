import { calculateProgramAttemptInfo, getProgramByDocumentId, getPrograms, getWorkouts } from '../savedWorkouts';
import { program, completedExercises, savedWorkouts, newProgram } from '../mockData/exampleData';


const state = {
  savedWorkouts: {
    programs: [
      { name: 'my program', documentId: 1 },
      { name: 'second program', documentId: 2 },
    ],
    workouts: [ { name: 'my workout' } ],
  },
};

describe( 'savedWorkouts selectors', () => {

  it( 'getPrograms() should return saved programs', () => {
    expect( getPrograms( state ) ).toEqual( state.savedWorkouts.programs );
  } );

  it( 'getWorkouts() should return saved workouts', () => {
    expect( getWorkouts( state ) ).toEqual( state.savedWorkouts.workouts );
  } );

  it( 'getProgramByDocumentId() should return the program with the matching document id', () => {
    expect( getProgramByDocumentId( state, 1 ) )
      .toEqual( state.savedWorkouts.programs[ 0 ] );
  } );

  describe( 'calculateProgramAttemptInfo() should return a program object with the attempt information filled out correctly for various scenarios', () => {
    const mockedDate = new Date( 2019, 5, 30 );
    const originalDate = Date;
    global.Date = jest.fn( () => mockedDate );
    global.Date.setDate = originalDate.setDate;


    it( 'should return no new attempt information since we are tracking under the same attempt', () => {
      const state1 = {
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
      const expectedValue = {
        update: false,
      };

      expect( calculateProgramAttemptInfo( state1 ) )
        .toEqual( expectedValue );
    } );

    it( 'should return new attempt information when we are tracking a new program for the first time', () => {
      const state1 = {
        track: {
          type: 'program',
          trackObject: newProgram,
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
        },
        completedExercises,
        savedWorkouts,
      };
      const activeAttempt = 'test_program_attempt_1';
      const attempts = [
        {
          attempt: 'test_program_attempt_1',
          startedTracking: new Date(),
          finishedTracking: '',
        },
      ];
      const expectedValue = {
        documentId: 'D1lGILCFQ3nnqIDeNsI0',
        update: true,
        program: {
          ...newProgram,
          activeAttempt,
          attempts,
        },
      };

      expect( calculateProgramAttemptInfo( state1 ) )
        .toEqual( expectedValue );
    } );

  } );

} );
