import { createSelector } from 'reselect';
import {
  getBuilding,
  getBuildingSelectedExercise, getBuildingSelectedExerciseObject,
  getExercisesBySelectedDay,
  getSelectedBuildObject
} from './building';
import { baseExerciseList } from '../config/baseExerciseList';


export const getExercises = state => state.exercisesNEW;

export const getSelectedMuscleGroup = createSelector(
  state => getExercises( state ),
  reducer => reducer.selectedMuscleGroup,
);

export const getClonedExerciseList = createSelector(
  state => getExercises( state ),
  reducer => reducer.exerciseList,
);

export const getSelectedExercises = createSelector(
  state => getExercises( state ),
  reducer => reducer.selectedExercises,
);

export const getSelectedExercisesByMuscleGroup = createSelector(
  state => getClonedExerciseList( state ),
  state => getSelectedMuscleGroup( state ),
  ( list, muscleGroup ) => list[ muscleGroup ],
);

export const haveCustomSetsBeenAdded = exercise => {
  const { weight, reps } = exercise;

  if ( weight.indexOf( '-' ) > -1 || reps.indexOf( '-' ) > -1 ) {
    return true;
  }

  return false;
};

export const getCustomSetExerciseSets = createSelector(
  state => getCustomSetExercise( state ),
  exercise => {
    const { weight, reps, sets, customSet } = exercise;
    const setTracking = [];
    const defaultSets = 3;

    if ( weight.indexOf( '-' ) === -1 ) {
      const length = ( sets === '' ) ? defaultSets : sets;

      for ( let i = 0; i < length; i += 1 ) {
        setTracking.push( {
          set: i + 1,
          weight,
          reps,
        } );
      }
    }
    else {
      for ( let i = 0; i < customSet.length; i += 1 ) {
        setTracking.push( {
          set: i + 1,
          weight: exercise.customSet[ i ].weight,
          reps: exercise.customSet[ i ].reps,
        } );
      }
    }

    return setTracking;
  }
);

export const getCustomSetExercise = createSelector(
  state => getBuildingSelectedExerciseObject( state ),
  exercise => exercise,
);

export const formatCustomSets = data => {
  const { sets, exercise } = data;

  function getRange( property, data ) {
    const filtered = data.map( item => parseInt( item[ property ], 10 ) );
    const allTheSame = filtered.every( ( value, i, arr ) => value === arr[ 0 ] );

    if ( allTheSame ) {
      return `${ filtered[ 0 ] }`;
    }

    const sorted = filtered.sort( ( a, b ) => a - b );
    return `${ sorted[ 0 ] }-${ sorted[ sorted.length - 1 ] }`;
  }

  const weightRange = getRange( 'weight', sets );
  const repRange = getRange( 'reps', sets );

  return {
    ...exercise,
    weight: weightRange,
    sets: `${ sets.length }`,
    reps: repRange,
    customSet: sets,
  }
};

export const getSortableExerciseList = createSelector(
  state => getExercisesBySelectedDay( state ),
  exercises => {
    const data = {};
    exercises.forEach( ( exercise, index ) => {
      data[ index + 1 ] = { name: exercise.name };
    } );

    return data;
  }
);

export const muscleGroupFormatCustomExercise = () => {
  return baseExerciseList.map( muscleGroup => { return { value: muscleGroup } } );
};
