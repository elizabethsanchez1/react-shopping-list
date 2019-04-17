import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import Text from '../../Text/Text';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  standardCell: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


const TrackSummaryRow = ( { set, weight, reps, total } ) => (
  <View style={ styles.row }>
    <View style={ styles.standardCell }>
      <Text>{ set }</Text>
    </View>

    <View style={ styles.standardCell }>
      <Text>{ weight }</Text>
    </View>

    <View style={ styles.standardCell }>
      <Text>{ reps }</Text>
    </View>

    <View style={ styles.standardCell }>
      <Text>{ total }</Text>
    </View>
  </View>
);


TrackSummaryRow.propTypes = {
  set: PropTypes.number,
  weight: PropTypes.any,
  reps: PropTypes.any,
  total: PropTypes.any,
};

export default TrackSummaryRow;
