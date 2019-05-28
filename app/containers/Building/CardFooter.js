import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ButtonBar, Link } from '../../components/Button';
import { buildingAddExercisesAction, setUpExerciseListAction } from '../../actions/exercises';
import NavigationService from '../../utilities/navigationService';
import { buildSelectDayAction, openDeleteScreenAction } from '../../actions/building';
import { getExerciseList } from '../../selectors/exerciseList';

const styles = StyleSheet.create( {
  linkContainer: {
    alignItems: 'flex-start',
    marginBottom: 10,
  },
} );

class CardFooter extends Component {
  constructor( props ) {
    super( props );
    this.state = { };
  }

  addExercises = selectedDay => {
    this.props.selectDay( { selectedDay } );
    this.props.setUpExerciseList( this.props.exerciseList );
    NavigationService.navigate( 'MuscleGroupList', {
      add: data => buildingAddExercisesAction( data ),
      initialPage: 'Build',
    } );
  };

  deleteExercises = selectedDay => {
    this.props.openDeleteScreen( { selectedDay } );
    NavigationService.navigate( 'DeleteExercises' );
  };

  render() {
    const { exercises, dayIndex } = this.props;

    return (
      <View>
        {
          ( exercises.length !== 0 )
          && (
            <View style={ styles.linkContainer }>
              <Link
                title="Sort Exercises"
                onPress={ () => NavigationService.navigate( 'Sort' ) }
              />
            </View>
          )
        }

        <ButtonBar
          title1="ADD ITEM"
          onPress1={ () => this.addExercises( dayIndex ) }
          title2="DELETE ITEM"
          onPress2={ () => this.deleteExercises( dayIndex ) }
        />
      </View>
    );
  }
}

CardFooter.propTypes = {
  exercises: PropTypes.array,
  exerciseList: PropTypes.object,
  dayIndex: PropTypes.number,
  openDeleteScreen: PropTypes.func,
  selectDay: PropTypes.func,
  setUpExerciseList: PropTypes.func,
};

const mapStateToProps = state => ( {
  exerciseList: getExerciseList( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectDay: data => dispatch( buildSelectDayAction( data ) ),
  setUpExerciseList: data => dispatch( setUpExerciseListAction( data ) ),
  openDeleteScreen: data => dispatch( openDeleteScreenAction( data ) ),
  addExercises: data => dispatch( buid )
} );


export default connect( mapStateToProps, mapDispatchToProps )( CardFooter );
