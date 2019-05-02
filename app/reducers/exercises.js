import { GET_PROFILE_SUCCESS } from "../constants/profile";
import {
  ADD_CUSTOM_EXERCISE,
  ADD_EXERCISES,
  GET_EXERCISES_REQUEST,
  GET_EXERCISES_SUCCESS,
  OPEN_EXERCISE_LIST, SELECT_MUSCLE_GROUP,
  STORE_EXERCISE_LIST, UPDATE_SELECTIONS
} from "../constants/exercises";
import { createSelector } from 'reselect';
import { baseExerciseList } from "../config/baseExerciseList";

const exerciseList = {};
baseExerciseList.forEach(exercise => {
  exerciseList[exercise] = [];
});


const initialState = {
  exercisesLoading: false,
  retrievedExercises: false,
  exerciseList,
  customExercises: '',
  selectedExercises: [],
  muscleGroupSelected: '',
};

export const retrievedExerciseList = state => state.exercises.retrievedExercises;
export const getMuscleGroupSelected = state => state.exercises.muscleGroupSelected;
export const getExerciseList = state => state.exercises.exerciseList;
export const getSelectedExercises = state => state.exercises.selectedExercises;
export const getCustomExercises = state => state.exercises.customExercises;

export const mergeExerciseLists = (customExercises, exerciseList) => {
  const exerciseListCopy = JSON.parse(JSON.stringify(exerciseList));

  customExercises.forEach(item => {
    exerciseListCopy[item.muscleGroup].push(item);
  });

  // order alphabetically
  Object.keys(exerciseListCopy).forEach(key => {
    exerciseListCopy[key].sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
  });

  return exerciseListCopy;
};

export const formatCustomExercises = (customExercises) => {
  return customExercises.map((item) => {
    let newItem = Object.assign({}, item);
    newItem.selected = false;
    newItem.compound = (item.type === 'Compound');
    newItem.isolation = (item.type === 'Isolation');
    delete newItem.type;

    return newItem;
  });
};

export const updateSelections = (locationIndex, muscleGroup, exerciseList, currentlySelected) => {
  const updatedExerciseList = JSON.parse(JSON.stringify(exerciseList));
  const selectedExercise = updatedExerciseList[muscleGroup][locationIndex];
  let updatedCurrentlySelected = [...currentlySelected];

  if (selectedExercise.selected) {
    selectedExercise.selected = false;

    updatedCurrentlySelected = currentlySelected.filter(item => {
      if (item.name !== selectedExercise.name) {
        return item
      }
    });
  }
  else if (!selectedExercise.selected) {
    selectedExercise.selected = true;
    updatedCurrentlySelected.push(selectedExercise);
  }

  return { updatedCurrentlySelected, updatedExerciseList };
};

export const clearSelectedValues = (exerciseList) => {
  const newList = JSON.parse(JSON.stringify(exerciseList));

  Object.keys(newList).forEach(muscleGroup => {
    newList[muscleGroup].forEach(exercise => {
      if (exercise.selected) {
        exercise.selected = false;
      }
    });
  });

  return newList;
};

export const addCustomExercise = (exercise, exerciseList) => {
  const newList = JSON.parse(JSON.stringify(exerciseList));

  const { name, muscleGroup, type } = exercise;
  const customExercise = {
    compound: (type === 'Compound'),
    isolation: (type === 'Isolation'),
    name,
    muscleGroup,
    selected: false,
  };

  newList[muscleGroup].push(customExercise);
  newList[muscleGroup].sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  return newList;
};

export default function exercises(state = initialState, action) {
  switch (action.type) {
    case ADD_CUSTOM_EXERCISE:
      return Object.assign({}, state, {
        exerciseList: addCustomExercise(action.payload.exercise, state.exerciseList),
        customExercises: (state.customExercises !== '')
                            ? [action.payload.exercise, ...state.customExercises]
                            : [action.payload.exercise],
      });

    case ADD_EXERCISES:
      return Object.assign({}, state, {
        exerciseList: clearSelectedValues(state.exerciseList),
        selectedExercises: [],
      });

    case GET_EXERCISES_REQUEST:
      return Object.assign({}, state, {
        exercisesLoading: true,
      });

    case GET_EXERCISES_SUCCESS:
      return Object.assign({}, state, {
        exercisesLoading: false,
        retrievedExercises: true,
      });

    case GET_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        customExercises: action.payload.customExercises,
      });

    case OPEN_EXERCISE_LIST:
      return Object.assign({}, state, {
        selectedExercises: [],
        muscleGroupSelected: '',
      });

    case SELECT_MUSCLE_GROUP:
      return Object.assign({}, state, {
        muscleGroupSelected: action.payload.muscleGroup,
      });

    case STORE_EXERCISE_LIST: {
      if (state.customExercises !== '') {
        const customExercises = formatCustomExercises(state.customExercises);
        const exerciseList = mergeExerciseLists(
          customExercises, action.payload.exerciseList
        );

        return Object.assign({}, state, {
          exerciseList,
        });
      }
      else {
        return Object.assign({}, state, {
          exerciseList: action.payload.exerciseList
        });
      }
    }

    case UPDATE_SELECTIONS: {
      const updatedObject = updateSelections(
        action.payload.locationIndex,
        state.muscleGroupSelected,
        state.exerciseList,
        state.selectedExercises
        );

      return Object.assign({}, state, {
        exerciseList: updatedObject.updatedExerciseList,
        selectedExercises: updatedObject.updatedCurrentlySelected,
      });
    }

    default:
      return state;
  }
}
