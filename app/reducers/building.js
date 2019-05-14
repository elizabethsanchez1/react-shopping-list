import {
  STORE_PROGRAM_CONFIG,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  CREATE_PROGRAM,
  UPDATE_DAY_TITLE, BUILD_EDIT_FIELD,
} from '../constants/building';
import { BUILDING_ADD_EXERCISES, OPEN_CUSTOM_SET, OPEN_EXERCISE_LIST, SAVE_CUSTOM_SET } from '../constants/exercises';

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

export const handleAddingExercises = ( state, action ) => {
  const { selectedWeek, selectedDay, program, type } = state;
  const updatedProgram = JSON.parse( JSON.stringify( program ) );

  const exercises = action.payload.map( item => {
    const { selected, ...otherExerciseProps } = item;
    return {
      ...otherExerciseProps,
      rpe: '',
      reps: '',
      sets: '',
      weight: '',
      type: 'standard',
    };
  } );

  updatedProgram[ selectedWeek ][ selectedDay ].exercises.push( ...exercises );
  return { ...state, [ type ]: updatedProgram };
};

export const handleDayNameUpdate = ( state, action ) => {
  const { selectedWeek, type } = state;
  const { text, index } = action.payload;

  const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );
  updatedBuildObject[ selectedWeek ][ index ].day = text;

  return {
    ...state,
    [ type ]: updatedBuildObject,
  };
};

export const handleEditField = ( state, action ) => {
  const { value, field, exerciseLocation, selectedDay } = action.payload;
  const { type, selectedWeek } = state;

  const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );

  updatedBuildObject[ selectedWeek ][ selectedDay ].exercises[ exerciseLocation ][ field ] = value;

  return {
    ...state,
    [ type ]: updatedBuildObject,
  };
};

export const handleStoringCustomSet = ( state, action ) => {
  const { selectedWeek, selectedDay, selectedExercise, type } = state;

  const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );

  updatedBuildObject[ selectedWeek ][ selectedDay ].exercises[ selectedExercise ] = action.payload;

  return {
    ...state,
    [ type ]: updatedBuildObject,
  };
};

const building = ( state = {}, action ) => {
  switch ( action.type ) {

    case ADD_PROGRAM:
      return {
        active: true,
        type: 'program',
        editing: false,
        selectedWeek: 'week1',
        selectedDay: 0,
      };

    case BUILDING_ADD_EXERCISES:
      return handleAddingExercises( state, action );

    case BUILD_EDIT_FIELD:
      return handleEditField( state, action );

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
        selectedWeek: 'week1',
        selectedDay: 0,
      };

    case OPEN_CUSTOM_SET:
      return {
        ...state,
        selectedDay: action.payload.dayIndex,
        selectedExercise: action.payload.exerciseIndex,
      };

    case OPEN_EXERCISE_LIST:
      return {
        ...state,
        selectedDay: action.payload,
      };

    case SAVE_CUSTOM_SET:
      return handleStoringCustomSet( state, action );

    case STORE_PROGRAM_CONFIG:
      return { ...state, ...action.payload };

    case UPDATE_DAY_TITLE:
      return handleDayNameUpdate( state, action );

    default: return state;
  }
};

export default building;
