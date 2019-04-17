import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList} from 'react-native';
import Container from '../../components/Container/index';
import { SavedWorkoutCard } from '../../components/Card/index';
import { FloatingButton } from '../../components/Button';
import { connect } from 'react-redux';
import theme from '../../styles/theme.style';
import moment from 'moment';
import { getUid } from "../../selectors/authentication";
import { getPrograms } from "../../reducers/program";
import { getWorkouts } from "../../reducers/workout";
import Tabs from '../../components/Tabs/Tabs';
import { addProgram } from "../../actions/program";
import { addWorkout } from "../../actions/workout";
import { editProgram } from "../../actions/program";
import { editWorkout } from "../../actions/workout";
import { Loading } from '../../components/Loading/index';
import { getSavedWorkoutsLoading } from "../../selectors/workoutsApi";


class BuildDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = () => {
    return {
      // styling to make tabs look like part of header
      headerStyle: {
        backgroundColor: theme.SECONDARY_BACKGROUND,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 0,
      }
    }
  };

  calculateWeeks = weeks => {
    let dropdownWeeks = [];
    for (let i = 0; i < weeks; i += 1) {
      dropdownWeeks.push({
        value: `Week ${i + 1}`
      })
    }

    return dropdownWeeks;
  };

  selectCard = ( cardIndex, type ) => {
    let weeks = [];

    if ( type === 'program' ) {

      console.log('program prop: ', this.props.programs[cardIndex]);

      this.props.editProgram( this.props.programs[cardIndex] );

      weeks = this.calculateWeeks(
        Object.keys( this.props.programs[cardIndex].program ).length
      );
    } else {
      this.props.editWorkout( this.props.workouts[cardIndex] );
      weeks = this.calculateWeeks( 1 );
    }

    this.props.navigation.navigate( 'Build', { weeks } );
  };

  createWorkout = type => {
    if (type === 'program') {
      this.props.addProgram();
    } else {
      this.props.addWorkout();
    }

    this.props.navigation.navigate('BuildQuestions');
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
              onClick={() => this.selectCard(index, 'program')}
            />
          )}
          keyExtractor={item => item.name}
        />
        <View style={{
            position: 'absolute',
            right: 0,
            bottom: '3%',
        }}>
          <FloatingButton
            onClick={() => this.createWorkout('program')}
          />
        </View>
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
              createdDate={`${ item.created.date }`}
              onClick={() => this.selectCard(index, 'workout')}
            />
          )}
          keyExtractor={item => item.name}
        />
        <View style={{
          position: 'absolute',
          right: 0,
          bottom: '3%',
        }}>
          <FloatingButton
            onClick={() => this.createWorkout('workout')}
          />
        </View>
      </View>
    )
  };

  render() {
    console.log('BUILD props: ', this.props);

    if (this.props.isLoading) {
      return (
        <Loading />
      )
    }

    return (
      <Container>
        <Tabs
          routes={[
            { key: 'first', title: 'Programs' },
            { key: 'second', title: 'Single Workouts' },
          ]}
          subViews={{
            first: this.programsView,
            second: this.workoutsView,
          }}
        />
      </Container>
    );
  }
}

BuildDashboard.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  apiActions: PropTypes.object,
  uid: PropTypes.string,
  // programs: PropTypes.object,
  // workouts: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    uid: getUid( state ),
    programs: getPrograms( state ),
    workouts: getWorkouts( state ),
    isLoading: getSavedWorkoutsLoading( state ),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    addProgram: () => dispatch( addProgram() ),
    editProgram: program => dispatch(  editProgram( program ) ),
    addWorkout: () => dispatch( addWorkout() ),
    editWorkout: workout => dispatch( editWorkout( workout ) ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuildDashboard);
