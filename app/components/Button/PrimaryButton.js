import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-native-elements';
import styles from '../Form/styles';
import theme from '../../styles/theme.style';

const PrimaryButton = (props) => {
  if (props.loading) {
    return (
      <Button
        large
        {...props}
        buttonStyle={[styles.primaryButton, props.buttonStyle]}
        fontFamily={
          (props.fontFamily) ? props.fontFamily : theme.PRIMARY_FONT_FAMILY
        }
        fontWeight={
          (props.fontWeight) ? props.fontWeight : theme.FONT_WEIGHT_MEDIUM
        }
        color={
          (props.disabled) ? theme.DISABLED_TEXT_COLOR  : theme.PRIMARY_FONT_COLOR
        }
        disabled={props.loading}
        title=""
      />
    );
  }


  return (
    <Button
      large
      buttonStyle={[styles.primaryButton, props.buttonStyle]}
      fontFamily={
        (props.fontFamily) ? props.fontFamily : theme.PRIMARY_FONT_FAMILY
      }
      fontSize={
        (props.fontSize) ? props.fontSize : theme.FONT_SIZE_LARGE
      }
      fontWeight={
        (props.fontWeight) ? props.fontWeight : theme.FONT_WEIGHT_MEDIUM
      }
      color={
        (props.disabled) ? theme.DISABLED_TEXT_COLOR  : theme.PRIMARY_FONT_COLOR
      }
      disabledStyle={styles.disabledStyle}
      disabledTextStyle={{color: 'blue'}}
      title={props.title}
      containerViewStyle={props.containerViewStyle}
      onPress={props.onPress}
      // fontWeight={[styles.fontWeight, props.fontWeight]}
    />
  );
};

PrimaryButton.propTypes = {
  buttonStyle: PropTypes.object,
  containerViewStyle: PropTypes.object,
  title: PropTypes.string,
  fontFamily: PropTypes.string,
  fontWeight: PropTypes.string,
  fontSize: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default PrimaryButton;
