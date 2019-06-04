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
  getBodyLogsBySelectedLogDay,
  getChangedExercises, getExercisesBySelectedLogDay, getLogChanges,
  getLogSelectedDay,
} from '../../selectors/logs';
import { logUpdateWorkoutAction, logUpdateBodyLogAction } from '../../actions/logs';
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
    const { date, save, changes } = navigation.state.params || {};
    return {
      title: date,
      headerRight: (
        <Button
          buttonStyle={ styles.navigationButton }
          color={ ( changes ) ? theme.ACTIVE_TAB_COLOR : theme.DISABLED_TEXT_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ ( changes ) ? save : '' }
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
      changes: this.props.changes,
    } );
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.changes !== this.props.changes ) {
      this.props.navigation.setParams( {
        save: this.props.save,
        date: this.props.selectedDay,
        changes: this.props.changes,
      } );
    }
  }

  bodyLogs = () => (
    <KeyboardAwareScrollView extraHeight={ 200 }>
      <FlatList
        data={ this.props.bodyLogs }
        renderItem={ ( { item } ) => (
          <LogsSelectedLogsCard
            title={ item.title }
            label={ item.measurement }
            value={ item.value }
            inputChanged={ text => {
              this.props.updateBodyLog( {
                ...item,
                value: text,
              } );
            } }
          />
        ) }
        keyExtractor={ item => item.title }
      />
    </KeyboardAwareScrollView>
  );

  updateWorkoutLog = ( change, exerciseLocation ) => {
    const { set, ...otherProps } = change;
    const formattedObject = { setLocation: set, ...otherProps, exerciseLocation };
    this.props.updateWorkoutLog( formattedObject );
  };

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
                updateField={ change => this.updateWorkoutLog( change, index ) }
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
  bodyLogs: PropTypes.array,
  updateBodyLog: PropTypes.func,
  changes: PropTypes.bool,
};

const mapStateToProps = state => ( {
  selectedDay: getLogSelectedDay( state ),
  exercises: getExercisesBySelectedLogDay( state ),
  bodyLogs: getBodyLogsBySelectedLogDay( state ),
  changes: getLogChanges( state ),
} );

const mapDispatchToProps = dispatch => ( {
  updateWorkoutLog: change => dispatch( logUpdateWorkoutAction( change ) ),
  updateBodyLog: change => dispatch( logUpdateBodyLogAction( change ) ),
  save: changes => dispatch( saveLogEdit( changes ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( SelectedLogs );
