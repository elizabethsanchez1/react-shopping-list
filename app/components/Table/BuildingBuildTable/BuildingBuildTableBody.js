import React from 'react';
import { FlatList } from 'react-native';
import BuildingBuildRow from './BuildingBuildRow';
import PropTypes from "prop-types";



export const BuildingBuildTableBody = ( { items, customSet, checkIfCustom, updateField }) =>  (
  <FlatList
    data={ items }
    renderItem={ ( { item, index } ) => (
      <BuildingBuildRow
        exercise={ item.exercise }
        weight={ item.weight }
        sets={ item.sets }
        reps={ item.reps }
        updateField={ change => {
          change.exerciseLocation = index;
          updateField( change )
        } }
        customSet={ () => customSet( index ) }
        checkIfCustom={ () => checkIfCustom( item, index ) }
      />
    )
    }
    keyExtractor={ ( item, index ) => `${ item.exercise }${ index }` }
  />
);


BuildingBuildTableBody.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      exercise:  PropTypes.string,
      weight: PropTypes.string,
      sets: PropTypes.string,
      reps: PropTypes.string,
      compound: PropTypes.bool,
      isolation: PropTypes.bool,
      muscleGroup: PropTypes.string,
    })
  ),
  updateField: PropTypes.func,
  customSet: PropTypes.func,
  checkIfCustom: PropTypes.func,
};

export default BuildingBuildTableBody
