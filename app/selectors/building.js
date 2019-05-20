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
  return buildObject[ selectedWeek ][ dayIndex ].day;
};

export const getBuildObjectName = createSelector(
  state => getBuilding( state ),
  buildObject => buildObject.name,
);

export const getBuildSaveInfo = createSelector(
  state => getUid( state ),
  state => getSelectedBuildObject( state ),
  state => getBuildObjectName( state ),
  state => getType( state ),
  ( uid, buildObject, name, type ) => {
    return { userId: uid, [ type ]: buildObject, name, type };
  }
)

export const getExercisesBySelectedDay = createSelector(
  state => getSelectedBuildObject( state ),
  state => getBuildingSelectedWeek( state ),
  state => getBuildingSelectedDay( state ),
  ( buildObject, week, day ) => buildObject[ week ][ day ].exercises,
);

export const getBuildingSelectedExerciseObject = createSelector(
  state => getSelectedBuildObject( state ),
  state => getBuildingSelectedWeek( state ),
  state => getBuildingSelectedDay( state ),
  state => getBuildingSelectedExercise( state ),
  ( buildObject, week, day, exercise ) => buildObject[ week ][ day ].exercises[ exercise ],
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
