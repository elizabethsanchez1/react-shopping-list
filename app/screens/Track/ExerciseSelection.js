import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, FlatList} from 'react-native';
import {Button, List, ListItem} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import Container from '../../components/Container/index';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/track';
import {markProgramCompletedFlags} from '../../actions/track';
import theme from '../../styles/theme.style';
import {
  getBuildHistoryFlag,
  getCompletedExercises,
  getProgram,
  getProgramWeeks, getSelectedData, getTracksSelectedDay, getTracksSelectedWeek,
} from "../../selectors/track";
import {Loading} from '../../components/Loading';


class ExerciseSelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      program: {},
      data: [],
      weeks: true,
    };
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerLeft: (
        <Button
          title="Back"
          containerViewStyle={{
            marginLeft: 0,
          }}
          buttonStyle={{
            backgroundColor: 'transparent',
            padding: 5,
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 0,
          }}
          color={theme.ACTIVE_TAB_COLOR}
          textStyle={{fontSize: 18}}
          icon={{
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: {marginRight: -5, marginLeft: -5, marginTop: -3},
          }}
          onPress={() => navigation.goBack()}
        />
      )
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({goBack: this.handleBack});
    this.props.markProgramCompletedFlags(
      this.props.selectedData,
      this.props.completedExercises,
    );
  }

  handleBack = () => {
    const {weeks} = this.state;

    if (weeks) {
      this.props.navigation.navigate('TrackDashboard');
    } else {

      this.setState({
        data: this.props.programWeeks,
        weeks: true,
      });
    }
  };

  changeData = (item, index) => {
    const {weeks} = this.state;

    if (weeks) {
      this.props.actions.selectedWeek(item.week);
      this.setState({
        data: this.props.program[`week${index + 1}`],
        weeks: false,
      })
    } else {
      //send them to the tracker page
      this.props.actions.selectedDay(index);


      if (this.props.buildHistory) {
        this.props.actions.buildExerciseHistory(
          this.props.selectedData,
          this.props.selectedWeek,
          this.props.selectedDay,
          this.props.completedExercises,
        );
      }

      this.props.navigation.navigate('Tracker');
    }
  };

  formatTitle = (item) => {
    if (this.state.weeks) {
      if (item.currentWeek) {
        return `${item.label} --- Current Week`
      }

      if (item.completed) {
        return `${item.label} Completed`
      }

      return `${item.label}`
    }

    return `${item.day}`;
  };

  render() {
    const {data, weeks} = this.state;
    console.log('props in exercises selection', this.props);

    return (
      <Container>
        <List
          containerStyle={{
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          }}
        >
          <FlatList
            data={(weeks) ? this.props.programWeeks : data}
            renderItem={({item, index}) => (
              <ListItem
                titleStyle={{color: 'white'}}
                containerStyle={{borderBottomColor: 'white',}}
                chevronColor={'white'}
                title={this.formatTitle(item)}
                onPress={() => this.changeData(item, index)}
                disabled={item.completed}
              />
            )}
            keyExtractor={(item) => (weeks) ? item.label : item.day}
          />
        </List>
      </Container>
    )
  }
}

ExerciseSelection.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  programWeeks: PropTypes.array,
  completedExercises: PropTypes.array,
  buildHistory: PropTypes.bool,
  program: PropTypes.object,
  exercises: PropTypes.array,
  selectedData: PropTypes.object,
  selectedWeek: PropTypes.string,
  selectedDay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

function mapStateToProps(state) {
  return {
    programWeeks: getProgramWeeks(state),
    program: getProgram(state),
    completedExercises: getCompletedExercises(state),
    buildHistory: getBuildHistoryFlag(state),
    selectedData: getSelectedData(state),
    selectedDay: getTracksSelectedDay(state),
    selectedWeek: getTracksSelectedWeek(state),
    //  exercises: getTrackExercises(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
    markProgramCompletedFlags: (data, exercises) => dispatch(markProgramCompletedFlags(data, exercises)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSelection);
