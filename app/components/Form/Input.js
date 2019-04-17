import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from './styles';
import theme from '../../styles/theme.style';

const Input = React.forwardRef((props, ref) => {
  return (
    <View style={[styles.viewContainer ,props.containerStyling]}>
      {
        (props.label !== undefined) &&
          <FormLabel>{props.label}</FormLabel>
      }
      <FormInput
        ref={ref}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.inputContainer}
        inputStyle={[styles.input, props.inputStyling]}
        placeholderTextColor='#A1A1A1'
        {...props}
      />
      {
        (props.errorMessage !== undefined) &&
          <FormValidationMessage labelStyle={styles.errorMessage}>
            {props.errorMessage}
          </FormValidationMessage>
      }
    </View>
  );
});


Input.propTypes = {
  label: PropTypes.any,
  containerStyling: PropTypes.object,
  errorMessage: PropTypes.string,
};

export default Input;
