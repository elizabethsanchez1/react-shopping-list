import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import Container from '../../components/Container/index';
import { StyledText } from '../../components/Text';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/track';
import theme from '../../styles/theme.style';
// import  Tooltip  from 'react-native-walkthrough-tooltip';
import Tooltip from '../../components/Tooltip/Tooltip';
import TrackExerciseHistoryTable from '../../components/Table/TrackExerciseHistoryTable';
import moment from 'moment'
import { getExerciseHistory } from "../../selectors/track";



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
    paddingBottom: 5,
  },
  cell: {
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    borderColor: theme.BORDER_COLOR,
    // alignItems:'flex-start',
    // justifyContent: 'space-between',
    // flex: 1,
  },

  subHeading: {
    fontSize: 18,
    color: theme.ACCENT_YELLOW,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },

  tableSpacing: {
    marginTop: 35,
  },

  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  alignHorizontally: {
    flexDirection: 'row', alignItems: 'center'
  }
});

class ExerciseHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toolTipVisible: false,
      toolTipVisible1: false,
      toolTipVisible2: false,
    };

    this.keyCount = 0;
  }

  /**
   * Generate a predictable unique key for react to keep track of elements
   * @return {number}
   */
  getKey() {
    return (this.keyCount += 1);
  }

  render() {
    const { exercise } = this.props.navigation.state.params;

    console.log('Exercise History: ', this.props.exerciseHistory);
    if (Object.keys(this.props.exerciseHistory).length === 0 ||
    this.props.exerciseHistory[exercise] === undefined) {
      return (
        <Container>
          <View style={{padding: 20}}>
            <StyledText>Sorry it looks like you have not tracked this exercise before. Make sure you check back after you have tracked this exercise to see all the cool calculations we do for you with your data.</StyledText>
          </View>
        </Container>
      )
    }


    const latestMaxDate = moment(this.props.exerciseHistory[exercise].previousAttempts[0].trackedOn)
      .format("MM/DD/YYYY") || '';
    const personalRecordDate = moment(this.props.exerciseHistory[exercise].personalRecord.trackedOn)
      .format("MM/DD/YYYY") || '';

    return (
      <Container >
        <ScrollView style={{ padding: 20 }}>
          <StyledText style={{ fontSize: 20 }}>{exercise}</StyledText>

          <View style={styles.tableSpacing}>
            <View style={styles.alignHorizontally}>
              <StyledText style={styles.subHeading}>Previous Attempts</StyledText>
              <Tooltip
                visibleState={this.state.toolTipVisible}
                close={() => this.setState({ toolTipVisible: false })}
                open={() => this.setState({ toolTipVisible: true })}
                text="Most recent 3 attempts at this exercise"
              />
            </View>
            {/*<DynamicGrid*/}
              {/*header={['Sets', 'Weight', 'Reps', 'Date']}*/}
              {/*data={this.props.exerciseHistory[exercise].formattedPreviousAttempts}*/}
            {/*/>*/}



            {
              this.props.exerciseHistory[exercise].formattedPreviousAttempts.map(item => (
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10
                  }}
                  key={this.getKey()}
                >
                  <StyledText>{item.date}</StyledText>
                  <View style={{ marginLeft: 30 }}>
                    {
                      item.trackedReps.map((reps, index) => (
                        <StyledText key={this.getKey()}>{reps} x {item.trackedWeight[index]}</StyledText>
                      ))
                    }
                  </View>

                </View>
              ))
            }



          </View>

          <View style={styles.tableSpacing}>
            <View style={styles.headingContainer}>
              <View style={styles.alignHorizontally}>
                <StyledText style={styles.subHeading}>Estimated Max</StyledText>
                <Tooltip
                  visibleState={this.state.toolTipVisible2}
                  close={() => this.setState({ toolTipVisible2: false })}
                  open={() => this.setState({ toolTipVisible2: true })}
                  text="Estimated Maxes based on your last attempt of this exercise"
                />
              </View>

              <StyledText>{latestMaxDate}</StyledText>
            </View>
            <TrackExerciseHistoryTable
              header={['1RM', '3RM', '5RM', '8RM', '10RM']}
              data={this.props.exerciseHistory[exercise].latestMaxes}
            />
          </View>

          <View style={styles.tableSpacing}>
            <View style={styles.headingContainer}>
              <View style={styles.alignHorizontally}>
                <StyledText style={styles.subHeading}>Personal Record</StyledText>
                <Tooltip
                  visibleState={this.state.toolTipVisible3}
                  close={() => this.setState({ toolTipVisible3: false })}
                  open={() => this.setState({ toolTipVisible3: true })}
                  text="Estimated Maxes based on your personal record for this exercise"
                />
              </View>

              <StyledText>{personalRecordDate}</StyledText>
            </View>
            <TrackExerciseHistoryTable
              header={['1RM', '3RM', '5RM', '8RM', '10RM']}
              data={this.props.exerciseHistory[exercise].allTimeMax}
            />
          </View>

        </ScrollView>
      </Container>
    )
  }
}

ExerciseHistory.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  exerciseHistory: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    exerciseHistory: getExerciseHistory(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseHistory);
