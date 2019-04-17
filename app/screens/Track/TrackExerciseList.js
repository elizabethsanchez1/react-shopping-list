import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import Container from '../../components/Container/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as exerciseActions from '../../actions/exercises';
import * as trackActions from '../../actions/track';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { PrimaryButton } from "../../components/Button";
import { getExerciseList, getMuscleGroupSelected, getSelectedExercises } from "../../reducers/exercises";
import {
  getSelectedData,
  getTracksSelectedDay,
  getTracksSelectedWeek,
  getTrackType,
  getExerciseIndexLocation,
  getTrackExercises, getTrackableExerciseSets, getCompletedExercises
} from "../../selectors/track";


class TrackExerciseList extends Component {
  constructor(props) {super(props)}

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
  }

  selectedExercise = (location) => {
    this.props.actions.exercises.updateSelections(location);
  };

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

  render() {
    console.log('TrackExerciseList props: ', this.props);

    return(
      <Container>
        <ScrollView>
          <View>
            <Text style={{
              marginTop: 40,
              marginBottom: 20,
              textAlign: 'center',
              fontSize: theme.FONT_SIZE_MEDIUM,
              color: theme.PRIMARY_FONT_COLOR,
            }} >Select all Exercises that you want to perform</Text>
            <List
              containerStyle={{
                backgroundColor: 'transparent',
                borderTopWidth: 0,
              }}
            >
              <FlatList
                data={this.props.exerciseList[this.props.muscleGroupSelected]}
                renderItem={({item, index}) => (
                  <ListItem
                    titleStyle={(item.selected) ? {color: theme.ACCENT_YELLOW} : {color: 'white'}}
                    containerStyle={{borderBottomColor: 'white',}}
                    // chevronColor={(item.selected) ? theme.ACCENT_YELLOW : 'white'}
                    hideChevron
                    title={item.name}
                    onPress={() => this.selectedExercise(index)}
                  />
                )}
                keyExtractor={(item, index) => `${item.name + index}`}
              />
            </List>
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


TrackExerciseList.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  exerciseList: PropTypes.object,
  muscleGroupSelected: PropTypes.string,
  selectedExercises: PropTypes.array,
  selectedData: PropTypes.object,
  type: PropTypes.string,
  selectedWeek: PropTypes.string,
  selectedDay: PropTypes.number,
  exerciseIndex: PropTypes.number,
  exercises: PropTypes.array,
  exerciseSets: PropTypes.array,
  completedExercises: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    exerciseList: getExerciseList(state),
    muscleGroupSelected: getMuscleGroupSelected(state),
    selectedExercises: getSelectedExercises(state),
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
      exercises: bindActionCreators(exerciseActions, dispatch),
      track: bindActionCreators(trackActions, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackExerciseList);
