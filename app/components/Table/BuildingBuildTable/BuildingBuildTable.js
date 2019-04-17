import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { BuildingBuildTableHeader } from './BuildingBuildTableHeader';
import { BuildingBuildTableBody } from './BuildingBuildTableBody';

const styles = StyleSheet.create({
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export const BuildingBuildTable = ( { items, updateField, customSet, checkIfCustom }) => (
  <View style={styles.table}>
    <View style={{ height: 45 }}>
      <BuildingBuildTableHeader />
    </View>


    <View>
      <BuildingBuildTableBody
        items={ items }
        updateField={ update => updateField( update ) }
        customSet={ index => customSet( index ) }
        checkIfCustom={ ( item, index ) => checkIfCustom( item, index ) }
      />
    </View>
  </View>
);

BuildingBuildTable.propTypes = {
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

export default BuildingBuildTable;
