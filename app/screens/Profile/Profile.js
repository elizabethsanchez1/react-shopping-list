import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'react-native-firebase';
import Container from '../../components/Container/index';
import { Input } from '../../components/Form/index';
import { PrimaryButton } from '../../components/Button';
import { StyledText } from '../../components/Text/index';
import theme from '../../styles/theme.style';
import { connect } from 'react-redux';
import { Loading } from '../../components/Loading/index';
import { logOutAction } from '../../actions/authentication';
import Tabs from '../../components/Tabs/Tabs';
import { updateProfileFieldRequestAction } from '../../actions/profile';
import { getName, getEmail, getGender, getPrimaryGoal } from '../../selectors/user';
import { getLoadingByDomain } from '../../selectors/loading';
import { USER } from '../../constants/reducerObjects';


const styles = StyleSheet.create( {
  tabHeader: {
    marginTop: 30,
  },
  tabBar: {
    backgroundColor: theme.PRIMARY_BACKGROUND,
  },
  textLabel: {
    marginTop: 15,
    color: '#fff',
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
  },
  profileItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  inputsContainer: {
    padding: 10,
  },
  tabViewContainer: {
    flex: 1,
    backgroundColor: theme.SECONDARY_BACKGROUND,
  },
} );

class Profile extends Component {
  static navigationOptions = ( { navigation } ) => {
    const params = navigation.state.params || {};
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 17 } }
          title='Update'
          onPress={ params.update }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      gender: '',
      primaryGoal: '',
    };
  }

  componentDidMount() {
    this.props.navigation.setParams( {
      update: this.updateField.bind( this ),
    } );
  }

  componentDidUpdate( prevProps ) {
    if ( prevProps.name.firstName !== this.props.name.firstName ) {
      this.setState( {
        firstName: this.props.name.firstName,
        lastName: this.props.name.lastName,
        email: this.props.email,
        gender: this.props.gender,
        primaryGoal: this.props.primaryGoal,
      } );
    }
  }

  updateField = () => this.props.updateField( { ...this.state } );

  UserInfoView = () => (
    <View style={ styles.tabViewContainer }>
      <View style={ styles.inputsContainer }>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 15 } }>First Name</StyledText>
          <Input
            placeholder='optional'
            containerStyling={ { width: '40%' } }
            onChange={ event => {
              this.setState( { firstName: event.nativeEvent.text } );
            } }
            defaultValue={ this.state.firstName }
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 15 } }>Last Name</StyledText>
          <Input
            placeholder='optional'
            containerStyling={ { width: '40%' } }
            onChange={ event => {
              this.setState( { lastName: event.nativeEvent.text } );
            } }
            defaultValue={ this.state.lastName }
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 15 } }>Gender</StyledText>
          <Dropdown
            placeholder="recommended"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={ { borderBottomWidth: 2 } }
            containerStyle={ { width: '40%', marginTop: -20 } }
            data={ [ { value: 'Male' }, { value: 'Female' } ] }
            value={ this.state.gender }
            onChangeText={ gender => this.setState( { gender } ) }
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 15 } }>Primary Goal</StyledText>
          <Dropdown
            placeholder="recommended"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={ { borderBottomWidth: 2 } }
            containerStyle={ { width: '40%', marginTop: -20 } }
            data={ [ { value: 'Build Muscle' }, { value: 'Build Strength' }, { value: 'Lose Fat' } ] }
            value={ this.state.primaryGoal }
            onChangeText={ primaryGoal => this.setState( { primaryGoal } ) }
          />
        </View>

        <Button title="Execute" onPress={ this.dataBaseChange } />
      </View>
    </View>
  );


  dataBaseChange = () => {
    const completedExercises = [];
    const batch = firebase.firestore().batch();
    const target = firebase.firestore().collection( 'completedExercises' );

    firebase.firestore().collection( 'completedExercises' )
      // .where( 'exercise', '==', 'Barbell Curl' )
      .where( 'names', 'array-contains', 'Barbell Curl' )
      .orderBy( 'trackedOn', 'desc' )
      .get()
      .then( querySnapshot => {
        const data = [];

        querySnapshot.forEach( doc => {
          // console.log( 'doc: ', doc );
          // console.log( 'data', doc.data() );

          data.push(
            {
              id: doc.id,
              ...doc.data()
            }
          )
        } )

        console.log( 'data results: ', data );
      } )
  };

  SettingsView = () => (
    <ScrollView style={ styles.tabViewContainer }>
      <View style={ styles.inputsContainer }>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 20 } }>Left handed</StyledText>
          <Dropdown
            placeholder="false"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={ { borderBottomWidth: 2 } }
            containerStyle={ { width: '40%', marginTop: -20 } }
            data={ [ { value: 'True' }, { value: 'False' } ] }
            onChangeText={ orientation => this.setState( { handOrientation: orientation } ) }
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 20 } }>Color theme</StyledText>
          <Dropdown
            placeholder="Dark"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={ { borderBottomWidth: 2 } }
            containerStyle={ { width: '40%', marginTop: -20 } }
            data={ [ { value: 'Light' }, { value: 'Dark' } ] }
            onChangeText={ theme => this.setState( { colorTheme: theme } ) }
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <StyledText style={ { marginTop: 20 } }>Email</StyledText>
          <Input
            placeholder='optional'
            containerStyling={ { width: '40%' } }
            defaultvalue={ this.state.email }
            onChange={ event => {
              this.setState( { email: event.nativeEvent.text } );
            } }
            // inputStyling={{ textAlign: 'center' }}
          />
        </View>

        <View style={ styles.profileItemContainer }>
          <Text style={ styles.textLabel }>Measurements</Text>
          <Input
            placeholder='optional'
            containerStyling={ { width: '40%' } }
            // inputStyling={{ textAlign: 'center' }}
          />
        </View>

        <PrimaryButton
          containerViewStyle={ { width: 150, alignSelf: 'center', marginTop: 20 } }
          title="LOG OUT"
          onPress={ () => this.props.logOut() }
        />

        <PrimaryButton
          containerViewStyle={ { width: 150, alignSelf: 'center', marginTop: 20 } }
          title="Storybook"
          onPress={ () => this.props.navigation.navigate( 'StoryBook' ) }
        />


        {/*<PrimaryButton*/ }
        {/*title="test query"*/ }
        {/*onPress={() => this.testQuery()}*/ }
        {/*/>*/ }
      </View>
    </ScrollView>
  );

  render() {
    if ( this.props.isLoading ) {
      return <Loading />;
    }

    return (
      <Container>
        <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30 } }>
          <View style={ { backgroundColor: theme.SECONDARY_BACKGROUND, borderRadius: 50 } }>
            <Icon
              style={ { padding: 10 } }
              color='#fff'
              size={ 80 }
              name='account'
            />
          </View>
        </View>

        <View style={ { flex: 5 } }>
          <Tabs
            routes={ [
              { key: 'first', title: 'USER INFO' },
              { key: 'second', title: 'SETTINGS' },
            ] }
            subViews={ {
              first: this.UserInfoView,
              second: this.SettingsView,
            } }
            tabHeaderStyling={ styles.tabHeader }
            tabBarStyling={ styles.tabBar }
          />
        </View>

      </Container>
    );
  }
}

Profile.propTypes = {
  email: PropTypes.string,
  name: PropTypes.object,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  gender: PropTypes.string,
  primaryGoal: PropTypes.string,
  updateField: PropTypes.func,
};


const mapStateToProps = state => ( {
  name: getName( state ),
  email: getEmail( state ),
  gender: getGender( state ),
  primaryGoal: getPrimaryGoal( state ),
  isLoading: getLoadingByDomain( state, USER ),
} );


const mapDispatchToProps = dispatch => ( {
  // updateEmail: update => dispatch( updateEmail( update ) ),
  updateField: data => dispatch( updateProfileFieldRequestAction( data ) ),
  logOut: () => dispatch( logOutAction() ),
} );


export default connect( mapStateToProps, mapDispatchToProps )( Profile );
