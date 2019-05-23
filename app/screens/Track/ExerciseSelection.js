import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import theme from '../../styles/theme.style';
import {
  getTrackProgramWeeks,
  getDaysForEachWeek,
} from '../../selectors/track';

const styles = StyleSheet.create( {
  list: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
  },
  title: { color: theme.PRIMARY_FONT_COLOR },
  listItem: { borderBottomColor: theme.PRIMARY_FONT_COLOR },
} );

class ExerciseSelection extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <Button
          title="Back"
          containerViewStyle={ {
            marginLeft: 0,
          } }
          buttonStyle={ {
            backgroundColor: 'transparent',
            padding: 5,
            justifyContent: 'center',
            alignContent: 'center',
            marginLeft: 0,
          } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          icon={ {
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: { marginRight: -5, marginLeft: -5, marginTop: -3 },
          } }
          onPress={ () => navigation.state.params.goBack() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      weeks: true,
      selectedWeek: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams( { goBack: this.handleBack } );
  }

  handleBack = () => {
    if ( this.state.weeks ) {
      this.props.navigation.goBack();
    }
    else {
      this.setState( { weeks: true } );
    }
  };

  changeData = ( item, index ) => {
    console.log( item, index );

    if ( this.state.weeks ) {
      this.setState( {
        weeks: false,
        selectedWeek: item.week,
      } );
    }
    else {
      console.log( 'route user to tracker' );
      // this.props.navigation.navigate( 'Tracker' );
    }

  };

  render() {
    const { weeks, selectedWeek } = this.state;
    const { programWeeks, daysByWeek } = this.props;
    console.log( 'exercise selection props', this.props );
    console.log( 'exercise selection state', this.state );

    return (
      <Container>
        <List containerStyle={ styles.list }>
          <FlatList
            data={ ( weeks ) ? programWeeks : daysByWeek[ selectedWeek ] }
            renderItem={ ( { item, index } ) => (
              <ListItem
                titleStyle={ styles.title }
                containerStyle={ styles.listItem }
                chevronColor="white"
                title={ item.label }
                onPress={ () => this.changeData( item, index ) }
                disabled={ item.completed }
              />
            ) }
            keyExtractor={ ( item, index ) => `${ item.label + index }` }
          />
        </List>
      </Container>
    );
  }
}

ExerciseSelection.propTypes = {
  navigation: PropTypes.object,
  programWeeks: PropTypes.array,
  daysByWeek: PropTypes.object,
};

const mapStateToProps = state => ( {
  programWeeks: getTrackProgramWeeks( state ),
  daysByWeek: getDaysForEachWeek( state ),
} );

const mapDispatchToProps = dispatch => ( {
  // actions: bindActionCreators( actions, dispatch ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( ExerciseSelection );
