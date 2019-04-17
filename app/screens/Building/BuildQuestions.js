import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '../../components/Container/index';
import { Dropdown } from 'react-native-material-dropdown';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { getWorkoutType } from "../../selectors/workoutsApi";
import * as program from '../../actions/program';
import * as workout from '../../actions/workout';


const styles = StyleSheet.create({
  input: {
    borderBottomColor: theme.BORDER_COLOR,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    height: 40,
    fontSize: 16,
    marginBottom: 25,
    color: theme.PRIMARY_FONT_COLOR,
  }
});

class BuildQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      weeks: 1,
      daysPerWeek: 1,
      schedule: '',
      template: '',
    };
    this.weeks = React.createRef();
    this.days = React.createRef();
    this.exercises = React.createRef();
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Continue'
          onPress={() => navigation.state.params.goToBuild()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      goToBuild: this.goToBuild.bind(this)
    });
  }

  calculateWeeks = (weeks) => {
    let dropdownWeeks = [];
    for (let i = 0; i < weeks; i += 1) {
      dropdownWeeks.push({
        value: `Week ${i + 1}`
      })
    }

    return dropdownWeeks;
  };

  goToBuild = () => {
    const dropdownWeeks = this.calculateWeeks(this.state.weeks);

    if (this.props.type === 'program') {
      this.props.actions.program.storeProgramConfig(this.state);
      this.props.actions.program.createProgramObject();
    } else {
      this.props.actions.workout.storeWorkoutConfig(this.state);
      this.props.actions.workout.createWorkoutObject();
    }

    this.props.navigation.navigate('Build', {weeks: dropdownWeeks});
  };

  storeAnswer = (question, answer) => {
    this.setState({ [question]: answer });
  };

  render() {
    if (this.props.type === 'program') {
      return (
        <Container containerStyling={{padding: 20, paddingTop: 30}}>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            autoCapitalize="words"
            placeholder="Program Name"
            returnKeyType="done"
            onEndEditing={(text) => this.storeAnswer('name', text.nativeEvent.text)}
            onSubmitEditing={() => this.weeks.current.focus()}
          />
          <TextInput
            ref={this.weeks}
            style={styles.input}
            placeholderTextColor="white"
            placeholder="How many weeks long"
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(text) => this.storeAnswer('weeks', text.nativeEvent.text)}
            onSubmitEditing={() => this.days.current.focus()}
          />
          <TextInput
            ref={this.days}
            style={styles.input}
            placeholderTextColor="white"
            placeholder="How many days per week"
            keyboardType="number-pad"
            returnKeyType="done"
            onEndEditing={(text) => this.storeAnswer('daysPerWeek', text.nativeEvent.text)}
          />
          <Dropdown
            ref={this.schedule}
            placeholder="Training day schedule"
            placeholderTextColor="white"
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            containerStyle={{ marginTop: -25 }}
            inputContainerStyle={{ borderBottomWidth: 2 }}
            data={[
              { value: 'Fixed interval, 2 days on and 1 day off'},
              { value: 'Fixed day, Monday = Chest' }
            ]}
            onChangeText={(text) => this.storeAnswer('schedule', text)}
          />
          <Dropdown
            ref={this.schedule}
            placeholder="Use existing program as template"
            placeholderTextColor="white"
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            containerStyle={{ marginTop: -5 }}
            inputContainerStyle={{ borderBottomWidth: 2 }}
            data={[
              { value: 'Mass Gain'},
              { value: 'Cutting workout' }
            ]}
            onChangeText={(text) => this.storeAnswer('template', text)}
          />
        </Container>
      )
    } else {
      return (
        <Container containerStyling={{padding: 20, paddingTop: 30}}>
          <TextInput
            style={styles.input}
            placeholderTextColor="white"
            autoCapitalize="words"
            placeholder="Workout Name"
            returnKeyType="done"
            onEndEditing={(text) => this.storeAnswer('name', text.nativeEvent.text)}
          />
          <Dropdown
            ref={this.schedule}
            placeholder="Use existing workout as template"
            placeholderTextColor="white"
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            containerStyle={{ marginTop: -5 }}
            inputContainerStyle={{ borderBottomWidth: 2 }}
            data={[
              { value: 'Arm Day'},
              { value: 'Every day is chest' }
            ]}
            onChangeText={(text) => this.storeAnswer('template', text)}
          />
        </Container>
      )
    }
  }
}

BuildQuestions.propTypes = {
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object,
  type: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  return {
    type: getWorkoutType(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(BuildQuestions);
