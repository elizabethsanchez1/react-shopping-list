import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import { SavedWorkoutCard } from '../../components/Card/index';
import { FloatingButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import Tabs from '../../components/Tabs/Tabs';
import { Loading } from '../../components/Loading/index';
import { getLoadingByDomain } from '../../selectors/loading';
import { getPrograms, getWorkouts } from '../../selectors/savedWorkouts';
import { SAVED_WORKOUTS } from '../../constants/reducerObjects';
import { calculateWeeksForDropdown } from '../../selectors/building';
import { addProgramAction, addWorkoutAction, editProgramAction, editWorkoutAction } from '../../actions/building';


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
    this.state = {
      refreshProgram: false,
    };
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.programs.length !== this.props.programs.length ) {
      this.setState( { refreshProgram: !this.state.refreshProgram } );
    }
  }

  selectCard = ( cardIndex, type ) => {
    let weeks = [];

    if ( type === 'program' ) {
      this.props.editProgram( this.props.programs[ cardIndex ] );
      weeks = calculateWeeksForDropdown( this.props.programs[ cardIndex ].program );
    }

    if ( type === 'workout' ) {
      this.props.editWorkout( this.props.workouts[ cardIndex ] );
      weeks = calculateWeeksForDropdown( 1 );
    }

    this.props.navigation.navigate( 'Build', { weeks } );
  };

  createWorkout = type => {
    if ( type === 'program' ) {
      this.props.addProgram();
    }
    if ( type === 'workout' ) {
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
            createdDate={ `${ item.created.formatted }` }
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
            this.props.addProgram();
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
            title={ item.workout.day }
            description={ `${ item.workout.exercises.length } Exercises` }
            createdDate={ `${ item.created.formatted }` }
            onClick={ () => this.selectCard( index, 'workout' ) }
          />
        ) }
        keyExtractor={ item => item.workout.day }
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
    console.log( 'Build Dashboard props', this.props );
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
  addWorkout: PropTypes.func,
  editWorkout: PropTypes.func,
};

const mapStateToProps = state => ( {
  programs: getPrograms( state ),
  workouts: getWorkouts( state ),
  isLoading: getLoadingByDomain( state, SAVED_WORKOUTS ),
} );

const mapDispatchToProps = dispatch => ( {
  addProgram: () => dispatch( addProgramAction() ),
  editProgram: program => dispatch( editProgramAction( program ) ),
  addWorkout: () => dispatch( addWorkoutAction() ),
  editWorkout: workout => dispatch( editWorkoutAction( workout ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( BuildDashboard );
