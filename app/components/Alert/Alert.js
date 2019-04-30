import PropTypes from 'prop-types';
import React from 'react';
import { View, Alert as AlertBase } from 'react-native';


const Alert = ( { show, message } ) => {

  if ( show ) {
    AlertBase.alert( 'Error', message,
      [
        { text: 'OK', onPress: () => console.log( 'hit ok' ) },
      ],
    );
  }

  return (
    <View></View>
  );
};

Alert.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
};

export default Alert;
