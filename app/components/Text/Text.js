import React from 'react';
import PropTypes from 'prop-types';
import { Text as BaseText, StyleSheet } from 'react-native';
import theme from "../../../app/styles/theme.style";


const styles = StyleSheet.create({
  header: {
    fontSize: theme.FONT_SIZE_HEADERBAR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },
  standardText: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },
  small: {
    fontSize: theme.FONT_SIZE_SMALL,
  },
  medium: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  large: {
    fontSize: theme.FONT_SIZE_LARGE,
  },
  lightFontWeight: {
    fontWeight: theme.FONT_WEIGHT_LIGHT,
  },
  mediumFontWeight: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },
  boldFontWeight: {
    fontWeight: theme.FONT_WEIGHT_BOLD,
  }
});


// TODO: Font weight does not work for some reason???

const Text = ({ children, size, weight, textStyling }) => {
  let styleObject = { ...styles.standardText  };

  if ( size === 'small' ) {
    styleObject = { ...styleObject, ...styles.small };
  }

  if ( size === 'medium' ) {
    styleObject = { ...styleObject, ...styles.medium };
  }

  if ( size === 'large' ) {
    styleObject = { ...styleObject, ...styles.large };
  }

  if ( size === 'header' ) {
    styleObject = { ...styleObject, ...styles.header };
  }

  // if ( weight === 'light' ) {
  //   styleObject = { ...styleObject, ...styles.lightFontWeight }
  // }
  //
  // if ( weight === 'medium' ) {
  //   styleObject = { ...styleObject, ...styles.mediumFontWeight }
  // }
  //
  // if ( weight === 'bold' ) {
  //   styleObject = { ...styleObject, ...styles.boldFontWeight }
  // }

  styleObject = { ...styleObject, ...textStyling };

  return (
    <BaseText
      style={ styleObject }
    >
      { children }
    </BaseText>
  )
};

Text.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  textStyling: PropTypes.object,
};

export default Text;
