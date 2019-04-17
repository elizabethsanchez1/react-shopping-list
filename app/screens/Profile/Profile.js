import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View,  Dimensions, Alert, Button, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'react-native-firebase'
import Container from '../../components/Container/index';
import { Input } from '../../components/Form/index';
import { PrimaryButton } from '../../components/Button';
import { StyledText } from '../../components/Text/index';
import moment from 'moment'
import theme from '../../styles/theme.style';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Loading } from '../../components/Loading/index';
import { getEmail, getUid } from "../../selectors/authentication";
import { logOutUser } from "../../actions/authentication";
import Tabs from '../../components/Tabs/Tabs';
import { updateField } from "../../actions/profile";
import { updateEmail } from "../../actions/profile";
import { getFirstName, getGender, getLastName, getPrimaryGoal, getProfileLoading } from "../../selectors/profile";


const styles = StyleSheet.create({
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
    fontFamily: theme.PRIMARY_FONT_FAMILY
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
});


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: '',
      email: '',
      username: '',
      loading: true,
    };
  }

  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    // return {
    //   headerRight: (
    //     <Button
    //       buttonStyle={{ backgroundColor: 'transparent' }}
    //       color={theme.ACTIVE_TAB_COLOR}
    //       textStyle={{ fontSize: 17 }}
    //       title='Update'
    //       // onPress={navigation.state.params.saveWorkout}
    //     />
    //   )
    // }

  };

  updateProfile(data) {
    const key = Object.getOwnPropertyNames(data);

    if (data[key].replace(/ /g, '') !== '') {
      (key[0] === 'email')
        ? this.props.updateEmail({
            newEmail: data[key],
            previousEmail: this.props.email,
            password: 'password'
          })
        : this.props.updateField(this.props.uid, data);
    }
  }

  UserInfoView = () => {

    return (
    <View style={styles.tabViewContainer}>
      <View style={styles.inputsContainer}>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 15 }}>First Name</StyledText>
          <Input
            placeholder='optional'
            containerStyling={{ width: '40%' }}
            onEndEditing={(name) => this.updateProfile({ firstName: name.nativeEvent.text })}
            value={this.props.firstName}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 15 }}>Last Name</StyledText>
          <Input
            placeholder='optional'
            containerStyling={{ width: '40%' }}
            onEndEditing={(lastName) => this.updateProfile({ lastName: lastName.nativeEvent.text })}
            value={this.props.lastName}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 15 }}>Gender</StyledText>
          <Dropdown
            placeholder="recommended"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={{ borderBottomWidth: 2 }}
            containerStyle={{ width: '40%', marginTop: -20 }}
            data={[{ value: 'Male' }, { value: 'Female' }]}
            value={this.props.gender}
            onChangeText={gender => this.updateProfile({ gender })}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 15 }}>Primary Goal</StyledText>
          <Dropdown
            placeholder="recommended"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={{ borderBottomWidth: 2 }}
            containerStyle={{ width: '40%', marginTop: -20 }}
            data={[{ value: 'Build Muscle' }, { value: 'Build Strength' }, { value: 'Lose Fat' }]}
            value={this.props.primaryGoal}
            onChangeText={primaryGoal => this.updateProfile({ primaryGoal })}
          />
        </View>

        <Button title="Execute" onPress={this.dataBaseChange} />
      </View>
    </View>)
  };


  dataBaseChange = () => {
    const completedExercises = [];
    const batch = firebase.firestore().batch();
    const target = firebase.firestore().collection('completedExercises');

    firebase.firestore().collection('completedExercises')
      // .where('exercise', '==', 'Barbell Curl')
      .where('type', '==', 'superSet')
      .where('exercise', 'array-contains', 'Barbell Curl')
      .get()
      .then( querySnapshot => {
        const data = [];

        querySnapshot.forEach( doc  => {
          // console.log( 'doc: ', doc );
          // console.log( 'data', doc.data() );

          data.push(
            {
              id: doc.id,
              ...doc.data()
            }
          )
        })

        console.log('data results: ', data);
      } )


    // firebase.firestore()
    //   .collection('users')
    //   .doc(this.props.uid)
    //   .collection('completedExercises')
    //   .get()
    //   .then(querySnapshot => {
    //     querySnapshot.forEach(doc => {
    //       console.log('doc:', doc);
    //
    //
    //       completedExercises.push({
    //         ...doc.data(),
    //         userId: this.props.uid,
    //       });
    //
    //     });
    //
    //     console.log('all completed exercises: ', completedExercises);
    //
    //     completedExercises.forEach(doc => {
    //       batch.set(target.doc(), doc);
    //     });
    //
    //     batch.commit();
    //   })
    //   .catch(error => {
    //     console.log('error : ', error);
    //   })






    // const workoutCollection = firebase.firestore().collection('programs');



    // const batch = firebase.firestore().batch();
    // const savedWorkouts = [];
    // const workoutCollection = firebase.firestore().collection('savedWorkouts');
    // firebase.firestore()
    //   .collection('users')
    //   .doc(this.props.uid)
    //   .collection('savedWorkouts')
    //   .get()
    //   .then(querySnapshot => {
    //
    //
    //     querySnapshot.forEach(doc => {
    //       console.log('doc:', doc);
    //
    //       savedWorkouts.push({
    //         ...doc.data(),
    //         userId: this.props.uid,
    //       });
    //     });
    //
    //     savedWorkouts.forEach(exercise => {
    //       batch.set(workoutCollection.doc(), exercise);
    //     });
    //
    //     batch.commit();
    //  })



  };

  SettingsView = () => (
    <ScrollView style={styles.tabViewContainer} >
      <View style={styles.inputsContainer}>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 20}}>Left handed</StyledText>
          <Dropdown
            placeholder="false"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={{ borderBottomWidth: 2 }}
            containerStyle={{ width: '40%', marginTop: -20  }}
            data={[{value: 'True'}, {value: 'False'}]}
            onChangeText={orientation => this.updateProfile({ handOrientation: orientation })}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 20}}>Color theme</StyledText>
          <Dropdown
            placeholder="Dark"
            placeholderTextColor='#A1A1A1'
            baseColor='white'
            textColor='white'
            selectedItemColor='black'
            inputContainerStyle={{ borderBottomWidth: 2 }}
            containerStyle={{ width: '40%', marginTop: -20  }}
            data={[{value: 'Light'}, {value: 'Dark'}]}
            onChangeText={theme => this.updateProfile({ colorTheme: theme })}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <StyledText style={{ marginTop: 20}}>Email</StyledText>
          <Input
            placeholder='optional'
            containerStyling={{ width: '40%' }}
            value={this.props.email}
            onEndEditing={email => this.updateProfile({email: email.nativeEvent.text})}
            // inputStyling={{ textAlign: 'center' }}
          />
        </View>

        <View style={styles.profileItemContainer}>
          <Text style={styles.textLabel}>Measurements</Text>
          <Input
            placeholder='optional'
            containerStyling={{ width: '40%' }}
            // inputStyling={{ textAlign: 'center' }}
          />
        </View>

        <PrimaryButton
          containerViewStyle={{ width: 150, alignSelf: 'center', marginTop: 20 }}
          title="LOG OUT"
          onPress={() => this.props.logOut()}
        />

        <PrimaryButton
          containerViewStyle={{ width: 150, alignSelf: 'center', marginTop: 20 }}
          title="Storybook"
          onPress={() => this.props.navigation.navigate('StoryBook')}
        />


        {/*<PrimaryButton*/}
          {/*title="test query"*/}
          {/*onPress={() => this.testQuery()}*/}
        {/*/>*/}
      </View>
    </ScrollView>
  );

  // testQuery = () => {
  //
  //   const completedExercises = [];
  //   const batch = firebase.firestore().batch();
  //   const target = firebase.firestore().collection('completedExercises');
  //
  //
  //   const totalWeeks = {
  //     week1: {},
  //     week2: {},
  //     week3: {},
  //     week4: {},
  //     week5: {},
  //     week6: {},
  //   };
  //
  //   firebase.firestore()
  //     .collection('users')
  //     .doc(this.props.uid)
  //     .collection('completedExercises')
  //     .get()
  //     .then(querySnapshot => {
  //       querySnapshot.forEach(doc => {
  //         console.log('doc:', doc);
  //
  //
  //         completedExercises.push({
  //           ...doc.data(),
  //         });
  //
  //       });
  //
  //       console.log('all completed exercises: ', completedExercises);
  //
  //       completedExercises.forEach(doc => {
  //         batch.set(target.doc(), doc);
  //       });
  //
  //       batch.commit();
  //     })
  //     .catch(error => {
  //       console.log('error : ', error);
  //     })
  //
  //
  // };


  render() {
    if (this.props.isLoading) {
      return (
        <Loading />
      )
    }

    return (
      <Container>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 30}}>
            <View style={{ backgroundColor: theme.SECONDARY_BACKGROUND, borderRadius: 50 }}>
              <Icon
                style={{ padding: 10 }}
                color='#fff'
                size={80}
                name='account'
              />
            </View>
          </View>

          <View style={{ flex: 5 }}>
            <Tabs
              routes={[
                { key: 'first', title: 'USER INFO' },
                { key: 'second', title: 'SETTINGS' },
              ]}
              subViews={{
                first: this.UserInfoView,
                second: this.SettingsView,
              }}
              tabHeaderStyling={styles.tabHeader}
              tabBarStyling={styles.tabBar}
            />
          </View>

      </Container>
    );
  }
}

Profile.propTypes = {
  uid: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  gender: PropTypes.string,
  primaryGoal: PropTypes.string,
};

function mapStateToProps(state, containerProps) {
  return {
    uid: getUid(state),
    isLoading: getProfileLoading(state),
    email: getEmail(state),
    firstName: getFirstName(state),
    lastName: getLastName(state),
    gender: getGender(state),
    primaryGoal: getPrimaryGoal(state),
  }
}


function mapDispatchToProps(dispatch) {
  return {
    updateEmail: update => dispatch(updateEmail(update)),
    updateField: (uid, data) => dispatch(updateField(uid, data)),
    logOut: () => dispatch(logOutUser()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Profile);

