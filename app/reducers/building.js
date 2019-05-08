import { STORE_PROGRAM_CONFIG, ADD_PROGRAM, EDIT_PROGRAM, CREATE_PROGRAM } from '../constants/building';

export const createProgramObject = state => {
  const { weeks, daysPerWeek } = state;
  const program = {};

  for ( let i = 0; i < parseInt( weeks, 10 ); i += 1 ) {
    program[ `week${ i + 1 }` ] = [];

    for ( let j = 0; j < parseInt( daysPerWeek, 10 ); j += 1 ) {
      program[ `week${ i + 1 }` ].push( {
        completed: false,
        day: `Day ${ j + 1 }`,
        exercises: [],
      } );
    }
  }

  return { ...state, program };
};

const building = ( state = {}, action ) => {
  switch ( action.type ) {

    case ADD_PROGRAM:
      return {
        ...state,
        active: true,
        type: 'program',
        editing: false,
        selectedWeek: 'week1',
        selectedDay: 0,
      };

    case CREATE_PROGRAM:
      return createProgramObject( state );

    case EDIT_PROGRAM:
      return {
        ...state,
        active: true,
        type: 'program',
        program: JSON.parse( JSON.stringify( action.payload ) ),
        editing: true,
        weeks: Object.keys( action.payload ).length,
        daysPerWeek: action.payload.week1.length,
        name: action.payload.name,
        weekSelected: 'week1',
        daySelected: 0,
      };

    case STORE_PROGRAM_CONFIG:
      return { ...state, ...action.payload };


    default: return state;
  }
};

export default building;
