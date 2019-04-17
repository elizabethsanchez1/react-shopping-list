import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from './styles';

const StyledText = (props) => (
  <Text
    style={[styles.standardText, props.style]}
  >
    {props.children}
  </Text>
);


StyledText.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
};

export default StyledText;
