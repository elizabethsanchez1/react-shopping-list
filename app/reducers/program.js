import {
  FETCH_COMPLETED_EXERCISES_REQUEST,
  FETCH_SAVED_WORKOUTS_SUCCESS,
} from "../constants/workoutsApi";
import { createSelector } from 'reselect';
import {
  ADD_PROGRAM,
  CREATE_PROGRAM_OBJECT,
  EDIT_FIELD,
  EDIT_PROGRAM,
  PROGRAM_CHANGE_WEEK, PROGRAM_COPY_WEEK,
  PROGRAM_DELETE_EXERCISE, PROGRAM_OPEN_CUSTOM_SET,
  PROGRAM_OPEN_DELETE, PROGRAM_SAVE_CUSTOM_SET,
  PROGRAM_SAVE_ORDER,
  PROGRAM_UPDATE_DAY,
  SORT_EXERCISES,
  STORE_PROGRAM_CONFIG,
} from "../constants/program";
import { ADD_WORKOUT } from "../constants/workout";
import { ADD_EXERCISES, OPEN_EXERCISE_LIST } from "../constants/exercises";
import moment from 'moment'

const initialState = {
  // shared
  active: false,            // will replace workout workoutType
  workoutType: '',          // todo do we really still need this flag?

  weeks: '',
  daysPerWeek: '',
  name: '',
  schedule: '',             // not currently used
  template: '',             // not currently used

  // Creating
  savedPrograms: {},
  weekSelected: 'week1',   // Always the default ???/
  daySelected: 0,
  program: {},

  // Editing
  editing: '',               // is really even needed
  customSetIndex: '',
  isLoading: false,
};


export const getPrograms = createSelector(
  state => state.program.savedPrograms,
  (programs) => programs,
);



export const addExercises = (selectedExercises, weekSelected, daySelected, program) => {
  console.log('addExercises fired in the program reducer');
  const formattedExercises = formatExerciseData(selectedExercises);
  const updatedProgram = JSON.parse(JSON.stringify(program));

  updatedProgram[weekSelected][daySelected].exercises.push(...formattedExercises);

  return updatedProgram;
};

export const copyWeek = (programState, copyfrom, copyTo) => {
  const updatedProgram = JSON.parse(JSON.stringify(programState.program));
  let desiredExercises = JSON.parse(JSON.stringify(updatedProgram[copyfrom]));

  if (copyTo !== 'allweeks') {
    updatedProgram[copyTo] = desiredExercises;
  } else {
    Object.keys(updatedProgram).forEach(key => {
      updatedProgram[key] = desiredExercises;
    })
  }

  return updatedProgram;
};

export const deleteExercise = (exerciseIndex, program, weekSelected, daySelected) => {
  const updatedProgram = JSON.parse(JSON.stringify(program));
  const exercises = updatedProgram[weekSelected][daySelected].exercises;
  exercises.splice(exerciseIndex, 1);

  return updatedProgram;
};

export const editField = (program, weekSelected, fieldUpdate) => {
  const updatedProgram = JSON.parse(JSON.stringify(program));
  const { daySelected, exerciseLocation, field, value} = fieldUpdate;

  updatedProgram[weekSelected][daySelected].exercises[exerciseLocation][field] = value;

  return updatedProgram;
};

export const formatExerciseData = (exercises) => {
  return exercises.map(item => {
    return {
      exercise: item.name,
      reps: '',
      sets: '',
      weight: '',
      muscleGroup: item.muscleGroup,
      compound: (item.compound === true),
      isolation: (item.isolation === true),
    }
  });
};

export const mergeCustomSet = (customSet, programState) => {
  const { program, weekSelected, daySelected, customSetIndex } = programState;
  const updatedProgram = JSON.parse(JSON.stringify(program));

  updatedProgram[weekSelected][daySelected].exercises.splice(customSetIndex, 1, customSet);

  return updatedProgram;
};

// export const updateDay = (programState, name, daySelected) => {
//   const { program, weekSelected } = programState;
//   const programCopy = JSON.parse(JSON.stringify(program));
//   programCopy[weekSelected][daySelected].day = name;
//   return programCopy;
// };


export const updateDay = (state, action) => {
  const { program, weekSelected } = state;
  const { name, daySelected } = action.payload;
  const programCopy = JSON.parse(JSON.stringify(program));

  // const previousText = programCopy[weekSelected][daySelected].day;

  programCopy[weekSelected][daySelected].day = name;

  return {
    ...state,
    program: programCopy,
  };


  // return state;
};



export const updateExerciseOrder = (newOrder, weekSelected, daySelected, program) => {
  const updatedProgram = JSON.parse(JSON.stringify(program));

  const selectedExercises = updatedProgram[weekSelected][daySelected].exercises;
  const reOrderedExercises = [];

  newOrder.forEach(item => {
    const selectedItem = selectedExercises.slice(parseInt(item), parseInt(item) + 1);
    reOrderedExercises.push(...selectedItem);
  });

  updatedProgram[weekSelected][daySelected].exercises = reOrderedExercises;

  return updatedProgram;
};

export const processSavedPrograms = ( state, action ) => {
  const savedPrograms = action.payload.programs.map( program => {
    let temp = { ...program };

    temp.created = {
      date: moment( moment.unix( program.created.seconds ) ).format( "MM/DD/YYYY" ),
      timestamp: program.created,
    };

    return temp;
  } );

  return {
    ...state,
    savedPrograms,
  }
};


function editProgram(state, action) {

  switch(action.type) {
    case ADD_EXERCISES: {
      const updatedProgram = addExercises(
        action.payload.selectedExercises,
        state.weekSelected,
        state.daySelected,
        state.program,
      );
      return Object.assign({}, state, {
        program: updatedProgram,
      });
    }

    case EDIT_FIELD:
      return Object.assign({}, state, {
        program: editField(
                  state.program,
                  state.weekSelected,
                  action.payload.update)
      });

    case EDIT_PROGRAM: {
      const programCopy = JSON.parse(JSON.stringify(action.payload.program));

      return {
        ...state,
        active: true,
        workoutType: 'program',
        program: programCopy,
        editing: true,
        weeks: Object.keys(programCopy).length,
        daysPerWeek: programCopy.week1.length,
        name: action.payload.name,
        weekSelected: 'week1',
        daySelected: 0,
      }
    }

    case OPEN_EXERCISE_LIST:
      return Object.assign({}, state, {
        daySelected: action.payload.daySelected,
      });

    case PROGRAM_COPY_WEEK:
      return Object.assign({}, state, {
        program: copyWeek(state, action.payload.copyFrom, action.payload.copyTo),
      });

    case PROGRAM_CHANGE_WEEK:
      return Object.assign({}, state, {
        weekSelected: action.payload.week.replace(/\s/g, '').toLowerCase()
      });

    case PROGRAM_DELETE_EXERCISE:
      return Object.assign({}, state, {
        program: deleteExercise(
                  action.payload.exerciseIndex,
                  state.program,
                  state.weekSelected,
                  state.daySelected)
      });

    case PROGRAM_OPEN_CUSTOM_SET:
      return Object.assign({}, state, {
        daySelected: action.payload.daySelected,
        customSetIndex: action.payload.exerciseSelected,
      });

    // case PROGRAM_UPDATE_DAY:
    //   return Object.assign({}, state, {
    //     program: updateDay(
    //               state,
    //               action.payload.name,
    //               action.payload.daySelected,
    //             ),
    //   });
    case PROGRAM_UPDATE_DAY:
      return updateDay(state, action);




    case PROGRAM_SAVE_CUSTOM_SET:
      return Object.assign({}, state, {
        program: mergeCustomSet(
                  action.payload.customSet,
                  state
                  )
      });

    case PROGRAM_SAVE_ORDER:
      return Object.assign({}, state, {
        program: updateExerciseOrder(
                  action.payload.newOrder,
                  state.weekSelected,
                  state.daySelected,
                  state.program),
      });

    case SORT_EXERCISES:
      return Object.assign({}, state, {
        daySelected: action.payload.daySelected,
      });


    default:
      return state;
  }
}





// creating specific reducer logic
export default function program(state = initialState, action) {

  switch(action.type) {
    case ADD_EXERCISES: {
      /*
       TODO:REMEMBER this is dependent on exercises reducer happening after this one since it handled clearing out the selected exercises
      */
      if (state.active) {
        return editProgram(state, action);
      }
      else {
        return state;
      }
    }

    case ADD_WORKOUT:
      return Object.assign({}, state, {
        active: false,
      });

    case FETCH_COMPLETED_EXERCISES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case EDIT_FIELD: {
      if (state.active) {
        return editProgram(state, action);
      }
      else {
        return state;
      }
    }

    case FETCH_SAVED_WORKOUTS_SUCCESS:
      return processSavedPrograms( state, action );

    case OPEN_EXERCISE_LIST: {
      if (state.active) {
        return editProgram(state, action);
      }
      else {
        return state;
      }
    }

    case PROGRAM_OPEN_DELETE:
      return Object.assign({}, state, {
        daySelected: action.payload.daySelected,
      });

    case PROGRAM_CHANGE_WEEK:
      return editProgram(state, action);

    case PROGRAM_COPY_WEEK:
      return editProgram(state, action);

    case PROGRAM_DELETE_EXERCISE:
      return editProgram(state, action);

    case PROGRAM_OPEN_CUSTOM_SET:
      return editProgram(state, action);

    case PROGRAM_UPDATE_DAY:
      return editProgram(state, action);

    case PROGRAM_SAVE_CUSTOM_SET:
      return editProgram(state, action);

    case PROGRAM_SAVE_ORDER:
      return editProgram(state, action);


    case SORT_EXERCISES: {
      if (state.active) {
        return editProgram(state, action);
      }
      else {
        return state;
      }
    }

    default:
      return state;
  }
}



