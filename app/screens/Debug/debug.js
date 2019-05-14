import React, { Component } from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import Container from '../../components/Container';
import { PrimaryButton } from '../../components/Button/';
import theme from '../../styles/theme.style';


const styles = StyleSheet.create( {

  buttonBarContainer: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.ACTIVE_TAB_COLOR,
  },
} );


class Debug extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Text>Testing</Text>

        <Text style={ styles.text } onPress={() =>  console.log( 'clicked' ) }>
          Testing out link
        </Text>

        <View style={ {
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        } }>

          <PrimaryButton title="Add Item" />
          <PrimaryButton title="Delete Item" />
        </View>
      </Container>
    );
  }
}

export default Debug;
