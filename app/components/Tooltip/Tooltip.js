import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import BaseToolTip from 'react-native-walkthrough-tooltip';
import { Badge } from 'react-native-elements';
import theme from '../../styles/theme.style';


const styles = StyleSheet.create({
  container: {
    width: 25,
    height: 25,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  badge: {
    borderRadius: 50,
    width: 25,
    height: 25,
    backgroundColor: theme.PRIMARY_COLOR,
    padding: 0
  }
});

const Tooltip = ( { visibleState, close, open, text, containerStyling, placement } ) => (
  <View style={ [ styles.container, containerStyling ] }>
    <BaseToolTip
      animated
      backgroundColor='transparent'
      isVisible={ visibleState }
      content={ <Text>{ text }</Text> }
      placement={ placement || 'top' }
      onClose={ () => close() }
    >
      <TouchableOpacity onPress={ () => (visibleState) ? close() : open() }>
        <Badge
          value={ '?' }
          containerStyle={ styles.badge }
        />
      </TouchableOpacity>
    </BaseToolTip>
  </View>
);


Tooltip.propTypes = {
  containerStyling: PropTypes.object,
  visibleState: PropTypes.bool,
  close: PropTypes.func,
  open: PropTypes.func,
  text: PropTypes.string,
};


export default Tooltip;
