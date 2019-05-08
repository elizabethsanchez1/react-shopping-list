import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as buildActions from '../../actions/building';
import * as exerciseActions from '../../actions/exercises';
import Container from '../../components/Container/index';
import { Dropdown } from 'react-native-material-dropdown';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { getCustomExercises } from "../../reducers/exercises";
import { getUid } from "../../selectors/authentication";


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

class CustomExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      muscleGroup: '',
      type: '',
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Button
          buttonStyle={{ backgroundColor: 'transparent' }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{ fontSize: 18 }}
          title='Save'
          onPress={() => navigation.state.params.save()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      save: this.saveExercise.bind(this)
    });
  }

  saveExercise = () => {
    this.props.actions.exercises.addCustomExercise(this.state);
    this.props.actions.exercises.addCustomExerciseToProfile(this.props.uid);
    this.props.navigation.navigate('MuscleGroupList');
  };

  render() {
    return (
      <Container containerStyling={{padding: 20, paddingTop: 30}}>
        <TextInput
          style={styles.input}
          placeholderTextColor="white"
          placeholder="Exercise name"
          returnKeyType="done"
          autoCapitalize="words"
          onEndEditing={text => this.setState({ name: text.nativeEvent.text })}
        />
        <Dropdown
          ref={this.schedule}
          placeholder="Muscle group type"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={{ marginTop: -25 }}
          inputContainerStyle={{ borderBottomWidth: 2 }}
          data={[
            { value: 'Abs'},
            { value: 'Back' },
            { value: 'Biceps' },
            { value: 'Calves' },
            { value: 'Chest' },
            { value: 'Forearms' },
            { value: 'Hamstrings' },
            { value: 'Quads' },
            { value: 'Shoulders' },
            { value: 'Traps' },
            { value: 'Triceps' },
          ]}
          onChangeText={value => this.setState({ muscleGroup: value })}
        />
        <Dropdown
          ref={this.schedule}
          placeholder="Exercise type"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={{ marginTop: -5 }}
          inputContainerStyle={{ borderBottomWidth: 2 }}
          data={[
            { value: 'Compound'},
            { value: 'Isolation' }
          ]}
          onChangeText={value => this.setState({ type: value })}
        />
      </Container>
    )
  }
}

CustomExercise.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object.isRequired,
  uid: PropTypes.string,
  customExercises: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

function mapStateToProps(state) {
  return {
    customExercises: getCustomExercises(state),
    uid: getUid(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      buildActions: bindActionCreators(buildActions, dispatch),
      exercises: bindActionCreators(exerciseActions, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomExercise);
