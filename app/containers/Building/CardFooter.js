import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { ButtonBar, Link } from '../../components/Button';
import { openExerciseListAction } from '../../actions/exercises';
import NavigationService from '../../utilities/navigationService';
import { openDeleteScreenAction } from '../../actions/building';

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
    this.props.openExerciseList( selectedDay );
    NavigationService.navigate( 'MuscleGroupList' );
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
  dayIndex: PropTypes.number,
  openExerciseList: PropTypes.func,
  openDeleteScreen: PropTypes.func,
};

const mapStateToProps = state => ( {} );

const mapDispatchToProps = dispatch => ( {
  openExerciseList: data => dispatch( openExerciseListAction( data ) ),
  openDeleteScreen: data => dispatch( openDeleteScreenAction( data ) ),
} );


export default connect( mapStateToProps, mapDispatchToProps )( CardFooter );
