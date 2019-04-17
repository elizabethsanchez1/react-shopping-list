import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types';
import Text  from '../../Text/Text';
import theme from "../../../styles/theme.style";

const styles = StyleSheet.create({
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    height: 45,
  },
  flexHeaderCell: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems:'center',
    flex: 1,
    height: 45,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
  },
});

const TableHeader = ( { titles } ) => {
  return (
    <View style={ styles.row }>
      {
        titles.map( title => (
          <View
            key={ title }
            style={ styles.flexHeaderCell }
          >
            <Text style={ styles.text }>{ title }</Text>
          </View>
        ) )
      }
    </View>
  )
};

TableHeader.propTypes = {
  titles: PropTypes.array,
};

export default TableHeader;


