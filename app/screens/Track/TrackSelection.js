import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/track';
import Container from '../../components/Container/index';
import { Dropdown } from 'react-native-material-dropdown';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';

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

class TrackSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      program: '',
      workout: '',
      continueProgram: '',
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
          onPress={() => navigation.state.params.beginTracking()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      beginTracking: this.beginTracking
    });
  }

  beginTracking = () => {
    if (this.state.continueProgram) {
      this.props.actions.continueProgram();
    } else {
      this.props.actions.resetProgram();
    }
    this.props.navigation.navigate('ExerciseSelection');
  };

  storeAnswer = (question, answer) => {
    const continueProgram = (answer === 'Continue selected program');
    this.setState({ continueProgram })
  };


  render() {
    return (
      <Container containerStyling={{padding: 20, paddingTop: 30}}>
        <Dropdown
          ref={this.schedule}
          placeholder="Continue or begin from scratch"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={{ marginTop: -5 }}
          inputContainerStyle={{ borderBottomWidth: 2 }}
          data={[
            { value: 'Continue selected program' },
            { value: 'Begin selected program from beginning'}
          ]}
          onChangeText={(text) => this.storeAnswer('continue', text)}
        />
      </Container>
    )
  }
}

TrackSelection.propTypes = {
  actions: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackSelection);