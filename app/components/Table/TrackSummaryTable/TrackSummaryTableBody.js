import React from 'react';
import { FlatList } from 'react-native';
import TrackSummaryRow from './TrackSummaryRow';

const TrackSummaryTableBody = ( { items } ) => {
  return (
    <FlatList
      data={ items }
      renderItem={ ( { item, index } ) => (
          <TrackSummaryRow
            set={ item.set }
            weight={ item.weight }
            reps={ item.reps }
            total={ parseInt( item.weight ) * parseInt( item.reps ) }
          />
        )
      }
      keyExtractor={ ( item, index ) => `${ item.reps }${ index }` }
    />
  )
};


export default TrackSummaryTableBody
