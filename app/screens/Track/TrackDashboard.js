import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import Container from '../../components/Container/index';
import { SavedWorkoutCard } from '../../components/Card/index';
import { connect } from 'react-redux';
import theme from '../../styles/theme.style';
import moment from 'moment';
import { Loading } from '../../components/Loading/index';
import { getUid } from "../../selectors/authentication";
import { getPrograms } from "../../reducers/program";
import { getWorkouts } from "../../reducers/workout";
import {
  getCompletedExercises,
  getProgramPercentages,
} from "../../selectors/track";
import { getWorkoutRequestsLoadingState } from "../../selectors/workoutsApi";
import Tabs from '../../components/Tabs/Tabs';
import { selectedProgram } from "../../actions/track";
import { selectedWorkout } from "../../actions/track";



class TrackDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completedPercentages: {},
      updateProgramPercentages: false,
      loading: true,
    };
  }

  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: theme.SECONDARY_BACKGROUND,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 0,
      }
    }
  };

  componentDidUpdate(prevProps) {
    const { programPercentages } = this.props;

    Object.keys(programPercentages).forEach(program => {
      if (programPercentages[program] !== prevProps.programPercentages[program]) {
        this.setState({
          updateProgramPercentages: !this.state.updateProgramPercentages,
        })
      }
    });

  }

  selectCard = (cardIndex, type, buttonSelection) => {
    if ( type === 'program' ) {
      this.props.selectedProgram( this.props.programs[cardIndex] );
      if ( buttonSelection === 'track' ) this.props.navigation.navigate( 'ExerciseSelection' );
      if ( buttonSelection === 'options' ) this.props.navigation.navigate( 'TrackSelection' );
    }

    if ( type === 'workout' ) {
      this.props.selectedWorkout( this.props.workouts[cardIndex] );
      this.props.navigation.navigate( 'Tracker' );
    }
  };

  programsView = () => {
    return (
      <View style={{ flex: 1}}>
        <FlatList
          data={this.props.programs}
          renderItem={({item, index}) => (
            <SavedWorkoutCard
              title={item.name}
              description={`${Object.keys(item.program).length} weeks`}
              createdDate={`${moment(item.created).format('L')}`}
              onClick={() => this.selectCard(index, 'program', 'track')}
              secondaryClick={() => this.selectCard(index, 'program', 'options')}
              showPercentage={this.props.programPercentages[item.name]}
            />
          )}
          keyExtractor={item => item.name}
          extraData={this.state.updateProgramPercentages}
        />
      </View>
    )
  };

  workoutsView = () => {
    return (
      <View style={{ flex: 1}}>
        <FlatList
          data={this.props.workouts}
          renderItem={({item, index}) => (
            <SavedWorkoutCard
              title={item.name}
              description={`${item.workout.week1[0].exercises.length} Exercises`}
              createdDate={`${moment(item.created).format('L')}`}
              onClick={() => this.selectCard(index, 'workout')}
              hideRightIcons
            />
          )}
          keyExtractor={item => item.name}
        />
      </View>
    )
  };

  render() {
    console.log('track dashboard props: ', this.props);

    if (this.props.isLoading) {
      return <Loading />
    }

    return (
      <Container>
        <Tabs
          routes={[
            { key: 'first', title: 'Programs' },
            { key: 'second', title: 'Workouts' },
          ]}
          subViews={{
            first: this.programsView,
            second: this.workoutsView
          }}
        />
      </Container>
    );
  }
}

TrackDashboard.propTypes = {
  navigation: PropTypes.object,
  uid: PropTypes.string,
  programPercentages: PropTypes.object,
  isLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    completedExercises: getCompletedExercises(state),
    programPercentages: getProgramPercentages(state),
    uid: getUid(state),
    programs: getPrograms(state),
    workouts: getWorkouts(state),
    isLoading: getWorkoutRequestsLoadingState(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectedProgram: program => dispatch( selectedProgram( program ) ),
    selectedWorkout: workout => dispatch( selectedWorkout( workout ) ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackDashboard);
