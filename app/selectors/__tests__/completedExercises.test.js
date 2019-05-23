// import { getCompletedExercises } from '../track';


import {
  getCompletedExercises,
  getCompletedExercisesByAttempt,
  getDaysCompletedByAttempt
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

    expect( getDaysCompletedByAttempt( state, attempt ) ).toEqual( expectedValue );
  } );

} );
