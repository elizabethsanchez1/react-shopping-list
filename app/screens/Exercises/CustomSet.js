import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view/index';
import { connect } from 'react-redux';
import { Button } from 'react-native-elements/src/index';
import theme from '../../styles/theme.style';
import Container from '../../components/Container';
import { PrimaryButton } from '../../components/Button';
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';
import { formatCustomSets, getCustomSetExercise, getCustomSetExerciseSets } from '../../selectors/exercises';
import { saveCustomSetAction } from '../../actions/exercises';


class CustomSet extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Add'
          onPress={ () => navigation.state.params.addExercise() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      sets: props.exerciseSets,
    };

    this.weight = React.createRef();
    this.reps = React.createRef();
  }

  componentDidMount() {
    this.props.navigation.setParams( {
      addExercise: this.addExercise.bind( this ),
    } );
  }

  addExercise = () => {
    const formattedExercise = formatCustomSets( {
      sets: this.state.sets,
      exercise: this.props.exercise,
    } );

    this.props.saveCustomSet( formattedExercise );
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
  exercise: PropTypes.object,
  exerciseSets: PropTypes.array,
  saveCustomSet: PropTypes.func,
};

const mapStateToProps = state => ( {
  exercise: getCustomSetExercise( state ),
  exerciseSets: getCustomSetExerciseSets( state ),
} );

const mapDispatchToProps = dispatch => ( {
  saveCustomSet: data => dispatch( saveCustomSetAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( CustomSet );
