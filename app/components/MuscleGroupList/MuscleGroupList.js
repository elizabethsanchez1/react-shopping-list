import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import Container from '../Container';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  titleContainer: {
    width: '30%',
    marginTop: 35,
  },
  title: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.ACCENT_YELLOW,
  },
  listContainer: {
    width: '70%',
    paddingLeft: 20,
  },
} );

const MuscleGroupList = ( {} ) => (
  <Container>
    <ScrollView>

      <View style={ styles.container }>

        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>Upper Body</Text>
        </View>

        <View style={ styles.listContainer }>

        </View>

      </View>

      <View style={ styles.container }>

        <View style={ styles.titleContainer }>
          <Text style={ styles.title }>Lower Body</Text>
        </View>

        <View style={ styles.listContainer }>

        </View>
      </View>

    </ScrollView>
  </Container>
);

MuscleGroupList.propTypes = {};

export default MuscleGroupList;
