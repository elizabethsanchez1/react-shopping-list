import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import TableHeader from '../Shared/TableHeader';
import TrackSummaryTableBody from './TrackSummaryTableBody';

const styles = StyleSheet.create( {
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
} );

const TrackSummaryTable = ( { items, titles } ) => (
  <View style={ styles.table }>
    <View style={ { height: 45 } }>
      <TableHeader
        titles={ titles || [ 'Set', 'Weight', 'Reps', 'Total' ] }
      />
    </View>

    <View>
      <TrackSummaryTableBody
        items={ items }
      />
    </View>
  </View>
);

TrackSummaryTable.propTypes = {
  titles: PropTypes.arrayOf( PropTypes.string ),
  items: PropTypes.arrayOf(
    PropTypes.shape( {
      previous: PropTypes.string,
      reps: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
      set: PropTypes.number,
      weight: PropTypes.oneOfType( [ PropTypes.string, PropTypes.number ] ),
    } ),
  ),
};

export default TrackSummaryTable;
