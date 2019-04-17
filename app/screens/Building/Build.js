import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { Button } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Container from '../../components/Container/index';
import { BuildingBuildDropdown } from '../../components/Form/index';
import { PrimaryButton } from "../../components/Button";
import { BuildingBuildCard } from '../../components/Card/index';
import { Loading } from '../../components/Loading/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as buildActions from '../../actions/buildActions';
import * as program from '../../actions/program';
import * as workout from '../../actions/workout';
import * as exercises from '../../actions/exercises';
import * as workoutApi from '../../actions/workoutsApi';
import { saveWorkout } from "../../actions/workoutsApi";
import theme from '../../styles/theme.style';
import {
  getWorkoutType,
  getWorkout,
  getWeekSelected,
  getDaySelected,
  getSaveWorkoutLoadingState, getBuildSaveRedirect,
} from "../../selectors/workoutsApi";
import { retrievedExerciseList } from "../../reducers/exercises";
import { getUid } from "../../selectors/authentication";
import { updateDay } from "../../actions/program";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
  },
  formContainer: {
    marginBottom: 20,
  },
  tableContainer: {
    padding: 15,
  },
  leftAligned: {
    marginHorizontal: 15,
  },
  overRide: {
    marginHorizontal: -15,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    alignSelf: 'stretch',
  },
  largerCell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 2,
    alignSelf: 'stretch',
  },
});

class Build extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copyFrom: '',
      copyTo: '',
      weeksDropdown: '',
      loading: false,
      alertShown: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};

    console.log('Navigation param: ', navigation);

    return {
      headerTitle: (
        (params.weeks.length > 1)
          ? <Dropdown
              placeholder="Week 1"
              placeholderTextColor="white"
              baseColor="white"
              textColor="white"
              containerStyle={{ width: 100, marginTop: -17, paddingLeft: 10 }}
              inputContainerStyle={{ borderBottomWidth: 0 }}
              // pickerStyle={{ width: 200 }}
              selectedItemColor='black'
              dropdownPosition={0}
              fontSize={18}
              data={params.weeks}
              onChangeText={(value) => navigation.state.params.changeWeek(value)}
            />
          : 'Build'
      ),
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Save'
          onPress={() => navigation.state.params.saveData()}
        />
      ),
      headerLeft: (
        <Button
          title="Dashboard"
          containerViewStyle={{
            marginLeft: 0,
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            padding: 5,
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 0,
          }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          icon={{
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: { marginRight: -5, marginLeft: -5, marginTop: -3 },
          }}
          onPress={() => navigation.goBack()}
        />
      )
    }
  };

  componentDidMount() {
    let { weeks } = this.props.navigation.state.params;
    this.props.navigation.setParams({ saveData: this.saveData.bind(this)});

    if (!this.props.retrievedExerciseList) {
      this.props.actions.exercises.getExercises();
    }

    if (this.props.type === 'program') {
      this.props.navigation.setParams({
        changeWeek: this.changeWeek.bind(this),
      });

      const updatedWeeks = JSON.parse(JSON.stringify(weeks));
      updatedWeeks.unshift({value: 'All Weeks'});
      this.setState({
        weeksDropdown: updatedWeeks,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.redirect) {
      this.props.navigation.navigate('BuildDashboard');
      this.props.actions.workoutApi.buildSaveRedirectDone();
    }
  }

  saveData = () => {
    this.setState({loading: true});
    this.props.saveWorkout(this.props.uid, this.props.type);
  };

  changeWeek = (value) => {
    this.props.actions.program.changeWeek(value);
  };

  addExercises = (weekSelected, daySelected) => {
    this.props.actions.exercises.openExerciseList(daySelected);
    this.props.navigation.navigate('MuscleGroupList');
  };

  updateField = (update, dayIndex) => {
    update.daySelected = dayIndex;
    this.props.actions[this.props.type].editField(update);
  };

  sortExercises = (dayIndex) => {
    if (this.props.type === 'program') {
      this.props.actions.program.sortExercises(dayIndex);
    }

    this.props.navigation.navigate('Sort')
  };

  deleteExercises = (weekSelected, daySelected) => {
    if (this.props.type === 'program') {
      this.props.actions.program.openDeletePage(daySelected);
    }

    this.props.navigation.navigate('DeleteExercises');
  };

  customSet = (daySelected, exerciseSelected) => {
    this.props.actions[this.props.type].openCustomSet(exerciseSelected, daySelected);
    this.props.navigation.navigate('CustomSet');
  };

  checkIfCustom = (exercise, exerciseSelected, daySelected) => {
    if (exercise.weight.indexOf('-') > -1 || exercise.reps.indexOf('-') > -1 ) {
      this.customSet(daySelected, exerciseSelected);
    }
  };

  updateDay = (name, daySelected) => {
    // if (name !== '') {
    //   this.props.actions.program.updateDay(name, daySelected);
    // }
    this.props.updateDay( name, daySelected );
  };

  copyFrom = () => {
    const { copyFrom, copyTo } = this.state;

    if (copyFrom !== '' && copyTo !== '') {
      this.props.actions[this.props.type].copyWeek(
          copyFrom.replace(/\s/g, '').toLowerCase(),
          copyTo.replace(/\s/g, '').toLowerCase()
        );
    }
  };

  render() {
    const  { weeks }  = this.props.navigation.state.params;
    const { copyFrom, copyTo, weeksDropdown } = this.state;

    console.log('state in build.js: ', this.state);
    if (this.props.loading) {
      return (
        <Loading />
      )
    }

    return (
      <Container>
        <KeyboardAwareScrollView>
          <View>
            <BuildingBuildDropdown
              dropdown1Data={weeks}
              dropdown2Data={(weeksDropdown) ? weeksDropdown : weeks}
              onChange={(update) => this.setState(update)}
            />
            {
              (copyFrom !== '' && copyTo !== '')
                && <PrimaryButton
                    buttonStyle={{padding: 10}}
                    containerViewStyle={{width: '40%', alignSelf: 'flex-end'}}
                    title="COPY DATA"
                    onPress={() => this.copyFrom()}
                  />
            }
            <FlatList
              data={ this.props.workout[this.props.weekSelected] }
              renderItem={ ( { item, index } ) => (
                <BuildingBuildCard
                  sortLink={ () => this.sortExercises( index ) }
                  addExercises={ () => this.addExercises( this.props.weekSelected, index ) }
                  deleteExercises={ () => this.deleteExercises(
                      this.props.weekSelected,
                      index
                    )
                  }
                  exercises={ item.exercises }
                  updateField={ update  => this.updateField( update, index ) }
                  customSet={ exerciseIndex => this.customSet( index, exerciseIndex ) }
                  checkIfCustom={ ( exercise, exerciseSelected ) => this.checkIfCustom(
                      exercise,
                      exerciseSelected,
                      index
                    )
                  }
                  day={ this.props.workout[this.props.weekSelected][index].day }
                  dayIndex={ index }
                  updateDay={ name => this.updateDay( name, index ) }
                />
              ) }
              keyExtractor={ item => item.day }
            />
          </View>

        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

Build.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  type: PropTypes.string.isRequired,
  workout: PropTypes.object,
  weekSelected: PropTypes.string,
  retrievedExerciseList: PropTypes.bool,
  uid: PropTypes.string,
  loading: PropTypes.bool,
  redirect: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    loading: getSaveWorkoutLoadingState(state),
    uid: getUid(state),
    type: getWorkoutType(state),
    workout: getWorkout(state),
    weekSelected: getWeekSelected(state),
    daySelected: getDaySelected(state),
    redirect: getBuildSaveRedirect(state),
    retrievedExerciseList: retrievedExerciseList(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      buildActions: bindActionCreators(buildActions, dispatch),
      program: bindActionCreators(program, dispatch),
      workout: bindActionCreators(workout, dispatch),
      exercises: bindActionCreators(exercises, dispatch),
      workoutApi: bindActionCreators(workoutApi, dispatch),
    },
    saveWorkout: ( uid, type ) => dispatch( saveWorkout( uid, type ) ),
    updateDay: ( name, day ) => dispatch( updateDay( name, day ) ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Build);
