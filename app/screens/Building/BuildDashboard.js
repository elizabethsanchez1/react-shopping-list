import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList, Text } from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import Container from '../../components/Container/index';
import { SavedWorkoutCard } from '../../components/Card/index';
import { FloatingButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import Tabs from '../../components/Tabs/Tabs';
import { addProgram, editProgram } from '../../actions/program';
import { addWorkout, editWorkout } from '../../actions/workout';
import { Loading } from '../../components/Loading/index';
import { getLoadingByDomain } from '../../selectors/loading';
import { getPrograms, getWorkouts } from '../../selectors/savedWorkouts';
import { BUILDING, SAVED_WORKOUTS } from '../../constants/reducerObjects';
import { calculateWeeksForDropdown } from '../../selectors/building';
import { addProgramAction, editProgramAction } from '../../actions/building';


class BuildDashboard extends Component {
  static navigationOptions = () => {
    return {
      // styling to make tabs look like part of header
      headerStyle: {
        backgroundColor: theme.SECONDARY_BACKGROUND,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 0,
      },
    };
  };

  constructor( props ) {
    super( props );
    this.state = {};
  }

  selectCard = ( cardIndex, type ) => {
    let weeks = [];

    if ( type === 'program' ) {
      this.props.editProgram( this.props.programs[ cardIndex ] );
      weeks = calculateWeeksForDropdown( this.props.programs[ cardIndex ].program );

    } else {
      this.props.editWorkout( this.props.workouts[ cardIndex ] );
      weeks = calculateWeeksForDropdown( this.props.workouts[ cardIndex ] ).workout;
    }

    this.props.navigation.navigate( 'Build', { weeks } );
  };

  createWorkout = type => {
    if ( type === 'program' ) {
      this.props.addProgram();
    } else {
      this.props.addWorkout();
    }

    this.props.navigation.navigate( 'BuildQuestions' );
  };

  programsView = () => (
    <View style={ { flex: 1 } }>
      <FlatList
        data={ this.props.programs }
        renderItem={ ( { item, index } ) => (
          <SavedWorkoutCard
            title={ item.name }
            description={ `${ Object.keys( item.program ).length } weeks` }
            createdDate={ `${ moment( item.created ).format( 'L' ) }` }
            onClick={ () => this.selectCard( index, 'program' ) }
          />
        ) }
        keyExtractor={ item => item.name }
      />
      <View
        style={ {
          position: 'absolute',
          right: 0,
          bottom: '3%',
        } }
      >
        <FloatingButton
          onClick={ () => {
            this.props.addProgram()
            this.props.navigation.navigate( 'BuildQuestions' );
          } }
        />
      </View>
    </View>
  );

  workoutsView = () => (
    <View style={ { flex: 1 } }>
      <FlatList
        data={ this.props.workouts }
        renderItem={ ( { item, index } ) => (
          <SavedWorkoutCard
            title={ item.name }
            description={ `${ item.workout.week1[ 0 ].exercises.length } Exercises` }
            createdDate={ `${ item.created.date }` }
            onClick={ () => this.selectCard( index, 'workout' ) }
          />
        ) }
        keyExtractor={ item => item.name }
      />
      <View
        style={ {
          position: 'absolute',
          right: 0,
          bottom: '3%',
        } }
      >
        <FloatingButton
          onClick={ () => this.createWorkout( 'workout' ) }
        />
      </View>
    </View>
  );


  render() {
    if ( this.props.isLoading ) {
      return <Loading />;
    }

    return (
      <Container>
        <Tabs
          routes={ [
            { key: 'first', title: 'Programs' },
            { key: 'second', title: 'Single Workouts' },
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

BuildDashboard.propTypes = {
  navigation: PropTypes.object,
  programs: PropTypes.array,
  workouts: PropTypes.array,
  isLoading: PropTypes.bool,
  editProgram: PropTypes.func,
  addProgram: PropTypes.func,
};

const mapStateToProps = state => ( {
  programs: getPrograms( state ),
  workouts: getWorkouts( state ),
  isLoading: getLoadingByDomain( state, SAVED_WORKOUTS ),
} );

const mapDispatchToProps = dispatch => ( {
  addProgram: () => dispatch( addProgramAction() ),
  editProgram: program => dispatch( editProgramAction( program ) ),
  addWorkout: () => dispatch( addWorkout() ),
  editWorkout: workout => dispatch( editWorkout( workout ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( BuildDashboard );
