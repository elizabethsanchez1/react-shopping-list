import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, FlatList } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import theme from '../../styles/theme.style';
import { getExercisesBySelectedDay } from '../../selectors/building';
import { buildDeleteExerciseAction } from '../../actions/building';


class DeleteExercises extends Component {

  deleteExercise = deleteIndex => this.props.deleteExercise( { deleteIndex } );

  render() {
    return (
      <Container>
        <Text
          style={ {
            fontSize: theme.FONT_SIZE_LARGE,
            color: theme.PRIMARY_FONT_COLOR,
            fontFamily: theme.PRIMARY_FONT_FAMILY,
            textAlign: 'center',
            marginTop: 20,
          } }
        >Tap on exercise to delete
        </Text>

        <List
          containerStyle={ {
            backgroundColor: 'transparent',
            borderTopWidth: 0,
          } }
        >
          <FlatList
            data={ this.props.exercises }
            renderItem={ ( { item, index } ) => (
              <ListItem
                titleStyle={ { color: theme.PRIMARY_FONT_COLOR } }
                containerStyle={ { borderBottomColor: 'white' } }
                hideChevron
                title={ item.name }
                onPress={ () => this.deleteExercise( index ) }
              />
            ) }
            keyExtractor={ ( item, index ) => `${ item.name + index }` }
          />
        </List>
      </Container>
    );
  }
}

DeleteExercises.propTypes = {
  exercises: PropTypes.array,
  deleteExercise: PropTypes.func,
};

const mapStateToProps = state => ( {
  exercises: getExercisesBySelectedDay( state ),
} );

const mapDispatchToProps = dispatch => ( {
  deleteExercise: data => dispatch( buildDeleteExerciseAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( DeleteExercises );
