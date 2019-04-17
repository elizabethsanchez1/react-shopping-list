import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '../../components/Container/index';
import SortableList from '../../containers/Building/SortSortableList';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as programActions from '../../actions/program';
import * as workoutActions from '../../actions/workout';
import { getWorkoutType, getDaysExercises } from "../../selectors/workoutsApi";


class Sort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      nextOrder: [],
      previousLocation: '',
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
          onPress={() => navigation.state.params.saveOrder()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({
      saveOrder: this.saveOrder.bind(this),
    });

    this.setState({
      data: this.formatExercises(this.props.exercises),
    })
  }

  setLocation = (item) => {
    const { nextOrder } = this.state;

    if (nextOrder.length) {
      this.setState({
        previousLocation: nextOrder.indexOf(item),
      });
    } else {
      this.setState({
        previousLocation: item,
      });
    }
  };

  orderChanged = () => {};

  saveOrder = () => {
    this.props.actions[this.props.type].saveSortedOrder(this.state.nextOrder);
    this.props.navigation.navigate('Build');
  };

  formatExercises = (exercises) => {
    let exerciseCopy = JSON.parse(JSON.stringify(exercises));
    const filteredData = exerciseCopy.map(item => {
      Object.keys(item).forEach(property => {
        if (property !== 'exercise') {
          delete item[property];
        }
      });

      return item;
    });

    const data = {};
    for (let i = 0; i < filteredData.length; i += 1) {
      data[i] = filteredData[i];
    }

    return data;
  };

  render() {
    return(
      <Container>
       <SortableList
         data={this.state.data}
         onChangeOrder={(nextOrder) => this.setState({nextOrder})}
         onActivateRow={(key) => this.setLocation(key)}
         onReleaseRow={(key) => this.orderChanged(key)}
       />
      </Container>
    )
  }
}

Sort.propTypes = {
  buildReducer: PropTypes.object,
  navigation: PropTypes.object,
  actions: PropTypes.object,
  exercises: PropTypes.array,
  type: PropTypes.string,
};


function mapStateToProps(state) {
  return {
    type: getWorkoutType(state),
    exercises: getDaysExercises(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      program: bindActionCreators(programActions, dispatch),
      workout: bindActionCreators(workoutActions, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
