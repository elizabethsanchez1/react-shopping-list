import { createSelector } from 'reselect';

export const getBuilding = state => state.building;

export const getType = createSelector(
  state => getBuilding( state ),
  building => building.type,
);

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

export const getSelectedBuildObject = createSelector(
  state => getBuilding( state ),
  state => getType( state ),
  ( reducer, type ) => {
    return reducer[ type ];
  },
);

export const getBuildingSelectedWeek = createSelector(
  state => getBuilding( state ),
  reducer => reducer.selectedWeek,
);


export const getBuildingDayTitle = ( state, dayIndex ) => {
  const buildObject = getSelectedBuildObject( state );
  const selectedWeek = getBuildingSelectedWeek( state );
  return buildObject[ selectedWeek ][ dayIndex ].day;
};
