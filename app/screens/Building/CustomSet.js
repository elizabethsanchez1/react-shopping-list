import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../components/Container/index';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import theme from '../../styles/theme.style';
import {Button} from 'react-native-elements';
import { PrimaryButton } from "../../components/Button";
import { getExerciseForCustomSet, getWorkoutType } from "../../selectors/workoutsApi";
import * as program from "../../actions/program";
import * as workout from "../../actions/workout";
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';


class CustomSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sets: [],
    };

    this.weight = React.createRef();
    this.reps = React.createRef();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Save'
          onPress={() => navigation.state.params.saveExercise()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      saveExercise: this.saveExercise.bind(this)
    });
    const sets = [];
    const defaultSets = 3;
    const exercise = Object.assign({}, this.props.exercise);

    if (exercise.weight.indexOf('-') === -1) {

      let length = (exercise.sets === '') ? defaultSets : exercise.sets;
      let weight  =  exercise.weight;
      let reps = exercise.reps;

      for (let i = 0; i < length; i += 1) {
        sets.push({
          set: i + 1,
          weight,
          reps,
        });
      }
    } else {
      let { length } = exercise.customSet;
      for (let i = 0; i < length; i += 1) {
        sets.push({
          set: i + 1,
          weight: exercise.customSet[i].weight,
          reps: exercise.customSet[i].reps,
        });
      }
    }

    this.setState({ sets });
  }

  formatData = (set) => {
    const exercise = Object.assign({}, this.props.exercise);
    const weightRange = getRange('weight', set);
    const repRange = getRange('reps', set);

    function getRange(property, data) {
      let filtered = data.map(item => parseInt(item[property], 10));
      let allTheSame = filtered.every((value, i, arr) => value === arr[0]);

      if (allTheSame) {
        return `${filtered[0]}`;
      } else {
        let sorted = filtered.sort((a,b) => a - b);
        return `${sorted[0]}-${sorted[sorted.length - 1]}`;
      }
    }

    return {
      exercise: exercise.exercise,
      compound: (exercise.compound === true),
      isolation: (exercise.isolation === true),
      muscleGroup: exercise.muscleGroup,
      weight: weightRange,
      sets: `${set.length}`,
      reps: repRange,
      customSet: this.state.sets,
    };
  };

  saveExercise = () => {
    const formattedExercise = this.formatData(this.state.sets);
    this.props.actions[this.props.type].saveCustomSet(formattedExercise);
    this.props.navigation.navigate('Build');
  };



  updateField = ( change, location ) => {
    const { sets } = this.state;
    sets[ location ][ change.field ] = change.value;

    this.setState({ sets } );
  };

  addSet = () => {
    const { sets } = this.state;
    const updatedSets = [...sets];
    const newSet = {
      set: sets.length + 1,
      weight: '',
      reps: '',
    };
    updatedSets.push(newSet);

    this.setState({ sets: updatedSets });
  };

  deleteSet = () => {
    const { sets } = this.state;
    const updatedSets = [...sets];
    updatedSets.pop();

    this.setState({ sets: updatedSets });
  };

  render() {
    console.log('state: ', this.state);

    return(
      <Container containerStyling={{paddingLeft: 20, paddingRight: 20}}>
        <KeyboardAwareScrollView>
          <Text
            style={{
              fontSize: theme.FONT_SIZE_LARGE,
              color: theme.PRIMARY_FONT_COLOR,
              fontFamily: theme.PRIMARY_FONT_FAMILY,
              marginTop: 60,
            }}
          >
            { this.props.exercise.exercise }
          </Text>

          <ExerciseInputTable
            items={ this.state.sets }
            updateField={ ( change, index ) => this.updateField( change, index ) }
          />

          <View style={{ flexDirection: 'row' }}>
            <PrimaryButton
              title="ADD SET"
              containerViewStyle={{marginLeft: 0}}
              onPress={this.addSet}
            />
            <PrimaryButton
              title="DELETE SET"
              onPress={this.deleteSet}
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

CustomSet.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  exercise: PropTypes.object,
  type: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    type: getWorkoutType(state),
    exercise: getExerciseForCustomSet(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      program: bindActionCreators(program, dispatch),
      workout: bindActionCreators(workout, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomSet);
