import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import theme from '../../styles/theme.style';
import Container from '../../components/Container';
import { LogsSelectedLogsCard } from '../../components/Card';
import Loading from '../../components/Loading';
import Tabs from '../../components/Tabs/Tabs';
import { getChangedExercises, getFormattedBodyLog, getFormattedExercises } from '../../selectors/logs';
import { updateBodyLogAction, updateWorkoutLogAction } from '../../actions/logs';
import { saveLogEdit } from '../../actions/workoutsApi';
import { getUid } from '../../selectors/authentication';
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';
import Text from '../../components/Text/Text';


class SelectedLogs extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      loading: false,
    };

    this.keyCount = 0;
  }

  static navigationOptions = ( { navigation } ) => {
    const { date } = navigation.state.params;

    return {
      title: date,
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ navigation.state.params.save }
        />
      ),
      // styling to make tabs look like part of header
      headerStyle: {
        backgroundColor: theme.SECONDARY_BACKGROUND,
        shadowOffset: { width: 0, height: 2 },
        borderBottomWidth: 0,
      },
    };
  };

  componentDidMount() {
    this.props.navigation.setParams( {
      save: this.props.save.bind( this ),
    } );
  }

  /**
   * Generate a predictable unique key for react to keep track of elements
   * @return {number}
   */
  getKey = () => {
    return ( this.keyCount += 1 );
  };

  /**
   * Body log template used inside of tabs
   * @returns {*}
   */
  bodyLogs = () => (
    <KeyboardAwareScrollView
      extraHeight={ 200 }
    >
      <FlatList
        data={ this.props.formattedBodyLog }
        renderItem={ ( { item } ) => (
          <LogsSelectedLogsCard
            title={ item.title }
            label={ item.measurement }
            value={ item.value }
            inputChanged={ text => this.props.updateBodyLog(
              { field: item.title, measurement: item.measurement, value: text },
            )
            }
          />
        ) }
        keyExtractor={ item => item.title }
      />
    </KeyboardAwareScrollView>
  );

  updateField = ( change, exerciseLocation ) => {
    const { set, ...otherProps } = change;
    const formattedObject = { setLocation: set, ...otherProps, exerciseLocation };

    this.props.updateWorkoutLog( formattedObject );
  };


  /**
   * Workout log template used inside of tabs
   * @returns {*}
   */
  workoutLogs = () => (
    <Container scroll containerStyling={ { padding: 20 } }>
      <KeyboardAwareScrollView>
        <Text size='medium'>
          {
            ( this.props.formattedExercises.length > 0 )
              ? 'Workout log Page'
              : 'No tracked workouts'
          }
        </Text>
        <FlatList
          data={ this.props.formattedExercises }
          renderItem={ ( { item, index } ) => (
            <React.Fragment>
              <Text size="medium">{item.name}</Text>
              <ExerciseInputTable
                items={ item.sets }
                updateField={ change => this.updateField( change, index ) }
                disableAutoJump
              />
            </React.Fragment>
          ) }
          keyExtractor={ item => `${item.name} ${this.getKey()}` }
        />
      </KeyboardAwareScrollView>
    </Container>
  );


  render() {
    const { loading } = this.props.profile;

    if ( loading ) {
      return (
        <Loading />
      );
    }

    return (
      <Container>
        <Tabs
          routes={ [
            { key: 'first', title: 'Workout Logs' },
            { key: 'second', title: 'Body Logs' },
          ] }
          subViews={ {
            first: this.workoutLogs,
            second: this.bodyLogs,
          } }
        />
      </Container>
    );
  }
}

SelectedLogs.propTypes = {
  navigation: PropTypes.object.isRequired,
  authReducer: PropTypes.object,
};

const mapStateToProps = ( state, containerProps ) => {
  return {
    profile: state.profile,
    authReducer: state.authReducer,
    formattedExercises: getFormattedExercises( state ),
    formattedBodyLog: getFormattedBodyLog( state ),
    changedExercises: getChangedExercises( state ),
    uid: getUid( state ),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateWorkoutLog: change => dispatch( updateWorkoutLogAction( change ) ),
    updateBodyLog: change => dispatch( updateBodyLogAction( change ) ),
    save: changes => dispatch( saveLogEdit( changes ) ),

  };
};

export default connect( mapStateToProps, mapDispatchToProps )( SelectedLogs );
