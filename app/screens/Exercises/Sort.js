import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-native-elements/src/index';
import { connect } from 'react-redux';
import Container from '../../components/Container';
import SortableList from '../../containers/Building/SortSortableList';
import theme from '../../styles/theme.style';
import { getSortableExerciseList } from '../../selectors/exercises';
import { buildUpdateExerciseOrderAction } from '../../actions/building';

class Sort extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ () => navigation.state.params.saveOrder() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      data: this.props.exercises,
      nextOrder: [],
      previousLocation: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams( {
      saveOrder: this.saveOrder.bind( this ),
    } );
  }

  setLocation = item => {
    const { nextOrder } = this.state;

    if ( nextOrder.length ) {
      this.setState( {
        previousLocation: nextOrder.indexOf( item ),
      } );
    }
    else {
      this.setState( {
        previousLocation: item,
      } );
    }
  };

  orderChanged = () => {};

  saveOrder = () => {
    this.props.saveNewOrder( { newOrder: this.state.nextOrder } );
    this.props.navigation.navigate( 'Build' );
  };

  render() {
    return (
      <Container>
        <SortableList
          data={ this.state.data }
          onChangeOrder={ nextOrder => this.setState( { nextOrder } ) }
          onActivateRow={ key => this.setLocation( key ) }
          onReleaseRow={ key => this.orderChanged( key ) }
        />
      </Container>
    );
  }
}

Sort.propTypes = {
  navigation: PropTypes.object,
  exercises: PropTypes.object,
  saveNewOrder: PropTypes.func,
};


const mapStateToProps = state => ( {
  exercises: getSortableExerciseList( state ),
} );

const mapDispatchToProps = dispatch => ( {
  saveNewOrder: data => dispatch( buildUpdateExerciseOrderAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Sort );
