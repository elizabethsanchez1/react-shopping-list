import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import PrimaryButton from './PrimaryButton';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 15,
  },
  buttonContainer: {
    marginLeft: 0,
    marginRight: 0,
  }
} );

const ButtonBar = ( { title1, onPress1, title2, onPress2 } ) => (
  <View style={ styles.container }>
    <PrimaryButton
      title={ title1 }
      onPress={ onPress1 }
      buttonStyle={ styles.button }
      containerViewStyle={ styles.buttonContainer }
    />

    <PrimaryButton
      title={ title2 }
      onPress={ onPress2 }
      buttonStyle={ styles.button }
      containerViewStyle={ styles.buttonContainer }
    />
  </View>
);

ButtonBar.propTypes = {
  title1: PropTypes.string,
  title2: PropTypes.string,
  onPress1: PropTypes.func,
  onPress2: PropTypes.func,
};

export default ButtonBar;
