import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import styles from './styles';
import theme from '../../styles/theme.style';

const BuildingBuildDropdown = (props) => {
  if (props.dropdown1Data.length > 1) {
    return (
      <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20}}>
        <Dropdown
          label="Copy from"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={{width: '50%', paddingRight: 15}}
          data={props.dropdown1Data}
          onChangeText={value => props.onChange({copyFrom: value})}
        />
        <Dropdown
          label="Copy to"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={{width: '50%', paddingLeft: 15}}
          data={props.dropdown2Data}
          onChangeText={value => props.onChange({copyTo: value})}
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
