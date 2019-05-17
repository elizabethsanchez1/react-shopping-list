import {
  STORE_PROGRAM_CONFIG,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  CREATE_PROGRAM,
  UPDATE_DAY_TITLE, BUILD_EDIT_FIELD, OPEN_DELETE_SCREEN, BUILD_DELETE_EXERCISE, COPY_BUILD_OBJECT, BUILD_CHANGE_WEEK,
} from '../constants/building';
import {
  BUILD_UPDATE_EXERCISE_ORDER,
  BUILDING_ADD_EXERCISES,
  OPEN_CUSTOM_SET,
  OPEN_EXERCISE_LIST,
  SAVE_CUSTOM_SET,
} from '../constants/exercises';

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

export const handleCopyingWeeks = ( state, action ) => {
  const { copyFrom, copyTo } = action.payload;
  const { type } = state;

  const formattedCopyFrom = copyFrom.replace( /\s/g, '' ).toLowerCase();
  const formattedCopyTo = copyTo.replace( /\s/g, '' ).toLowerCase();
  const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );
  const desiredData = JSON.parse( JSON.stringify(
    state[ type ][ formattedCopyFrom ],
  ) );

  if ( formattedCopyTo === 'allweeks' ) {
    Object.keys( updatedBuildObject ).forEach( week => {
      updatedBuildObject[ week ] = desiredData;
    } );
  }
  else {
    updatedBuildObject[ formattedCopyTo ] = desiredData;
  }

  return {
    ...state,
    [ type ]: updatedBuildObject,
  };
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

export const handleDeletingExercise = ( state, action ) => {
  const { selectedWeek, selectedDay, type } = state;
  const { deleteIndex } = action.payload;

  const updateBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );
  const { exercises } = updateBuildObject[ selectedWeek ][ selectedDay ];
  exercises.splice( deleteIndex, 1 );

  return {
    ...state,
    [ type ]: updateBuildObject,
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

export const handleExerciseReOrder = ( state, action ) => {
  const { type, selectedWeek, selectedDay } = state;
  const { newOrder } = action.payload;

  const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );
  const selectedExercises = updatedBuildObject[ selectedWeek ][ selectedDay ].exercises;

  updatedBuildObject[ selectedWeek ][ selectedDay ].exercises = newOrder.map( index => {
    return selectedExercises[ parseInt( index, 10 ) - 1 ];
  } );

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

    case COPY_BUILD_OBJECT:
      return handleCopyingWeeks( state, action );

    case BUILDING_ADD_EXERCISES:
      return handleAddingExercises( state, action );

    case BUILD_CHANGE_WEEK:
      return {
        ...state,
        selectedWeek: action.payload.replace( /\s/g, '' ).toLowerCase(),
      };

    case BUILD_DELETE_EXERCISE:
      return handleDeletingExercise( state, action );

    case BUILD_EDIT_FIELD:
      return handleEditField( state, action );

    case BUILD_UPDATE_EXERCISE_ORDER:
      return handleExerciseReOrder( state, action );

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
        ...action.payload,
      };

    case OPEN_DELETE_SCREEN:
      return {
        ...state,
        ...action.payload,
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
