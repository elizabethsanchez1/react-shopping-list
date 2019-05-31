import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import { SavedWorkoutCard } from '../../components/Card/index';
import theme from '../../styles/theme.style';
import { Loading } from '../../components/Loading/index';
import Tabs from '../../components/Tabs/Tabs';
import {
  trackSelectedProgramAction,
  trackSelectedWorkoutAction,
} from '../../actions/track';
import { getLoadingByDomain } from '../../selectors/loading';
import { SAVED_WORKOUTS } from '../../constants/reducerObjects';
import { getProgramsWithCompletedPercentages, getWorkouts } from '../../selectors/savedWorkouts';


const styles = StyleSheet.create( {
  cardContainer: { flex: 1 },
} );

class TrackDashboard extends Component {
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: theme.SECONDARY_BACKGROUND,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 0,
      },
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      // updateProgramPercentages: false,
    };
  }

  selectTrack = ( index, type ) => {
    if ( type === 'program' ) {
      this.props.selectedProgram( this.props.programs[ index ] );
      this.props.navigation.navigate( 'ExerciseSelection' );
    }

    if ( type === 'workout' ) {
      this.props.selectedWorkout( this.props.workouts[ index ] );
      this.props.navigation.navigate( 'Tracker' );
    }
  };
  
  selectOptions = ( index, type ) => {
    this.props.navigation.navigate( 'ProgramSettings' );
  };

  programsView = () => {
    return (
      <View style={ styles.cardContainer }>
        <FlatList
          data={ this.props.programs }
          renderItem={ ( { item, index } ) => (
            <SavedWorkoutCard
              title={ item.name }
              description={ `${ Object.keys( item.program ).length } weeks` }
              createdDate={ `${ item.created.formatted }` }
              onClick={ () => this.selectTrack( index, 'program' ) }
              secondaryClick={ () => this.selectOptions( index, 'program' ) }
              showPercentage={ item.completed }
            />
          ) }
          keyExtractor={ item => item.name }
        />
      </View>
    );
  };

  workoutsView = () => {
    return (
      <View style={ styles.cardContainer }>
        <FlatList
          data={ this.props.workouts }
          renderItem={ ( { item, index } ) => (
            <SavedWorkoutCard
              title={ item.workout.day }
              description={ `${ item.workout.exercises.length } Exercises` }
              createdDate={ `${ item.created.formatted }` }
              onClick={ () => this.selectTrack( index, 'workout' ) }
              hideRightIcons
            />
          ) }
          keyExtractor={ item => item.workout.day }
        />
      </View>
    );
  };

  render() {
    if ( this.props.isLoading ) {
      return <Loading />;
    }

    return (
      <Container>
        <Tabs
          routes={ [
            { key: 'first', title: 'Programs' },
            { key: 'second', title: 'Workouts' },
          ] }
          subViews={ {
            first: this.programsView,
            second: this.workoutsView,
          } }
        />
      </Container>
    );
  }
}

TrackDashboard.propTypes = {
  navigation: PropTypes.object,
  isLoading: PropTypes.bool,
  programs: PropTypes.array,
  workouts: PropTypes.array,
  selectedProgram: PropTypes.func,
  selectedWorkout: PropTypes.func,
};

const mapStateToProps = state => ( {
  isLoading: getLoadingByDomain( state, SAVED_WORKOUTS ),
  programs: getProgramsWithCompletedPercentages( state ),
  workouts: getWorkouts( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectedProgram: program => dispatch( trackSelectedProgramAction( program ) ),
  selectedWorkout: workout => dispatch( trackSelectedWorkoutAction( workout ) ),

} );

export default connect( mapStateToProps, mapDispatchToProps )( TrackDashboard );
