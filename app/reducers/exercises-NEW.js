import {
  BUILDING_ADD_EXERCISES,
  FILTER_EXERCISE_LIST,
  SELECT_EXERCISE,
  SELECT_MUSCLE_GROUP,
  SETUP_ADDING_EXERCISES,
} from '../constants/exercises';


/*
* TODO
*  currently deselecting an exercise does not update the add items
* at the top of the page on the exercise list page
* */
export const handleExerciseSelection = ( state, action ) => {
  const { selectedMuscleGroup, exerciseList, selectedExercises } = state;
  const { name } = action.payload;

  // handle updated the exerciseList
  const updatedSection = exerciseList[ selectedMuscleGroup ].map( exercise => {
    if ( exercise.name === name ) {
      return {
        ...action.payload,
        selected: ( !exercise.selected ),
      };
    }

    return exercise;
  } );

  // handle updating the selectedExercises
  const selectedExerciseNames = selectedExercises.map( exercise => exercise.name );
  let updatedSelections;

  if ( selectedExerciseNames.includes( name ) ) {
    const index = selectedExercises.findIndex( exercise => exercise.name === name );
    updatedSelections = [ ...selectedExercises ];
    updatedSelections.splice( index, 1 );
  }
  else {
    updatedSelections = [ ...state.selectedExercises, action.payload ];
  }

  return {
    ...state,
    selectedExercises: updatedSelections,
    exerciseList: {
      ...exerciseList,
      [ selectedMuscleGroup ]: [
        ...updatedSection,
      ],
    },
  };
};

const exercisesNEW = ( state = {}, action ) => {
  switch ( action.type ) {

    case SETUP_ADDING_EXERCISES:
      return {
        selectedExercises: [],
        exerciseList: action.payload,
      };

    case SELECT_EXERCISE:
      return handleExerciseSelection( state, action );

    case SELECT_MUSCLE_GROUP:
      return {
        ...state,
        selectedMuscleGroup: action.payload,
      };

    default: return state;
  }
};

export default exercisesNEW;
