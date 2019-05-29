import { getProgramByDocumentId, getPrograms, getWorkouts } from '../savedWorkouts';


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

} );
