import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
  },
  leftDropdown: {
    width: '50%',
    paddingRight: 15,
  },
  rightDropdown: {
    width: '50%',
    paddingLeft: 15,
  },
} );

const BuildingBuildDropdown = ( { dropdown1Data, dropdown2Data, onChange } ) => {
  if ( dropdown1Data.length > 1 ) {
    return (
      <View style={ styles.container }>
        <Dropdown
          label="Copy from"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={ styles.leftDropdown }
          data={ dropdown1Data }
          onChangeText={ value => onChange( { copyFrom: value } ) }
        />
        <Dropdown
          label="Copy to"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={ styles.rightDropdown }
          data={ dropdown2Data }
          onChangeText={ value => onChange( { copyTo: value } ) }
        />
      </View>
    );
  }

  return null;
};

BuildingBuildDropdown.propTypes = {
  dropdown1Data: PropTypes.array,
  dropdown2Data: PropTypes.array,
  onChange: PropTypes.func,
};

export default BuildingBuildDropdown;
