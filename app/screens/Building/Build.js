import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../../components/Container/index';
import { Loading } from '../../components/Loading/index';
import theme from '../../styles/theme.style';
import {
  getWorkout,
  getWeekSelected,
  getDaySelected,
  getBuildSaveRedirect,
} from '../../selectors/workoutsApi';
import {
  computeDropdownWeeks,
  getBuildingSelectedWeek,
  getSelectedBuildObject,
  getType,
} from '../../selectors/building';
import { retrievedExerciseList } from '../../reducers/exercises';
import { getUid } from '../../selectors/authentication';
import { updateDay } from '../../actions/program';
import { getLoadingByDomain } from '../../selectors/loading';
import { BUILDING } from '../../constants/reducerObjects';
import DayHeader from '../../containers/Building/DayHeader';
import BuildTable from '../../containers/Building/BuildTable';
import DoubleDropdown from '../../containers/Building/DoubleDropdown';
import CardFooter from '../../containers/Building/CardFooter';
import { buildChangeWeekAction, buildSaveWorkoutAction } from '../../actions/building';

const styles = StyleSheet.create( {
  titleStyle: {
    fontSize: theme.FONT_SIZE_HEADERBAR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
    marginBottom: 0,
  },
  cardContainer: {
    borderRadius: 4,
    backgroundColor: theme.SECONDARY_BACKGROUND,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 30,
  },
  headerTitleContainer: {
    width: 100,
    marginTop: -17,
    paddingLeft: 10,
  },
  headerTitleInput: { borderBottomWidth: 0 },
  headerRight: { backgroundColor: 'transparent' },
  fontSize: { fontSize: 18 },
  headerLeft: {
    backgroundColor: 'transparent',
    padding: 5,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 0,
  },
  headerLeftContainer: { marginLeft: 0 },
  icon: {
    marginRight: -5,
    marginLeft: -5,
    marginTop: -3,
  },
} );

class Build extends Component {
  static navigationOptions = ( { navigation } ) => {
    const params = navigation.state.params || {};
    return {
      headerTitle: (
        ( params.weeks.length > 1 )
          ? (
            <Dropdown
              placeholder="Week 1"
              placeholderTextColor="white"
              baseColor="white"
              textColor="white"
              containerStyle={ styles.headerTitleContainer }
              inputContainerStyle={ styles.headerTitleInput }
              // pickerStyle={{ width: 200 }}
              selectedItemColor='black'
              dropdownPosition={ 0 }
              fontSize={ 18 }
              data={ params.weeks }
              onChangeText={ value => params.changeWeek( value ) }
            />
          )
          : 'Build'
      ),
      headerRight: (
        <Button
          buttonStyle={ styles.headerRight }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ styles.fontSize }
          title='Save'
          onPress={ () => params.saveData() }
        />
      ),
      headerLeft: (
        <Button
          title="Dashboard"
          containerViewStyle={ styles.headerLeftContainer }
          buttonStyle={ styles.headerLeft }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ styles.fontSize }
          icon={ {
            name: 'chevron-left',
            color: theme.ACTIVE_TAB_COLOR,
            size: 40,
            style: styles.icon,
          } }
          onPress={ () => navigation.goBack() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      copyFrom: '',
      copyTo: '',
      weeksDropdown: '',
      loading: false,
      alertShown: false,
    };
  }

  componentDidMount() {
    const { weeks } = this.props.navigation.state.params;
    this.props.navigation.setParams( { saveData: this.saveData.bind( this ) } );

    if ( this.props.type === 'program' ) {
      this.props.navigation.setParams( { changeWeek: this.changeWeek.bind( this ) } );
      this.setState( { weeksDropdown: computeDropdownWeeks( weeks ) } );
    }
  }

  componentDidUpdate() {
    if ( this.props.redirect ) {
      this.props.navigation.navigate( 'BuildDashboard' );
      this.props.actions.workoutApi.buildSaveRedirectDone();
    }
  }

  saveData = () => this.props.saveWorkout();

  changeWeek = week => this.props.changeWeek( week );

  render() {
    console.log( 'Build.js props: ', this.props );
    console.log( 'Build.js state: ', this.state );
    const { buildObject, selectedWeek, navigation, type } = this.props;

    if ( this.props.loading ) {
      return <Loading />;
    }

    return (
      <Container>
        <KeyboardAwareScrollView>
          {
            ( type === 'program' )
              ? (
                <View>
                  <DoubleDropdown data={ navigation.state.params.weeks } />
                  <FlatList
                    data={ buildObject[ selectedWeek ] }
                    renderItem={ ( { item, index } ) => (
                      <Card
                        titleStyle={ styles.titleStyle }
                        dividerStyle={ { display: 'none' } }
                        containerStyle={ styles.cardContainer }
                      >
                        <DayHeader day={ index } />
                        <BuildTable
                          dayIndex={ index }
                          exercises={ item.exercises }
                        />
                        <CardFooter
                          exercises={ item.exercises }
                          dayIndex={ index }
                        />
                      </Card>
                    ) }
                    keyExtractor={ item => item.day }
                  />
                </View>
              )
              : (
                <View>
                  <Card
                    titleStyle={ styles.titleStyle }
                    dividerStyle={ { display: 'none' } }
                    containerStyle={ styles.cardContainer }
                  >
                    <DayHeader />
                    <BuildTable
                      dayIndex={ 0 }
                      exercises={ buildObject.exercises }
                    />
                    <CardFooter
                      exercises={ buildObject.exercises }
                      dayIndex={ 0 }
                    />
                  </Card>
                </View>
              )
          }
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

Build.propTypes = {
  navigation: PropTypes.object,
  actions: PropTypes.object,
  loading: PropTypes.bool,
  redirect: PropTypes.bool,

  type: PropTypes.string.isRequired,
  buildObject: PropTypes.object,
  selectedWeek: PropTypes.string,
  changeWeek: PropTypes.func,
  saveWorkout: PropTypes.func,
};

const mapStateToProps = state => ( {
  uid: getUid( state ),
  workout: getWorkout( state ),
  weekSelected: getWeekSelected( state ),
  daySelected: getDaySelected( state ),
  redirect: getBuildSaveRedirect( state ),
  retrievedExerciseList: retrievedExerciseList( state ),

  selectedWeek: getBuildingSelectedWeek( state ),
  buildObject: getSelectedBuildObject( state ),
  type: getType( state ),
  // this is for when the user saves the program
  loading: getLoadingByDomain( state, BUILDING ),
} );

const mapDispatchToProps = dispatch => ( {
  saveWorkout: () => dispatch( buildSaveWorkoutAction() ),
  updateDay: ( name, day ) => dispatch( updateDay( name, day ) ),
  changeWeek: data => dispatch( buildChangeWeekAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Build );
