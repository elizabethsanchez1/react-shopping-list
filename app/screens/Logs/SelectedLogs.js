import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements';
import theme from '../../styles/theme.style';
import Container from '../../components/Container';
import { LogsSelectedLogsCard } from '../../components/Card';
import Loading from '../../components/Loading';
import Tabs from '../../components/Tabs/Tabs';
import {
  getChangedExercises, getExercisesBySelectedLogDay,
  getFormattedBodyLog,
  getFormattedExercises,
  getLogSelectedDay
} from '../../selectors/logs';
import { logUpdateWorkoutAction, updateBodyLogAction, updateWorkoutLogAction } from '../../actions/logs';
import { saveLogEdit } from '../../actions/workoutsApi';
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';
import Text from '../../components/Text/Text';

const styles = StyleSheet.create( {
  headerStyle: {
    backgroundColor: theme.SECONDARY_BACKGROUND,
    shadowOffset: { width: 0, height: 2 },
    borderBottomWidth: 0,
  },
  navigationButton: { backgroundColor: 'transparent' },
} );

class SelectedLogs extends Component {
  static navigationOptions = ( { navigation } ) => {
    const { date, save } = navigation.state.params || {};
    return {
      title: date,
      headerRight: (
        <Button
          buttonStyle={ styles.navigationButton }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ save }
        />
      ),
      // styling to make tabs look like part of header
      headerStyle: styles.headerStyle,
    };
  };

  componentDidMount() {
    this.props.navigation.setParams( {
      save: this.props.save,
      date: this.props.selectedDay,
    } );
  }

  /**
   * Body log template used inside of tabs
   * @returns {*}
   */
  bodyLogs = () => (
    <KeyboardAwareScrollView
      extraHeight={ 200 }
    >
      <FlatList
        // data={ this.props.formattedBodyLog }
        date={ [] }
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

    console.log( 'formatted object', formattedObject );
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
            ( this.props.exercises.length > 0 )
              ? 'Workout log Page'
              : 'No tracked workouts'
          }
        </Text>
        <FlatList
          data={ this.props.exercises }
          renderItem={ ( { item, index } ) => (
            <View>
              <Text size="medium">{ item.name }</Text>
              <ExerciseInputTable
                items={ item.sets }
                updateField={ change => this.updateField( change, index ) }
                disableAutoJump
              />
            </View>
          ) }
          keyExtractor={ ( item, index ) => `${ item.name } ${ index }` }
        />
      </KeyboardAwareScrollView>
    </Container>
  );


  render() {
    console.log( 'selectedLogs props: ', this.props );
    // const { loading } = this.props.profile;

    // if ( loading ) {
    //   return (
    //     <Loading />
    //   );
    // }

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
  selectedDay: PropTypes.string,
  exercises: PropTypes.array,
  save: PropTypes.func,
  updateWorkoutLog: PropTypes.func,
};

const mapStateToProps = state => ( {
  selectedDay: getLogSelectedDay( state ),
  exercises: getExercisesBySelectedLogDay( state ),

  // profile: state.profile,
  // authReducer: state.authReducer,
  // formattedExercises: getFormattedExercises( state ),
  // formattedBodyLog: getFormattedBodyLog( state ),
  // changedExercises: getChangedExercises( state ),
  // uid: getUid( state ),
} );

const mapDispatchToProps = dispatch => ( {
  updateWorkoutLog: change => dispatch( logUpdateWorkoutAction( change ) ),
  updateBodyLog: change => dispatch( updateBodyLogAction( change ) ),
  save: changes => dispatch( saveLogEdit( changes ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( SelectedLogs );
