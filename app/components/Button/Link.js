import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  text: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.ACTIVE_TAB_COLOR,
  },
} );

const Link = ( { title, onPress } ) => {
  return (
    <Text style={ styles.text } onPress={ onPress }>
      { title }
    </Text>
  );
};

Link.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default Link;
