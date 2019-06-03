import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TableHeader from './TableHeader';
import ExerciseInputTableBody from './ExerciseInputTableBody';

const styles = StyleSheet.create( {
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
} );

const ExerciseInputTable = ( { items, titles, updateField, disableAutoJump } ) => (
  <View style={ styles.table }>
    <View style={ { height: 45 } }>
      <TableHeader
        titles={ titles || [ 'Set', 'Weight', 'Reps' ] }
      />
    </View>


    <View>
      <ExerciseInputTableBody
        items={ items }
        updateField={ ( change, index ) => updateField( change, index ) }
        disableAutoJump={ disableAutoJump }
      />
    </View>
  </View>
);

ExerciseInputTable.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape( {
      set: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
      reps: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
      weight: PropTypes.oneOfType( [
        PropTypes.string,
        PropTypes.number,
      ] ),
    } ),
  ),
  titles: PropTypes.array,
  updateField: PropTypes.func,
  disableAutoJump: PropTypes.bool,
};

export default ExerciseInputTable;
