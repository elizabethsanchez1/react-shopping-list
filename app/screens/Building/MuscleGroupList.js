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
import * as buildActions from '../../actions/buildActions';
import * as exercises from '../../actions/exercises';
import { getSelectedExercises } from "../../reducers/exercises";
import { muscleGroupSeparatedExercises } from "../../config/baseExerciseList";

class MuscleGroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...muscleGroupSeparatedExercises,
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
  }

  addExercises = () => {
    this.props.actions.exercises.addExercises(this.props.selectedExercises);
    this.props.navigation.navigate('Build');
  };

  selectMuscleGroup = (muscleGroup) => {
    this.props.actions.exercises.selectMuscleGroup(muscleGroup);
    this.props.navigation.navigate('ExerciseList');
  };

  render() {
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

MuscleGroupList.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  selectedExercises: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    selectedExercises: getSelectedExercises(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      exercises: bindActionCreators(exercises, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MuscleGroupList);
