import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text }  from '../../Text';
import theme from "../../../styles/theme.style";
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  // Generic table header styling
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },

  bottomBorder: {
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
  },

  headerCellHeight: {
    height: 45
  },

  // Build Specfic table header styling
  headerCellPadding: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },

  exerciseHeaderCell: {
    justifyContent: 'flex-start',
    width: '35%'
  },

  standardHeaderCell: {
    justifyContent: 'center',
    alignItems:'flex-end',
    width: '20%',
  },

  smallHeaderCell: {
    justifyContent: 'center',
    alignItems:'flex-end',
    width: '15%',
  },

  lastHeaderCell: {
    paddingRight: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '10%',
  },
});


export const BuildingBuildTableHeader = () => {
  return (
    <View style={styles.row}>
      <View style={[
        styles.headerCellPadding,
        styles.bottomBorder,
        styles.headerCellHeight,
        styles.exerciseHeaderCell,
      ]}>
        <Text>Exercise</Text>
      </View>

      <View style={[
        styles.headerCellPadding,
        styles.bottomBorder,
        styles.headerCellHeight,
        styles.standardHeaderCell,
      ]}>
        <Text>Weight</Text>
      </View>

      <View style={[
        styles.headerCellPadding,
        styles.bottomBorder,
        styles.headerCellHeight,
        styles.smallHeaderCell,
      ]}>
        <Text>Sets</Text>
      </View>

      <View style={[
        styles.headerCellPadding,
        styles.bottomBorder,
        styles.headerCellHeight,
        styles.standardHeaderCell,
      ]}>
        <Text>Reps</Text>
      </View>

      <View style={[
        styles.headerCellPadding,
        styles.bottomBorder,
        styles.headerCellHeight,
        styles.lastHeaderCell,
      ]}>
        <Icon
          name="create"
          size={20}
          color={theme.EDIT_ICON_COLOR}
        />
      </View>
    </View>
  )
};



export default BuildingBuildTableHeader;



