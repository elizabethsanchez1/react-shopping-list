import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import TrackSummaryRow from './TrackSummaryRow';

const TrackSummaryTableBody = ( { items } ) => (
  <FlatList
    data={ items }
    renderItem={ ( { item } ) => (
      <TrackSummaryRow
        set={ item.set }
        weight={ item.weight }
        reps={ item.reps }
        total={ item.weight * item.reps }
      />
    ) }
    keyExtractor={ ( item, index ) => `${ item.reps }${ index }` }
  />
);


TrackSummaryTableBody.propTypes = {
  items: PropTypes.array,
};

export default TrackSummaryTableBody;
