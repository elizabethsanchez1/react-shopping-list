import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Button, List, ListItem } from 'react-native-elements';
import Container from '../../components/Container';
import theme from '../../styles/theme.style';
import { PrimaryButton } from '../../components/Button';
import { buildingAddExercisesAction, selectExerciseAction } from '../../actions/exercises';
import { getSelectedExercises, getSelectedExercisesByMuscleGroup } from '../../selectors/exercises';

const styles = StyleSheet.create( {
  title: {
    marginTop: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },
  list: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  white: {
    color: theme.PRIMARY_FONT_COLOR,
  },
  accent: {
    color: theme.ACCENT_YELLOW,
  },
  listItem: {
    borderBottomColor: theme.PRIMARY_FONT_COLOR,
  },
  customExercise: {
    padding: 20,
    margin: 40,
  },
} );

class ExerciseList extends Component {
  static navigationOptions = ( { navigation } ) => {
    if ( navigation.state.params && navigation.state.params.showButton ) {
      const { exerciseCount, addExercises } = navigation.state.params;

      return {
        headerRight: (
          <Button
            buttonStyle={ { backgroundColor: 'transparent' } }
            color={ theme.ACTIVE_TAB_COLOR }
            textStyle={ { fontSize: 18 } }
            title={
              ( exerciseCount > 0 )
                ? `Add( ${ exerciseCount } )`
                : 'Add'
            }
            onPress={ () => addExercises() }
          />
        ),
      };
    }

    return {};
  };

  componentDidMount() {
    if ( this.props.selectedExercises.length > 0 ) {
      this.props.navigation.setParams( {
        addExercises: this.addExercises.bind( this ),
        showButton: true,
        exerciseCount: this.props.selectedExercises.length,
      } );
    }
    else {
      this.props.navigation.setParams( {
        addExercises: this.addExercises.bind( this ),
        showButton: false,
      } );
    }
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.selectedExercises.length !== this.props.selectedExercises.length ) {
      if ( this.props.selectedExercises.length > 0 ) {
        this.props.navigation.setParams( {
          showButton: true,
          exerciseCount: this.props.selectedExercises.length,
        } );
      }
    }
  }

  addExercises = () => {
    this.props.addExercises( this.props.selectedExercises );
    this.props.navigation.navigate( 'Build' );
  };

  render() {
    return (
      <Container>
        <ScrollView>
          <View>
            <Text style={ styles.title }>
              Select all Exercises that you want to perform
            </Text>
            <List containerStyle={ styles.list }>
              <FlatList
                data={ this.props.exercises }
                renderItem={ ( { item } ) => (
                  <ListItem
                    titleStyle={
                      ( item.selected )
                        ? styles.accent
                        : styles.white
                    }
                    containerStyle={ styles.listItem }
                    hideChevron
                    title={ item.name }
                    onPress={ () => this.props.selectExercise( item ) }
                  />
                ) }
                keyExtractor={ ( item, index ) => `${ item.name + index }` }
              />
            </List>
          </View>

          <View style={ styles.customExercise }>
            <Text style={ styles.white }>
              Cant find the exercise you are looking for? Add your own custom exercise.
            </Text>

            <PrimaryButton
              title="CUSTOM EXERCISE"
              onPress={ () => this.props.navigation.navigate( 'CustomExercise' ) }
            />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

ExerciseList.propTypes = {
  exercises: PropTypes.array,
  navigation: PropTypes.object,
  selectExercise: PropTypes.func,
  selectedExercises: PropTypes.array,
  addExercises: PropTypes.func,
};

const mapStateToProps = state => ( {
  exercises: getSelectedExercisesByMuscleGroup( state ),
  selectedExercises: getSelectedExercises( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectExercise: exercise => dispatch( selectExerciseAction( exercise ) ),
  addExercises: data => dispatch( buildingAddExercisesAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ExerciseList );
