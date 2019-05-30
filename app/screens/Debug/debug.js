import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledText } from '../../components/Text';
import Container from '../../components/Container/index';
import * as actions from '../../actions/track';
import theme from '../../styles/theme.style';
import Card from '../../components/Card/Card';
import {
  getTrackSummaryData,
} from '../../selectors/track';
import TrackSummaryTable from '../../components/Table/TrackSummaryTable/TrackSummaryTable';


const styles = StyleSheet.create( {
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  headerCell: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
  },
  cell: {
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardStyling: {
    marginBottom: 40,
  },
  totalsContainer: {
    flexDirection: 'row',
    paddingLeft:10,
    paddingRight: 10,
  },
  totals: { paddingLeft: 10 },
  summary: { marginBottom: 20 },
  button: {
    backgroundColor: 'transparent',
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 0,
  },
  buttonContainer: { marginLeft: 0 },
  icon: {
    marginRight: -5,
    marginLeft: -5,
    marginTop: -3,
  },
} );

const computedTotals = {
  'exercises': [
    {
      'exercise': 'Barbell Bench Press',
      'sets': [
        {
          'set': 1,
          'previous': '',
          'weight': '225',
          'reps': '10',
        },
        {
          'set': 2,
          'previous': '',
          'weight': '225',
          'reps': '9',
        },
      ],
      'totalReps': 19,
      'totalVolume': 4275,
    },
    {
      'exercise': 'Barbell Curl',
      'sets': [
        {
          'set': 1,
          'previous': '',
          'weight': '55',
          'reps': '9',
        },
        {
          'set': 2,
          'previous': '',
          'weight': '55',
          'reps': '11',
        },
      ],
      'totalReps': 20,
      'totalVolume': 1100,
    },
  ],
  'workoutRepsTotal': 39,
  'workoutVolumeTotal': 5375,
};


class TrackSummary extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <Button
          title="Dashboard"
          containerViewStyle={ styles.buttonContainer }
          buttonStyle={ styles.button }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          icon={ {
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: styles.icon,
          } }
          onPress={ () => navigation.navigate( 'TrackDashboard' ) }
        />
      ),
    };
  };

  render() {
    // console.log( 'Track SUmmary props: ', this.props );
    const { exercises, workoutRepsTotal, workoutVolumeTotal } = computedTotals;

    return (
      <Container>
        <ScrollView>
          <FlatList
            data={ exercises }
            renderItem={ ( { item } ) => (
              <Card>
                <StyledText>{ item.exercise }</StyledText>
                <TrackSummaryTable items={ item.sets } />

                <View style={ styles.totalsContainer }>
                  <StyledText>Totals: </StyledText>
                  <StyledText style={ styles.totals }>
                    { item.totalReps } reps
                  </StyledText>
                  <StyledText style={ styles.totals }>
                    { item.totalVolume} lbs
                  </StyledText>
                </View>
              </Card>
            ) }
            keyExtractor={ item => item.exercise }
          />

          <Card containerStyling={ styles.cardStyling }>
            <StyledText style={ styles.summary }>Workout Totals</StyledText>
            <View style={ styles.row }>
              <View style={ styles.headerCell }>
                <StyledText>Exercises</StyledText>
              </View>

              <View style={ styles.headerCell }>
                <StyledText>Reps</StyledText>
              </View>

              <View style={ styles.headerCell }>
                <StyledText>Weight</StyledText>
              </View>
            </View>

            <View style={ styles.row }>
              <View style={ styles.cell }>
                <StyledText>{ exercises.length}</StyledText>
              </View>

              <View style={ styles.cell }>
                <StyledText>{ workoutRepsTotal }</StyledText>
              </View>

              <View style={ styles.cell }>
                <StyledText>{ workoutVolumeTotal }</StyledText>
              </View>
            </View>

          </Card>
        </ScrollView>
      </Container>
    );
  }
}

TrackSummary.propTypes = {
  // track: PropTypes.object,
  // navigation: PropTypes.object,
  // actions: PropTypes.object,
  computedTotals: PropTypes.object,
};


export default TrackSummary;
