import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Card as CardComponent } from 'react-native-elements';
import styles from './styles';

const LogsSelectedLogsCard = ( { title, label, value, inputChanged } ) => {
  return (
    <CardComponent containerStyle={ [styles.basicCard, styles.container] }>
      <View style={ styles.inputView }>
        <Text style={ styles.text }>{ title }</Text>
        <View style={ styles.inputSubView }>
          <TextInput
            keyboardType='decimal-pad'
            textAlign='center'
            style={ styles.inputStyles }
            defaultValue={ value }
            onEndEditing={ ( text ) => inputChanged( text.nativeEvent.text ) }
            returnKeyType="done"
          />
          {
            ( label === '"' )
              ? <Text style={ styles.inchesLabel }>{ label }</Text>
              : <Text style={ styles.text }>{ label }</Text>
          }
        </View>
      </View>
    </CardComponent>
  );
};


LogsSelectedLogsCard.propTypes = {
  containerStyling: PropTypes.object,
  title: PropTypes.string,
  label: PropTypes.string,
  inputChanged: PropTypes.func,
};


export default LogsSelectedLogsCard;
