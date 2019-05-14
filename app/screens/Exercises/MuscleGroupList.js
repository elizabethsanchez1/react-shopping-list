import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, List, ListItem } from 'react-native-elements/src/index';
import { StyleSheet, View, Text, FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Container from '../../components/Container';
import theme from '../../styles/theme.style';
import { muscleGroupSeparatedExercises } from '../../config/baseExerciseList';
import { PrimaryButton } from '../../components/Button';
import { buildingAddExercisesAction, selectMuscleGroupAction } from '../../actions/exercises';
import { getSelectedExercises } from '../../selectors/exercises';

const styles = StyleSheet.create( {
  container: {
    flexDirection: 'row',
    padding: 15,
  },
  titleContainer: {
    width: '30%',
    marginTop: 35,
  },
  title: {
    fontSize: theme.FONT_SIZE_LARGE,
    color: theme.ACCENT_YELLOW,
  },
  listContainer: {
    width: '70%',
    paddingLeft: 20,
  },
  listComponent: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  listItem: {
    borderBottomColor: 'white',
  },
  white: {
    color: theme.PRIMARY_FONT_COLOR,
  },
  customExercise: {
    padding: 20,
    margin: 40,
  },
} );

class MuscleGroupList extends Component {
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
    this.props.navigation.setParams( {
      addExercises: this.addExercises.bind( this ),
      showButton: false,
    } );
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

  selectMuscleGroup = muscleGroup => {
    this.props.selectMuscleGroup( muscleGroup );
    this.props.navigation.navigate( 'ExerciseList' );
  };

  render() {
    const { upperBodyMuscles, lowerBodyMuscles } = muscleGroupSeparatedExercises;

    return (
      <Container>
        <ScrollView>

          <View style={ styles.container }>

            <View style={ styles.titleContainer }>
              <Text style={ styles.title }>Upper Body</Text>
            </View>

            <View style={ styles.listContainer }>
              <List containerStyle={ styles.listComponent }>
                <FlatList
                  data={ upperBodyMuscles }
                  renderItem={ ( { item } ) => (
                    <ListItem
                      titleStyle={ styles.white }
                      containerStyle={ styles.listItem }
                      chevronColor={ theme.PRIMARY_FONT_COLOR }
                      title={ item.exercise }
                      onPress={ () => this.selectMuscleGroup( item.exercise ) }
                    />
                  ) }
                  keyExtractor={ ( item, index ) => `${ item.exercise + index }` }
                />
              </List>
            </View>

          </View>

          <View style={ styles.container }>

            <View style={ styles.titleContainer }>
              <Text style={ styles.title }>Lower Body</Text>
            </View>

            <View style={ styles.listContainer }>
              <List containerStyle={ styles.listComponent }>
                <FlatList
                  data={ lowerBodyMuscles }
                  renderItem={ ( { item } ) => (
                    <ListItem
                      titleStyle={ styles.white }
                      containerStyle={ styles.listItem }
                      chevronColor={ theme.PRIMARY_FONT_COLOR }
                      title={ item.exercise }
                      onPress={ () => this.selectMuscleGroup( item.exercise ) }
                    />
                  ) }
                  keyExtractor={ ( item, index ) => `${ item.exercise + index }` }
                />
              </List>
            </View>
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

MuscleGroupList.propTypes = {
  navigation: PropTypes.object,
  selectMuscleGroup: PropTypes.func,
  selectedExercises: PropTypes.array,
  addExercises: PropTypes.func,
};

const mapStateToProps = state => ( {
  selectedExercises: getSelectedExercises( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectMuscleGroup: muscle => dispatch( selectMuscleGroupAction( muscle ) ),
  addExercises: data => dispatch( buildingAddExercisesAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( MuscleGroupList );
