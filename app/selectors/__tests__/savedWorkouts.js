import { getPrograms, getWorkouts } from '../savedWorkouts';


const state = {
  savedWorkouts: {
    programs: [ { name: 'my program' } ],
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

} );
