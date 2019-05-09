import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { List, ListItem } from 'react-native-elements';
import Container from '../../components/Container';
import theme from '../../styles/theme.style';
import { getExercisesByMuscleGroup } from '../../selectors/exerciseList';
import { PrimaryButton } from '../../components/Button';
import { selectExerciseAction } from '../../actions/exercises';

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
  constructor( props ) {
    super( props );
    this.state = {};
  }


  selectExercise = exercise => {
    console.log( 'selected exercise: ', exercise );
  };

  render() {
    console.log( 'ExerciseList props', this.props );

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
                renderItem={ ( { item, index } ) => (
                  <ListItem
                    titleStyle={ ( item.selected ) ? styles.accent : styles.white }
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
};

const mapStateToProps = state => ( {
  exercises: getExercisesByMuscleGroup( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectExercise: exercise => dispatch( selectExerciseAction( exercise ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ExerciseList );
