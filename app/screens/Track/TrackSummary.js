import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StyledText } from '../../components/Text';
import Container from '../../components/Container/index';
import * as actions from '../../actions/track';
import theme from '../../styles/theme.style';
import Card from '../../components/Card/Card';
import { calculateTrackedExerciseNumbers, getTrackableExerciseSets, getTrackedExercises } from '../../selectors/track';
import TrackSummaryTable from '../../components/Table/TrackSummaryTable/TrackSummaryTable.js';


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
} );


class TrackSummary extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      program: {},
      data: [],
      weeks: true,
      currentIndex: 0,
      total: '',
      loading: false,
      alertShown: false,
      totalWeight: '',
      totalReps: '',
    };
  }

  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <Button
          title="Dashboard"
          containerViewStyle={ {
            marginLeft: 0,
          } }
          buttonStyle={ {
            backgroundColor: 'transparent',
            padding: 5,
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 0,
          } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          icon={ {
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: { marginRight: -5, marginLeft: -5, marginTop: -3 },
          } }
          onPress={ () => navigation.navigate( 'TrackDashboard' ) }
        />
      ),
    };
  };

  componentDidMount() {
    const { trackedExercises } = this.props;

    // const reps = [];
    // const weights = [];
    // trackedExercises.forEach( exercise => {
    //   reps.push( exercise.trackedReps.reduce( ( accumulator, currentValue ) => accumulator + currentValue ) );
    //   weights.push( exercise.totalVolume );
    // } );
    //
    // const totalReps = reps.reduce( ( accumulator, currentValue ) => accumulator + currentValue );
    // const totalWeights = weights.reduce( ( accumulator, currentValue ) => accumulator + currentValue );

    this.setState( { totalWeights, totalReps } );
  }

  render() {
    const { totalReps, totalWeights } = this.state;
    const { trackedExercises, trackedSets } = this.props;

    return (
      <Container scroll>
        <FlatList
          data={ trackedExercises }
          renderItem={ ( { item, index } ) => (
            <Card>
              <StyledText>{item.exercise}</StyledText>

              <TrackSummaryTable
                items={ trackedSets[ index ] }
              />

              <View style={ { flexDirection: 'row', paddingLeft:10, paddingRight: 10 } }>
                <StyledText>Totals: </StyledText>

                <StyledText style={ { paddingLeft: 10 } }>
                  {trackedExercises[ index ].totalReps} reps
                </StyledText>

                <StyledText style={ { paddingLeft: 10 } }>
                  {trackedExercises[ index ].totalVolume} lbs
                </StyledText>
              </View>
            </Card>
          ) }
          keyExtractor={ item => item.exercise }
        />

        <Card>
          <StyledText style={ { marginBottom: 20 } }>Workout Totals</StyledText>
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
              <StyledText>{trackedExercises.length}</StyledText>
            </View>

            <View style={ styles.cell }>
              <StyledText>{totalReps}</StyledText>
            </View>

            <View style={ styles.cell }>
              <StyledText>{totalWeights}</StyledText>
            </View>
          </View>

        </Card>
      </Container>
    );
  }
}

TrackSummary.propTypes = {
  track: PropTypes.object,
  navigation: PropTypes.object,
  actions: PropTypes.object,
  trackedExercises: PropTypes.array,
};

const mapStateToProps = state => ( {
  trackedExercises: calculateTrackedExerciseNumbers( state ),

  // return {
  //   profile: state.profile,
  //   authReducer: state.authReducer,
  //   buildReducer: state.buildReducer,
  //   track: state.track,
  //   trackedExercises: getTrackedExercises( state ),
  //   trackedSets: getTrackableExerciseSets( state ),
  // };
} );

function mapDispatchToProps( dispatch ) {
  return {
    actions: bindActionCreators( actions, dispatch ),
  };
}

export default connect( mapStateToProps, mapDispatchToProps )( TrackSummary );
