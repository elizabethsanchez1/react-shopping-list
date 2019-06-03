import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import { StyledText } from '../../components/Text';
import theme from '../../styles/theme.style';
import Tooltip from '../../components/Tooltip/Tooltip';
import TrackExerciseHistoryTable from '../../components/Table/TrackExerciseHistoryTable';
import { getMaxesInfoByExercise, getPreviousExercisesByCount } from '../../selectors/track';


const styles = StyleSheet.create( {
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
  },
  subHeading: {
    fontSize: 18,
    color: theme.ACCENT_YELLOW,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  tableSpacing: {
    marginTop: 0,
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alignHorizontally: {
    flexDirection: 'row', alignItems: 'center',
  },
  containerPadding: { padding: 20 },
  font: { fontSize: 20 },
  previousExercisesContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  previousExercises: { marginLeft: 30 },
} );

class ExerciseHistory extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      toolTipVisible: false,
      toolTipVisible2: false,
      toolTipVisible3: false,
    };

    this.keyCount = 0;
  }

  getKey = () => ( this.keyCount += 1 );

  render() {
    const { exercise } = this.props.navigation.state.params;
    const { previousExercises, exerciseMaxes } = this.props;

    if ( previousExercises.length === 0 ) {
      return (
        <Container>
          <View style={ styles.containerPadding }>
            <StyledText>
              Sorry it looks like you have not tracked this exercise before. Make sure you check back after you have tracked this exercise to see all the cool calculations we do for you with your data.
            </StyledText>
          </View>
        </Container>
      );
    }


    return (
      <Container>
        <ScrollView style={ styles.containerPadding }>
          <StyledText style={ styles.font }>{ exercise }</StyledText>

          <View style={ styles.tableSpacing }>
            <View style={ styles.alignHorizontally }>
              <StyledText style={ styles.subHeading }>Previous Attempts</StyledText>
              <Tooltip
                visibleState={ this.state.toolTipVisible }
                close={ () => this.setState( { toolTipVisible: false } ) }
                open={ () => this.setState( { toolTipVisible: true } ) }
                text="Most recent 3 attempts at this exercise"
              />
            </View>

            {
              previousExercises.map( item => (
                <View
                  style={ styles.previousExercisesContainer }
                  key={ this.getKey() }
                >
                  <StyledText>{ item.trackedOn }</StyledText>
                  <View style={ styles.previousExercises }>
                    {
                      item.trackedReps.map( ( reps, index ) => (
                        <StyledText key={ this.getKey() }>
                          { reps } x { item.trackedWeights[ index ] }
                        </StyledText>
                      ) )
                    }
                  </View>
                </View>
              ) )
            }


          </View>

          <View style={ styles.tableSpacing }>
            <View style={ styles.headingContainer }>
              <View style={ styles.alignHorizontally }>
                <StyledText style={ styles.subHeading }>Estimated Max</StyledText>
                <Tooltip
                  visibleState={ this.state.toolTipVisible2 }
                  close={ () => this.setState( { toolTipVisible2: false } ) }
                  open={ () => this.setState( { toolTipVisible2: true } ) }
                  text="Estimated Maxes based on your last attempt of this exercise"
                />
              </View>

              <StyledText>{ exerciseMaxes.latestMaxesDate }</StyledText>
            </View>
            <TrackExerciseHistoryTable
              header={ [ '1RM', '3RM', '5RM', '8RM', '10RM' ] }
              data={ exerciseMaxes.latestMaxes }
            />
          </View>

          <View style={ styles.tableSpacing }>
            <View style={ styles.headingContainer }>
              <View style={ styles.alignHorizontally }>
                <StyledText style={ styles.subHeading }>Personal Record</StyledText>
                <Tooltip
                  visibleState={ this.state.toolTipVisible3 }
                  close={ () => this.setState( { toolTipVisible3: false } ) }
                  open={ () => this.setState( { toolTipVisible3: true } ) }
                  text="Estimated Maxes based on your personal record for this exercise"
                />
              </View>

              <StyledText>{ exerciseMaxes.allTimeMaxesDate }</StyledText>
            </View>
            <TrackExerciseHistoryTable
              header={ [ '1RM', '3RM', '5RM', '8RM', '10RM' ] }
              data={ exerciseMaxes.allTimeMaxes }
            />
          </View>

        </ScrollView>
      </Container>
    );
  }
}

ExerciseHistory.propTypes = {
  navigation: PropTypes.object,
  previousExercises: PropTypes.array,
  exerciseMaxes: PropTypes.object,
};

const mapStateToProps = ( state, ownProps ) => {
  const options = {
    exercise: ownProps.navigation.state.params.exercise,
    count: 5,
  };

  return {
    previousExercises: getPreviousExercisesByCount( state, options ),
    exerciseMaxes: getMaxesInfoByExercise( state, options ),
  };
};

const mapDispatchToProps = dispatch => ( {} );

export default connect( mapStateToProps, mapDispatchToProps )( ExerciseHistory );
