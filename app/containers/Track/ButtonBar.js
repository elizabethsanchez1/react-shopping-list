import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import theme from '../../styles/theme.style';
import { modifySetsAction } from '../../actions/track';
import { getTrackSets } from '../../selectors/track';
import NavigationService from '../../utilities/navigationService';
import { openExerciseListAction } from '../../actions/exercises';

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
    const { sets, currentIndex, openExerciseList } = this.props;
    const showRemoveOption = ( sets.length > 1 );
    const options = {
      options: [ 'Cancel', 'Remove This Exercise', 'Add Exercise' ],
      destructiveButtonIndex: 1,
      cancelButtonIndex: 0,
    };
    const reducedOptions = {
      options: [ 'Cancel', 'Add Exercise' ],
      cancelButtonIndex: 0,
    };

    ActionSheetIOS.showActionSheetWithOptions(
      ( showRemoveOption ) ? options : reducedOptions,
      buttonIndex => {

        if ( showRemoveOption ) {
          if ( buttonIndex === 1 ) {
            // this.setState( {
            //   currentIndex: ( currentIndex !== 0 )
            //     ? currentIndex - 1
            //     : currentIndex,
            // } );

            // this.props.trackActions.removeExercise(
            //   selectedData,
            //   type,
            //   selectedWeek,
            //   selectedDay,
            //   currentIndex,
            //   exerciseSets,
            // );
          }

          if ( buttonIndex === 2 ) {
            openExerciseList();
            NavigationService.navigate( 'MuscleGroupList' );
            // this.props.trackActions.storeAddExerciseIndex( currentIndex + 1 );
            // this.props.navigation.navigate( 'TrackMuscleGroupList' );
          }
        }

        if ( !showRemoveOption ) {
          if ( buttonIndex === 1 ) {
            // this.props.trackActions.storeAddExerciseIndex( currentIndex + 1 );
            // this.props.navigation.navigate( 'TrackMuscleGroupList' );
          }
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
  sets: PropTypes.array,
  openExerciseList: PropTypes.func,
};

const mapStateToProps = state => ( {
  sets: getTrackSets( state ),
} );

const mapDispatchToProps = dispatch => ( {
  modifySets: data => dispatch( modifySetsAction( data ) ),
  openExerciseList: () => dispatch( openExerciseListAction() ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ButtonBar );
