import {
  STORE_BUILD_OBJECT_CONFIG,
  ADD_PROGRAM,
  EDIT_PROGRAM,
  CREATE_BUILD_OBJECT,
  UPDATE_DAY_TITLE,
  BUILD_EDIT_FIELD,
  OPEN_DELETE_SCREEN,
  BUILD_DELETE_EXERCISE,
  COPY_BUILD_OBJECT,
  BUILD_CHANGE_WEEK,
  ADD_WORKOUT,
} from '../constants/building';
import {
  BUILD_UPDATE_EXERCISE_ORDER,
  BUILDING_ADD_EXERCISES,
  OPEN_CUSTOM_SET,
  OPEN_EXERCISE_LIST,
  SAVE_CUSTOM_SET,
} from '../constants/exercises';

export const createProgramObject = state => {
  const { weeks, daysPerWeek, type, name } = state;

  if ( type === 'program' ) {
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
  }

  if ( type === 'workout' ) {
    const updateState = {
      ...state,
      workout: {
        completed: false,
        day: name,
        exercises: [],
      },
    };
    delete updateState.name;
    return updateState;
  }

  return state;
};

export const handleAddingExercises = ( state, action ) => {
  const { selectedWeek, selectedDay, type } = state;
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

  if ( type === 'program' ) {
    const updatedProgram = JSON.parse( JSON.stringify( state[ type ] ) );
    updatedProgram[ selectedWeek ][ selectedDay ].exercises.push( ...exercises );
    return {
      ...state,
      program: updatedProgram,
    };
  }

  if ( type === 'workout' ) {
    return {
      ...state,
      workout: {
        ...state.workout,
        exercises: [
          ...state.workout.exercises,
          ...exercises,
        ],
      },
    };
  }

  return null;
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

  if ( type === 'program' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state[ type ] ) );
    updatedBuildObject[ selectedWeek ][ index ].day = text;

    return {
      ...state,
      [ type ]: updatedBuildObject,
    };
  }

  if ( type === 'workout' ) {
    return {
      ...state,
      [ type ]: {
        ...state[ type ],
        day: text,
      },
    };
  }

  return state;
};

export const handleDeletingExercise = ( state, action ) => {
  const { selectedWeek, selectedDay, type } = state;
  const { deleteIndex } = action.payload;

  if ( type === 'program' ) {
    const updateBuildObject = JSON.parse( JSON.stringify( state.program ) );
    const { exercises } = updateBuildObject[ selectedWeek ][ selectedDay ];
    exercises.splice( deleteIndex, 1 );

    return {
      ...state,
      program: updateBuildObject,
    };
  }

  if ( type === 'workout' ) {
    const updateBuildObject = JSON.parse( JSON.stringify( state.workout ) );
    const { exercises } = updateBuildObject;
    exercises.splice( deleteIndex, 1 );

    return {
      ...state,
      workout: updateBuildObject,
    };
  }

  return state;
};

export const handleEditField = ( state, action ) => {
  const { value, field, exerciseLocation, selectedDay } = action.payload;
  const { type, selectedWeek } = state;

  if ( type === 'program' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state.program ) );
    updatedBuildObject[ selectedWeek ][ selectedDay ].exercises[ exerciseLocation ][ field ] = value;

    return {
      ...state,
      [ type ]: updatedBuildObject,
    };
  }

  if ( type === 'workout' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state.workout ) );
    updatedBuildObject.exercises[ exerciseLocation ][ field ] = value;

    return {
      ...state,
      workout: updatedBuildObject,
    };
  }

  return null;
};

export const handleExerciseReOrder = ( state, action ) => {
  const { type, selectedWeek, selectedDay } = state;
  const { newOrder } = action.payload;

  if ( type === 'program' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state.program ) );
    const selectedExercises = updatedBuildObject[ selectedWeek ][ selectedDay ].exercises;

    updatedBuildObject[ selectedWeek ][ selectedDay ].exercises = newOrder.map( index => {
      return selectedExercises[ parseInt( index, 10 ) - 1 ];
    } );

    return {
      ...state,
      program: updatedBuildObject,
    };
  }

  if ( type === 'workout' ) {
    const updateBuildObject = JSON.parse( JSON.stringify( state.workout ) );
    const selectedExercises = updateBuildObject.exercises;
    updateBuildObject.exercises = newOrder.map( index => {
      return selectedExercises[ parseInt( index, 10 ) - 1 ];
    } );

    return {
      ...state,
      workout: updateBuildObject,
    };
  }

  return state;
};

export const handleStoringCustomSet = ( state, action ) => {
  const { selectedWeek, selectedDay, selectedExercise, type } = state;

  if ( type === 'program' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state.program ) );
    updatedBuildObject[ selectedWeek ][ selectedDay ].exercises[ selectedExercise ] = action.payload;

    return {
      ...state,
      program: updatedBuildObject,
    };
  }

  if ( type === 'workout' ) {
    const updatedBuildObject = JSON.parse( JSON.stringify( state.workout ) );
    updatedBuildObject.exercises[ selectedExercise ] = action.payload;

    return {
      ...state,
      workout: updatedBuildObject,
    };
  }

  return null;
};

export const handleOpeningCustomSet = ( state, action ) => {
  const { type } = state;
  const { selectedDay, selectedExercise } = action.payload;

  if ( type === 'program' ) {
    return {
      ...state,
      selectedDay,
      selectedExercise,
    };
  }

  if ( type === 'workout' ) {
    return {
      ...state,
      selectedExercise,
    };
  }

  return null;
};

const building = ( state = {}, action ) => {
  switch ( action.type ) {

    case ADD_PROGRAM:
      return {
        type: 'program',
        editing: false,
        selectedWeek: 'week1',
        selectedDay: 0,
      };

    case ADD_WORKOUT:
      return {
        type: 'workout',
        editing: false,
      };

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

    case COPY_BUILD_OBJECT:
      return handleCopyingWeeks( state, action );

    case CREATE_BUILD_OBJECT:
      return createProgramObject( state );

    case EDIT_PROGRAM:
      return {
        ...state,
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
      return handleOpeningCustomSet( state, action );

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

    case STORE_BUILD_OBJECT_CONFIG:
      return { ...state, ...action.payload };

    case UPDATE_DAY_TITLE:
      return handleDayNameUpdate( state, action );

    default: return state;
  }
};

export default building;
