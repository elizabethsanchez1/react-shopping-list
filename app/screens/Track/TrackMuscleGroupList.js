import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Container from '../../components/Container/index';
import { PrimaryButton } from "../../components/Button";
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as trackActions from '../../actions/track';
import * as exercises from '../../actions/exercises';
import { getSelectedExercises, retrievedExerciseList } from "../../reducers/exercises";
import {
  getCompletedExercises,
  getExerciseIndexLocation,
  getSelectedData, getTrackableExerciseSets, getTrackExercises,
  getTracksSelectedDay,
  getTracksSelectedWeek,
  getTrackType
} from "../../selectors/track";

import { muscleGroupSeparatedExercises } from "../../config/baseExerciseList";

class TrackMuscleGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...muscleGroupSeparatedExercises
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Add'
          onPress={() => navigation.state.params.addExercises()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      addExercises: this.addExercises.bind(this)
    });

    if (!this.props.retrievedExerciseList) {
      this.props.actions.exercises.getExercises();
    }
  }

  addExercises = () => {
    this.props.actions.track.addExercises(
      this.props.selectedData,
      this.props.type,
      this.props.selectedWeek,
      this.props.selectedDay,
      this.props.exerciseIndex,
      this.props.selectedExercises,
      this.props.exerciseSets,
    );
    this.props.actions.track.buildExerciseHistory(
      this.props.selectedData,
      this.props.selectedWeek,
      this.props.selectedDay,
      this.props.completedExercises,
    );
    this.props.navigation.navigate('Tracker');
  };

  selectMuscleGroup = (muscleGroup) => {
    this.props.actions.exercises.selectMuscleGroup(muscleGroup);
    this.props.navigation.navigate('TrackExerciseList');
  };

  render() {
    console.log('Muscle groups props: ', this.props);
    const { upperBodyMuscles, lowerBodyMuscles } = this.state;

    return (
      <Container>
        <ScrollView>
          <View style={{flexDirection: 'row', padding: 15, }}>
            <View style={{width: '30%', marginTop: 35}}>
              <Text
                style={{
                  fontSize: theme.FONT_SIZE_LARGE,
                  color: theme.ACCENT_YELLOW,
                }}
              >Upper Body</Text>
            </View>

            <View style={{width: '70%', paddingLeft: 20}}>
              <List
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                }}
              >
                <FlatList
                  data={upperBodyMuscles}
                  renderItem={({item}) => (
                    <ListItem
                      titleStyle={{color: 'white'}}
                      containerStyle={{borderBottomColor: 'white',}}
                      chevronColor="white"
                      title={item.exercise}
                      onPress={() => this.selectMuscleGroup(item.exercise)}
                    />
                  )}
                  keyExtractor={(item, index) => `${item.exercise + index}`}
                />
              </List>
            </View>
          </View>

          <View style={{flexDirection: 'row', padding: 15}}>
            <View style={{width: '30%', marginTop: 35}}>
              <Text
                style={{
                  fontSize: theme.FONT_SIZE_LARGE,
                  color: theme.ACCENT_YELLOW,
                }}
              >Lower Body</Text>
            </View>

            <View style={{width: '70%', paddingLeft: 20}}>
              <List
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderTopWidth: 0,
                }}
              >
                <FlatList
                  data={lowerBodyMuscles}
                  renderItem={({item}) => (
                    <ListItem
                      titleStyle={{color: 'white', fontSize: 16}}
                      containerStyle={{borderBottomColor: 'white',}}
                      chevronColor="white"
                      title={item.exercise}
                      onPress={() => this.selectMuscleGroup(item.exercise)}
                    />
                  )}
                  keyExtractor={(item, index) => `${item.exercise + index}`}
                />
              </List>
            </View>
          </View>

          <View style={{padding: 20, margin: 40 }}>
            <Text
              style={{
                color: theme.PRIMARY_FONT_COLOR,
                fontSize: theme.FONT_SIZE_MEDIUM,
                fontFamily: theme.PRIMARY_FONT_FAMILY,
                textAlign: 'center'
              }}
            >
              Cant find the exercise you are looking for? Add your own custom exercise.
            </Text>
            <PrimaryButton
              title="CUSTOM EXERCISE"
              onPress={() => this.props.navigation.navigate('CustomExercise')}
            />
          </View>
        </ScrollView>
      </Container>
    )
  }
}

TrackMuscleGroupList.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  selectedExercises: PropTypes.array,
  retrievedExerciseList: PropTypes.bool,
  selectedData: PropTypes.object,
  type: PropTypes.string,
  selectedWeek: PropTypes.string,
  selectedDay: PropTypes.number,
  exerciseIndex: PropTypes.number,
  exercises: PropTypes.array,
  exerciseSets: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    selectedExercises: getSelectedExercises(state),
    retrievedExerciseList: retrievedExerciseList(state),
    selectedData: getSelectedData(state),
    type: getTrackType(state),
    selectedWeek: getTracksSelectedWeek(state),
    selectedDay: getTracksSelectedDay(state),
    exerciseIndex: getExerciseIndexLocation(state),
    exercises: getTrackExercises(state),
    exerciseSets: getTrackableExerciseSets(state),
    completedExercises: getCompletedExercises(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      exercises: bindActionCreators(exercises, dispatch),
      track: bindActionCreators(trackActions, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackMuscleGroupList);
