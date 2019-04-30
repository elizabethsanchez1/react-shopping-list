import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, ActionSheetIOS, Alert, Button, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StyledText } from '../../components/Text';
import Container from '../../components/Container/index';
import { KeyboardAwareScrollView, KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view'
import { Pagination } from '../../components/Pagination';
import { PrimaryButton, Link } from "../../components/Button";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Card from '../../components/Card/Card';
import * as actions from '../../actions/track';
import { calculateProgramAttempt, formatExercises, updateProgramAttempts } from "../../actions/track";
import * as apiActions from '../../actions/workoutsApi';
import { saveTrackedWorkout } from "../../actions/workoutsApi";
import theme from '../../styles/theme.style';
import { Loading } from '../../components/Loading';
import {
  getAttemptInfo,
  getSelectedData, getTrackableExerciseSets,
  getTrackDayName, getTrackerSetupLoadingState,
  getTrackExercises, getTrackRedirect, getTracksSelectedDay, getTracksSelectedWeek,
  getTrackType
} from "../../selectors/track";
import { getDocumentIds, getSaveTrackedWorkoutLoading } from "../../selectors/workoutsApi";
import { getUid } from "../../selectors/authentication";
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';

const styles = StyleSheet.create({
  buttonStyle : {
    width: '33.3%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: theme.PRIMARY_BACKGROUND,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 16,
    color: theme.ACTIVE_TAB_COLOR
  },

  disabledStyle: {
    fontSize: 16,
    color: 'gray',
  }
});


class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Save'
          onPress={() => navigation.state.params.saveWorkout()}
        />
      )
    }
  };

  componentDidMount() {
    const { selectedData, exercises, documentIds } = this.props;
    this.props.navigation.setParams({saveWorkout: this.saveWorkout});

    if (this.props.type === 'program') {
      this.props.calculateProgramAttempt(selectedData, documentIds);
    }

    this.props.formatExercises(exercises);
  }

  componentDidUpdate() {
    if (this.props.redirect) {
      this.props.navigation.navigate('TrackSummary');
    }
  }

  saveWorkout = () => {
    const { selectedData, selectedWeek, selectedDay, type, attemptInfo, uid } = this.props;

    if (type === 'program' && attemptInfo.updateDatabase) {
      this.props.updateProgramAttempts(attemptInfo);
    }

    this.props.saveTrackedWorkout();
  };

  updateField = update => {
    const { set, value, field } = update;
    this.props.trackActions.updateField(
      this.props.exerciseSets,
      this.state.currentIndex,
      set - 1 , // change set to set index
      field,
      value,
    );
  };

  editSets = () => {
    const { exerciseSets } = this.props;
    const { currentIndex } = this.state;
    ActionSheetIOS.showActionSheetWithOptions({
        options: ['Cancel', 'Remove Set', 'Add Set'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 0,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          this.props.trackActions.modifySets(exerciseSets, currentIndex, 'remove');
        }

        if (buttonIndex === 2) {
          this.props.trackActions.modifySets(exerciseSets, currentIndex, 'add');
        }
      });
  };

  editExercises = () => {
    const { selectedData, type, selectedWeek, selectedDay, exercises, exerciseSets } = this.props;
    const { currentIndex } = this.state;
    const showRemoveOption = (exercises.length > 1);
    const options = {
      options: ['Cancel', 'Remove This Exercise', 'Add Exercise'],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    };
    const reducedOptions = {
      options: ['Cancel', 'Add Exercise'],
      cancelButtonIndex: 0,
    };

    ActionSheetIOS.showActionSheetWithOptions(
      (showRemoveOption) ? options : reducedOptions
      ,(buttonIndex) => {

        if (showRemoveOption) {
          if (buttonIndex === 1) {
            this.setState({
              currentIndex: (currentIndex !== 0) ? currentIndex - 1 : currentIndex
            });

            this.props.trackActions.removeExercise(
              selectedData,
              type,
              selectedWeek,
              selectedDay,
              currentIndex,
              exerciseSets,
            );
          }

          if (buttonIndex === 2) {
            this.props.trackActions.storeAddExerciseIndex(currentIndex + 1);
            this.props.navigation.navigate('TrackMuscleGroupList');
          }
        }

        if (!showRemoveOption) {
          if (buttonIndex === 1 ) {
            this.props.trackActions.storeAddExerciseIndex(currentIndex + 1);
            this.props.navigation.navigate('TrackMuscleGroupList');
          }
        }
      })
  };

  quickTrack = () => {
    const { exerciseSets, exercises } = this.props;

    this.props.trackActions.quickTrack(
      exercises,
      exerciseSets,
      this.state.currentIndex,
    );
  };

  handleNavigation = (direction) => {
    const { currentIndex } = this.state;

    if (direction === 'next' && currentIndex + 1 < this.props.exercises.length) {
      this.setState({ currentIndex: currentIndex + 1 });
    } else if (direction === 'previous' && currentIndex !== 0) {
      this.setState({ currentIndex: currentIndex - 1 });
    }
  };

  goToHistory = (exercise) => {
    this.props.navigation.navigate('ExerciseHistory', { exercise })
  };

  render() {
    const { currentIndex } = this.state;
    const targetWeight = this.props.exercises[currentIndex].weight;
    const targetReps = this.props.exercises[currentIndex].reps;
    const exercise = this.props.exercises[currentIndex].exercise;

    if (this.props.trackerSetupLoading) {
      return <Loading />
    }

    if (this.props.saveTrackedWorkoutLoading) {
      return <Loading />
    }

    return (
      <Container>
        <KeyboardAwareScrollView
          containerStyling={{ overflow: 'scroll'}}
          extraScrollHeight={30}
        >
          <Card
            style={{ padding: 20 }}
            containerStyling={{ padding: 0 }}
          >
            <View style={{ padding: 10 }}>
              <View style={{marginTop: 20, marginBottom: 20 }}>
                {/*<StyledText>{currentExercises.day}</StyledText>*/}
                <StyledText>{this.props.dayName}</StyledText>
              </View>


              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <Link
                  title={exercise}
                  onPress={() => this.goToHistory(exercise)}
                />
              </View>

              <View style={{ marginTop: 5 }}>
                {
                  (targetWeight !== '' && targetReps !== '') &&
                    <StyledText>Target: {targetWeight} lbs x {targetReps}</StyledText>
                }
              </View>

              <ExerciseInputTable
                items={ this.props.exerciseSets[currentIndex] || []  }
                updateField={ update => this.updateField( update ) }
              />
            </View>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.editSets()}
              >
                <Text style={styles.buttonText}>Edit sets</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.editExercises()}
              >
                <Text style={styles.buttonText}>Edit exercises</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonStyle, { borderRightWidth: 0 }]}
                disabled={(!(targetWeight && targetReps))}
                onPress={() => this.quickTrack()}
              >
                <Text
                  style={
                    (targetWeight && targetReps) ? styles.buttonText : styles.disabledStyle
                  }
                >
                  Quick track
                  </Text>
              </TouchableOpacity>
            </View>
          </Card>

          <View style={{
            backgroundColor: theme.PRIMARY_BACKGROUND,
            height: 70,
            marginTop: 20,
          }}>
            <Pagination
              current={currentIndex + 1}
              total={this.props.exercises.length}
              onPress={direction => this.handleNavigation(direction)}
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

Tracker.propTypes = {
  navigation: PropTypes.object,
  trackActions: PropTypes.object,
  workoutsApi: PropTypes.object,
  type: PropTypes.string,
  dayName: PropTypes.string,
  exercises: PropTypes.array,
  exerciseSets: PropTypes.array,
  selectedData: PropTypes.object,
  documentIds: PropTypes.array,
  attemptInfo: PropTypes.object,
  selectedWeek: PropTypes.string,
  selectedDay: PropTypes.number,
  uid: PropTypes.string,
  redirect: PropTypes.bool,
  // isLoading: PropTypes.bool,
  trackerSetupLoading: PropTypes.bool,
  saveTrackedWorkoutLoading: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    type: getTrackType(state),
    exercises: getTrackExercises(state),
    exerciseSets: getTrackableExerciseSets(state),
    documentIds: getDocumentIds(state),
    selectedData: getSelectedData(state),
    dayName: getTrackDayName(state),
    attemptInfo: getAttemptInfo(state),
    selectedWeek: getTracksSelectedWeek(state),
    selectedDay: getTracksSelectedDay(state),
    uid: getUid(state),
    redirect: getTrackRedirect(state),
    trackerSetupLoading: getTrackerSetupLoadingState(state),
    saveTrackedWorkoutLoading: getSaveTrackedWorkoutLoading(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    trackActions: bindActionCreators(actions, dispatch),
    workoutsApi: bindActionCreators(apiActions, dispatch),
    saveTrackedWorkout: () => dispatch(saveTrackedWorkout()),
    calculateProgramAttempt: (data, ids) => dispatch(calculateProgramAttempt(data, ids)),
    formatExercises: exercises => dispatch(formatExercises(exercises)),
    updateProgramAttempts: attempt => dispatch(updateProgramAttempts(attempt)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tracker);