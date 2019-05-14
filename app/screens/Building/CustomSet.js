import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import theme from '../../styles/theme.style';
import Container from '../../components/Container/index';
import { PrimaryButton } from '../../components/Button';
import { getWorkoutType } from '../../selectors/workoutsApi';
import * as program from '../../actions/program';
import * as workout from '../../actions/workout';
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';
import { formatCustomSets, getCustomSetExercise, getCustomSetExerciseSets } from '../../selectors/exercises';
import { saveCustomSetAction } from '../../actions/exercises';


class CustomSet extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      sets: props.exerciseSets,
    };

    this.weight = React.createRef();
    this.reps = React.createRef();
  }

  static navigationOptions = ( { navigation } ) => {
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ () => navigation.state.params.saveExercise() }
        />
      ),
    };
  };

  componentDidMount() {
    this.props.navigation.setParams( {
      saveExercise: this.saveExercise.bind( this ),
    } );
    // const sets = [];
    // const defaultSets = 3;
    // const exercise = Object.assign( {}, this.props.exercise );
    //
    // if ( exercise.weight.indexOf( '-' ) === -1 ) {
    //
    //   const length = ( exercise.sets === '' ) ? defaultSets : exercise.sets;
    //   const { weight } = exercise;
    //   const { reps } = exercise;
    //
    //   for ( let i = 0; i < length; i += 1 ) {
    //     sets.push( {
    //       set: i + 1,
    //       weight,
    //       reps,
    //     } );
    //   }
    // } else {
    //   const { length } = exercise.customSet;
    //   for ( let i = 0; i < length; i += 1 ) {
    //     sets.push( {
    //       set: i + 1,
    //       weight: exercise.customSet[ i ].weight,
    //       reps: exercise.customSet[ i ].reps,
    //     } );
    //   }
    // }
    //
    // this.setState( { sets } );
  }

  saveExercise = () => {
    const formattedExercise = formatCustomSets( {
      sets: this.state.sets,
      exercise: this.props.exercise,
    } );

    this.props.saveCustomSet( formattedExercise );
    // this.props.actions[ this.props.type ].saveCustomSet( formattedExercise );
    this.props.navigation.navigate( 'Build' );
  };

  updateField = ( change, location ) => {
    const { sets } = this.state;
    sets[ location ][ change.field ] = change.value;

    this.setState( { sets } );
  };

  addSet = () => {
    const { sets } = this.state;
    const updatedSets = [ ...sets ];
    const newSet = {
      set: sets.length + 1,
      weight: '',
      reps: '',
    };
    updatedSets.push( newSet );

    this.setState( { sets: updatedSets } );
  };

  deleteSet = () => {
    const { sets } = this.state;
    const updatedSets = [ ...sets ];
    updatedSets.pop();

    this.setState( { sets: updatedSets } );
  };

  render() {
    console.log( 'Custom set state: ', this.state );
    console.log( 'Custom set props: ', this.props );

    return (
      <Container containerStyling={ { paddingLeft: 20, paddingRight: 20 } }>
        <KeyboardAwareScrollView>
          <Text
            style={ {
              fontSize: theme.FONT_SIZE_LARGE,
              color: theme.PRIMARY_FONT_COLOR,
              fontFamily: theme.PRIMARY_FONT_FAMILY,
              marginTop: 60,
            } }
          >
            { this.props.exercise.name }
          </Text>

          <ExerciseInputTable
            items={ this.state.sets }
            updateField={ ( change, index ) => this.updateField( change, index ) }
          />

          <View style={ { flexDirection: 'row' } }>
            <PrimaryButton
              title="ADD SET"
              containerViewStyle={ { marginLeft: 0 } }
              onPress={ this.addSet }
            />
            <PrimaryButton
              title="DELETE SET"
              onPress={ this.deleteSet }
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

CustomSet.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  exercise: PropTypes.object,
  exerciseSets: PropTypes.array,
  saveCustomSet: PropTypes.func,
  type: PropTypes.string,
};

const mapStateToProps = state => ( {
  type: getWorkoutType( state ),
  exercise: getCustomSetExercise( state ),
  exerciseSets: getCustomSetExerciseSets( state ),
} );

const mapDispatchToProps = dispatch => ( {
  actions: {
    program: bindActionCreators( program, dispatch ),
    workout: bindActionCreators( workout, dispatch ),
  },
  saveCustomSet: data => dispatch( saveCustomSetAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( CustomSet );
