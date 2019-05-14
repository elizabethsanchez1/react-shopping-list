import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import BuildingBuildTable from '../../components/Table/BuildingBuildTable';
import { connect } from 'react-redux';
import { buildEditFieldAction } from '../../actions/building';
import { getType } from '../../selectors/building';
import { haveCustomSetsBeenAdded } from '../../selectors/exercises';
import { openCustomSetAction } from '../../actions/exercises';
import NavigationService from '../../utilities/navigationService';

const styles = StyleSheet.create( {} );

class BuildTable extends Component {
  constructor( props ) {
    super( props );
    this.state = {};
  }

  checkIfCustom = data => {
    const { exercise, exerciseSelected } = data;
    if ( haveCustomSetsBeenAdded( exercise ) ) {
      this.props.openCustomSet( {
        selectedDay: this.props.dayIndex,
        selectedExercise: exerciseSelected,
      } );
      NavigationService.navigate( 'CustomSet' );
    }
  };

  openCustomSet = data => {
    this.props.openCustomSet( data );
    NavigationService.navigate( 'CustomSet' );
  };

  render() {
    const { dayIndex, editField } = this.props;

    return (
      <BuildingBuildTable
        items={ this.props.exercises }
        updateField={
          update => editField( {
            ...update,
            selectedDay: dayIndex,
          } )
        }
        customSet={
          index => this.openCustomSet( {
            selectedExercise: index,
            selectedDay: dayIndex,
          } )
        }
        checkIfCustom={
          ( exercise, exerciseSelected ) => this.checkIfCustom( {
            exercise,
            exerciseSelected,
          } )
        }
      />
    );
  }
}

BuildTable.propTypes = {
  dayIndex: PropTypes.number,
  exercises: PropTypes.array,
  editField: PropTypes.func,
  openCustomSet: PropTypes.func,
};

const mapStateToProps = state => ( {
  type: getType( state ),
} );

const mapDispatchToProps = dispatch => ( {
  editField: update => dispatch( buildEditFieldAction( update ) ),
  openCustomSet: data => dispatch( openCustomSetAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( BuildTable );
