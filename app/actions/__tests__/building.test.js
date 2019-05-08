import { addProgramAction, createProgramAction, editProgramAction, storeProgramConfigAction } from '../building';
import { EDIT_PROGRAM, ADD_PROGRAM, STORE_PROGRAM_CONFIG, CREATE_PROGRAM } from '../../constants/building';


describe( 'Building action creators', () => {

  it( 'editProgramAction() should dispatch EDIT_PROGRAM event', () => {
    const expectedAction = {
      type: EDIT_PROGRAM,
      payload: 1,
    };

    expect( editProgramAction( 1 ) )
      .toEqual( expectedAction );
  } );

  it( 'addProgramAction() should dispatch ADD_PROGRAM event', () => {
    const expectedAction = {
      type: ADD_PROGRAM,
      payload: 1,
    };

    expect( addProgramAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'storeProgramConfigAction() should dispatch STORE_PROGRAM_CONFIG event', () => {
    const expectedAction = {
      type: STORE_PROGRAM_CONFIG,
      payload: 1,
    };

    expect( storeProgramConfigAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'createProgramAction() should dispatch CREATE_PROGRAM event', () => {
    const expectedAction = {
      type: CREATE_PROGRAM,
      payload: undefined,
    };

    expect( createProgramAction() ).toEqual( expectedAction );
  } );

} );
