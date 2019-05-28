import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import theme from '../../styles/theme.style';
import {
  modifySetsAction,
  trackAddExerciseIndexAction,
  trackAddExercisesAction,
  trackRemoveExerciseAction
} from '../../actions/track';
import NavigationService from '../../utilities/navigationService';
import { setUpExerciseListAction } from '../../actions/exercises';
import { getExerciseList } from '../../selectors/exerciseList';

const styles = StyleSheet.create( {
  container: { flexDirection: 'row' },
  buttonStyle: {
    width: '33.3%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: theme.PRIMARY_BACKGROUND,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: theme.ACTIVE_TAB_COLOR,
  },
  disabledStyle: {
    fontSize: 16,
    color: 'gray',
  },
} );

class ButtonBar extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  editSets = () => {
    const { currentIndex, modifySets } = this.props;
    ActionSheetIOS.showActionSheetWithOptions( {
      options: [ 'Cancel', 'Remove Set', 'Add Set' ],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    },
    buttonIndex => {
      if ( buttonIndex === 1 ) {
        modifySets( {
          index: currentIndex,
          option: 'remove',
        } );
      }

      if ( buttonIndex === 2 ) {
        modifySets( {
          index: currentIndex,
          option: 'add',
        } );
      }
    } );
  };

  editExercises = () => {
    const { currentIndex, setUpExerciseList, exerciseList, addExerciseIndex, updateIndex, removeExercise } = this.props;
    const options = {
      options: [ 'Cancel', 'Remove This Exercise', 'Add Exercise' ],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    };

    ActionSheetIOS.showActionSheetWithOptions(
      options,
      buttonIndex => {

        if ( buttonIndex === 1 ) {
          removeExercise( currentIndex );
        }

        if ( buttonIndex === 2 ) {
          setUpExerciseList( exerciseList );
          addExerciseIndex( { exercise: currentIndex } );
          NavigationService.navigate( 'MuscleGroupList', {
            add: data => {
              updateIndex( currentIndex + 1 );
              return trackAddExercisesAction( data );
            },
            initialPage: 'Tracker',
          } );
        }
      },
    );
  };

  render() {
    return (
      <View style={ styles.container }>

        <TouchableOpacity
          style={ styles.buttonStyle }
          onPress={ () => this.editSets() }
        >
          <Text style={ styles.buttonText }>Edit sets</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ styles.buttonStyle }
          onPress={ () => this.editExercises() }
        >
          <Text style={ styles.buttonText }>Edit exercises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ [ styles.buttonStyle, { borderRightWidth: 0 } ] }
          // disabled={ ( !( targetWeight && targetReps ) ) }
          onPress={ () => this.quickTrack() }
        >
          <Text
            style={ styles.buttonText }
            // style={
            //   ( targetWeight && targetReps ) ? styles.buttonText : styles.disabledStyle
            // }
          >
            Quick track
          </Text>
        </TouchableOpacity>

      </View>
    );
  }
}

ButtonBar.propTypes = {
  currentIndex: PropTypes.number,
  modifySets: PropTypes.func,
  exerciseList: PropTypes.object,
  setUpExerciseList: PropTypes.func,
  addExerciseIndex: PropTypes.func,
  updateIndex: PropTypes.func,
  removeExercise: PropTypes.func,
};

const mapStateToProps = state => ( {
  exerciseList: getExerciseList( state ),
} );

const mapDispatchToProps = dispatch => ( {
  modifySets: data => dispatch( modifySetsAction( data ) ),
  setUpExerciseList: data => dispatch( setUpExerciseListAction( data ) ),
  addExerciseIndex: data => dispatch( trackAddExerciseIndexAction( data ) ),
  removeExercise: data => dispatch( trackRemoveExerciseAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ButtonBar );
