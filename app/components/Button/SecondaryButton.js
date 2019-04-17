import PropTypes from 'prop-types';
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from '../Form/styles';

const SecondaryButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.secondaryButton, props.style]}
    >
      <Text style={styles.secondaryButtonText}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

SecondaryButton.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object,
  onPress: PropTypes.func,
};

export default SecondaryButton;
