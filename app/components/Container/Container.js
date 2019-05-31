import PropTypes from 'prop-types';
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  view: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND,
  },
  scrollView: {
    flex: 1,
    backgroundColor: theme.PRIMARY_BACKGROUND,
  },

  altScrollView: {
    backgroundColor: theme.SECONDARY_BACKGROUND,
  },

  altView: {
    backgroundColor: theme.SECONDARY_BACKGROUND,
  },
} );

const Container = ( { scroll, children, alt, containerStyling } ) => {
  if ( alt === true && scroll === true ) {
    return (
      <ScrollView
        contentContainerStyle={ [ styles.altScrollView, containerStyling ] }
        // {...props}
      >
        {children}
      </ScrollView>
    );
  }

  if ( scroll === true ) {
    return (
      <ScrollView
        contentContainerStyle={ [ styles.scrollView, containerStyling ] }
        // {...props}
      >
        {children}
      </ScrollView>
    );
  }


  if ( alt === true ) {
    return (
      <View
        style={ [ styles.altView, containerStyling ] }
        // {...props}
      >
        {children}
      </View>
    );
  }


  return (
    <View
      style={ [ styles.view, containerStyling ] }
      // {...props}
    >
      {children}
    </View>
  );
};

Container.propTypes = {
  alt: PropTypes.bool,
  containerStyling: PropTypes.object,
  scroll: PropTypes.bool,
  children: PropTypes.any,
};

export default Container;
