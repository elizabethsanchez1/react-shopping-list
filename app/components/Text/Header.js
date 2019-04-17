import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

const Header = (props) => (
  <Text
    style={[styles.header, props.style]}
  >
    {props.children}
  </Text>
);

Header.propTypes = {
  children: PropTypes.any,
  style: PropTypes.any,
};

export default Header;
