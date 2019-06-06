import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from 'react-native-elements/src/index';
import Container from '../../components/Container';
import theme from '../../styles/theme.style';
import { muscleGroupFormatCustomExercise } from '../../selectors/exercises';
import { addCustomExerciseRequestAction } from '../../actions/exercises';

const styles = StyleSheet.create( {
  input: {
    borderBottomColor: theme.BORDER_COLOR,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    height: 40,
    fontSize: 16,
    marginBottom: 25,
    color: theme.PRIMARY_FONT_COLOR,
  },
} );

class CustomExercise extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ () => navigation.state.params.save() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      name: '',
      muscleGroup: '',
      compound: '',
      isolation: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams( {
      save: this.saveExercise.bind( this ),
    } );
  }

  saveExercise = () => {
    this.props.addCustomExercise( this.state );
  };

  render() {

    return (
      <Container containerStyling={ { padding: 20, paddingTop: 30 } }>
        <TextInput
          style={ styles.input }
          placeholderTextColor="white"
          placeholder="Exercise name"
          returnKeyType="done"
          autoCapitalize="words"
          onEndEditing={ text => this.setState( { name: text.nativeEvent.text } ) }
        />
        <Dropdown
          ref={ this.schedule }
          placeholder="Muscle group type"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={ { marginTop: -25 } }
          inputContainerStyle={ { borderBottomWidth: 2 } }
          data={ this.props.muscleGroupOptions }
          onChangeText={ value => this.setState( { muscleGroup: value } ) }
        />
        <Dropdown
          ref={ this.schedule }
          placeholder="Exercise type"
          placeholderTextColor="white"
          baseColor='white'
          textColor='white'
          selectedItemColor='black'
          containerStyle={ { marginTop: -5 } }
          inputContainerStyle={ { borderBottomWidth: 2 } }
          data={ [
            { value: 'Compound' },
            { value: 'Isolation' },
          ] }
          onChangeText={
            value => {
              if ( value === 'Compound' ) {
                this.setState( { compound: true, isolation: false } );
              }
              else {
                this.setState( { compound: false, isolation: true } );
              }
            }
          }
        />
      </Container>
    );
  }
}

CustomExercise.propTypes = {
  navigation: PropTypes.object,
  muscleGroupOptions: PropTypes.array,
  addCustomExercise: PropTypes.func,
};

const mapStateToProps = state => ( {
  muscleGroupOptions: muscleGroupFormatCustomExercise(),
} );

const mapDispatchToProps = dispatch => ( {
  addCustomExercise: data => dispatch( addCustomExerciseRequestAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( CustomExercise );
