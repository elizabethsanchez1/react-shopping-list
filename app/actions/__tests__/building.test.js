import {
  addProgramAction, buildEditFieldAction,
  createProgramAction,
  editProgramAction,
  storeProgramConfigAction,
  updateDayTitleAction
} from '../building';
import {
  EDIT_PROGRAM,
  ADD_PROGRAM,
  STORE_PROGRAM_CONFIG,
  CREATE_PROGRAM,
  UPDATE_DAY_TITLE, BUILD_EDIT_FIELD
} from '../../constants/building';


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

  it( 'updateDayTitleAction() should dispatch UPDATE_DAY_TITLE event', () => {
    const expectedAction = {
      type: UPDATE_DAY_TITLE,
      payload: 1,
    };

    expect( updateDayTitleAction( 1 ) ).toEqual( expectedAction );
  } );

  it( 'buildEditFieldAction() should dispatch BUILD_EDIT_FIELD event', () => {
    const expectedAction = {
      type: BUILD_EDIT_FIELD,
      payload: 1,
    };

    expect( buildEditFieldAction( 1 ) ).toEqual( expectedAction );
  } );

} );
