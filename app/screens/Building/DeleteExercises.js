import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../components/Container/index';
import { Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import theme from '../../styles/theme.style';
import { getDaysExercises, getWorkoutType } from "../../selectors/workoutsApi";
import * as program from "../../actions/program";
import * as workout from "../../actions/workout";


class DeleteExercises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exercises: {},
    };
  }

  deleteExercise = (itemIndex) => {
    this.props.actions[this.props.type].deleteExercise(itemIndex);
  };

  render() {
    return(
      <Container>
        <Text
          style={{
            fontSize: theme.FONT_SIZE_LARGE,
            color: theme.PRIMARY_FONT_COLOR,
            fontFamily: theme.PRIMARY_FONT_FAMILY,
            textAlign: 'center',
            marginTop: 20,
          }}
        >Tap on exercise to delete</Text>

        <List
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          }}
        >
          <FlatList
            data={this.props.exercises}
            renderItem={({item, index}) => (
              <ListItem
                titleStyle={{color: theme.PRIMARY_FONT_COLOR}}
                containerStyle={{borderBottomColor: 'white',}}
                hideChevron
                title={item.exercise}
                onPress={() => this.deleteExercise(index)}
              />
            )}
            keyExtractor={(item, index) => `${item.exercise + index}`}
          />
        </List>
      </Container>
    )
  }
}

DeleteExercises.propTypes = {
  actions: PropTypes.object,
  type: PropTypes.string,
  exercises: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    exercises: getDaysExercises(state),
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

export default connect(mapStateToProps, mapDispatchToProps)(DeleteExercises);
