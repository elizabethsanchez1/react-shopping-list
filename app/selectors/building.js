import { createSelector } from 'reselect';
import { getUid } from './user';

export const calculateWeeksForDropdown = weeks => {

  if ( typeof weeks === 'number' ) {
    const dropdownWeeks = [];
    for ( let i = 0; i < weeks; i += 1 ) {
      dropdownWeeks.push( {
        value: `Week ${ i + 1 }`,
      } );
    }

    return dropdownWeeks;
  }

  return Object.keys( weeks ).map( ( week, index ) => {
    return { value: `Week ${ index + 1 }` };
  } );

};

export const computeDropdownWeeks = weeks => {
  const updatedWeeks = [ ...weeks ];
  updatedWeeks.unshift( { value: 'All Weeks' } );
  return updatedWeeks;
};

export const getBuilding = state => state.building;

export const getBuildingSelectedWeek = createSelector(
  state => getBuilding( state ),
  reducer => reducer.selectedWeek,
);

export const getBuildingSelectedDay = createSelector(
  state => getBuilding( state ),
  reducer => reducer.selectedDay,
);

export const getBuildingSelectedExercise = createSelector(
  state => getBuilding( state ),
  reducer => reducer.selectedExercise,
);

export const getBuildingDayTitle = ( state, dayIndex ) => {
  const buildObject = getSelectedBuildObject( state );
  const selectedWeek = getBuildingSelectedWeek( state );
  const type = getType( state );

  if ( type === 'program' ) {
    return buildObject[ selectedWeek ][ dayIndex ].day;
  }

  if ( type === 'workout' ) {
    return buildObject.day
  }

  return '';
};

export const getBuildObjectName = createSelector(
  state => getBuilding( state ),
  state => getType( state ),
  ( buildObject, type ) => {

    if ( type === 'program' ) {
      return buildObject.name;
    }

    if ( type === 'workout' ) {
      return buildObject.workout.day;
    }

    return '';
  },
);

export const getBuildEditFlag = createSelector(
  state => getBuilding( state ),
  buildObject => !!buildObject.editing,
)

export const getBuildDocumentId = createSelector(
  state => getBuilding( state ),
  buildObject => buildObject.documentId,
);

export const getBuildSaveInfo = createSelector(
  state => getUid( state ),
  state => getSelectedBuildObject( state ),
  state => getBuildObjectName( state ),
  state => getType( state ),
  state => getBuildEditFlag( state ),
  state => getBuildDocumentId( state ),
  ( uid, buildObject, name, type, editing, documentId ) => {

    if ( type === 'program' ) {
      return {
        userId: uid,
        [ type ]: buildObject,
        name,
        type,
        editing,
        documentId,
      };
    }

    if ( type === 'workout' ) {
      return {
        userId: uid,
        [ type ]: buildObject,
        type,
        editing,
        documentId,
      };
    }

    return null;
  }
)

export const getExercisesBySelectedDay = createSelector(
  state => getSelectedBuildObject( state ),
  state => getBuildingSelectedWeek( state ),
  state => getBuildingSelectedDay( state ),
  state => getType( state ),
  ( buildObject, week, day, type ) => {
    if ( type === 'program' ) {
      return buildObject[ week ][ day ].exercises;
    }

    if ( type === 'workout' ) {
      return buildObject.exercises;
    }

    return null;
  }
);

export const getBuildingSelectedExerciseObject = createSelector(
  state => getSelectedBuildObject( state ),
  state => getBuildingSelectedWeek( state ),
  state => getBuildingSelectedDay( state ),
  state => getBuildingSelectedExercise( state ),
  state => getType( state ),
  ( buildObject, week, day, exercise, type ) => {

    if ( type === 'program' ) {
      return buildObject[ week ][ day ].exercises[ exercise ];
    }

    if ( type === 'workout' ) {
      return buildObject.exercises[ exercise ];
    }

    return null;
  }
);

export const getSelectedBuildObject = createSelector(
  state => getBuilding( state ),
  state => getType( state ),
  ( reducer, type ) => {
    return reducer[ type ];
  },
);

export const getType = createSelector(
  state => getBuilding( state ),
  building => building.type,
);
