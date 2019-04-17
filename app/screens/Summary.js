import React from 'react'
import { Card, Text, List, ListItem, Button } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase'
import Loading from '../components/Loading';
import Container from '../components/Container';

const styles = StyleSheet.create({
  centered: {
    textAlign: 'center',
    alignSelf: 'stretch',
  },

  innerNavigation: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 0,
  },

  table: {
    marginTop: 0,
    marginBottom: 20,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  cell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 1,
    alignSelf: 'stretch',
  },
  largerCell: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
    flex: 2,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

class Summary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      programSelection: '',
      weekView: false,
      weekSelection: '',
      dayView: false,
      daySelection: '',
      summaryView: false,
      data: [],
      totalReps: '',
      totalWeight: '',
    };

    this.keyCount = 0;
    this.filterWorkouts = this.filterWorkouts.bind(this);
    this.getKey = this.getKey.bind(this);
    this.previousView = this.previousView.bind(this);
    // this.calculateTotals = this.calculateTotals.bind(this);
    // this.prefillData = this.prefillData.bind(this);
    this.database = firebase.firestore().collection('exercises');
    this.userId = firebase.auth().currentUser.uid;
    this.userDocument = firebase.firestore().collection('users').doc(this.userId);
    this.programSubcollection = this.userDocument.collection('programs');
  }

  componentDidMount() {
    this.setState({ loading: true });
    const { data }  = this.state;

    this.programSubcollection.onSnapshot((querySnapshot) => {
      let newQuery = [];
      querySnapshot.forEach((doc) => {
        console.log('doc data: ', doc.data());

        newQuery.push(doc.data());
      });


      console.log('new Data: ', newQuery);
      this.filterWorkouts(newQuery);
    });
  }

  /**
   * Switch the views from program to week to day view
   * Then once on the day selection send off info about selected workout to the tracker component
   * @param {String} selection - text indicating which view to show
   * @param {Number} index - number used to select week or day in each program
   * @param {String} nameOfProgram - Name of workout program
   */
  changeViews = (selection, index, nameOfProgram) => {
    if (selection === 'programSelection') {
      this.setState({
        weekView: true,
        programSelection: index,
        programName: nameOfProgram,
      });
    }

    if (selection === 'weekSelection') {
      this.setState({
        weekView: false,
        dayView: true,
        weekSelection: index + 1,
      });
    }

    if (selection === 'daySelection') {
      this.setState({
        dayView: false,
        daySelection: index,
        summaryView: true,
      }, () => {
        this.calculateTotals();
      });
    }
  }

  /**
   * Generate a predictable unique key for react to keep track of elements
   * @return {number}
   */
  getKey() {
    return (this.keyCount += 1);
  }

  /**
   * Move the user to the previous view
   * @param {String} currentView - string that tells us which view the user needs
   */
  previousView(currentView) {
    if (currentView === 'summaryView') {
      this.setState({
        summaryView: false,
        dayView: true,
      });
    }

    if (currentView === 'dayView') {
      this.setState({
        dayView: false,
        weekView: true,
      });
    }

    if (currentView === 'weekView') {
      this.setState({
        dayView: false,
        weekView: false,
      });
    }
  }

  /**
   * calculate daily totals for which ever workout has been selected
   * then place those number at the bottom of the page so the user can
   * view how many total reps and total weight they lifted through the workout
   */
  calculateTotals() {
    console.log('calculate totals ran', this.state);
    const { programSelection, weekSelection, daySelection, data } = this.state;
    const currentWorkout = data[programSelection].workouts[`week${weekSelection}`][daySelection].exercises;
    let totalReps = 0;
    let totalWeight = 0;

    console.log('what is current workout: ', currentWorkout);

    currentWorkout.forEach((exercise) => {
      totalReps += exercise.totalReps;
      totalWeight += exercise.totalWeight;
    });

    this.setState({
      totalReps,
      totalWeight,
      loading: false,
    }, () => {
      console.log('state at the end of calculate totals: ', this.state);
    });
  }

  /**
   * Filter data object received from backend that contains all workout programs
   * for logged in user and remove all workout days, weeks and programs that have not been tracked
   * Also create any additional properties that are needed in the data
   * @param {Array} data - array of all programs the user has
   */
  filterWorkouts(data) {
    console.log('data received in filterWorkout: ', data);
    const { params } = this.props.navigation.state;

    // iterate through programs backwards and slice values that aren't tracked
    for (let program = data.length - 1; program >= 0; program -= 1) {

      for (let week = Object.keys(data[program].workouts).length; week > 0; week -= 1 ) {

        for (let day = data[program].workouts[`week${week}`].length - 1; day >= 0; day -= 1) {
          const currentDay = data[program].workouts[`week${week}`][day];

          if (currentDay.completed === false) {
            // Remove empty days
            data[program].workouts[`week${week}`].splice(day, 1);

            if (data[program].workouts[`week${week}`].length === 0) {
              // Remove empty weeks
              delete data[program].workouts[`week${week}`];


              if (Object.keys(data[program].workouts).length === 0) {
                // Remove empty programs
                data.splice(program, 1);
              }
            }
          } else {
            // currentDay.exercises.forEach((exercise) => {
            //   // Add up all reps in trackedReps array and store as totalReps property
            //   exercise.totalReps = exercise.trackedReps.reduce((a, b) => a + b, 0);
            //
            //
            //   // Grab total of trackedReps array * trackedWeights array
            //   exercise.totalWeight = exercise.trackedWeights.reduce((result, a, index) => {
            //     return result + (a * exercise.trackedReps[index]);
            //   }, 0);
            // });
          }
        }
      }
    }

    this.setState({
      loading: (params !== undefined),
     //  loading: false,
      data,
    }, () => {
      if (params !== undefined) {
        this.prefillData();
      }
      console.log('state after filtered: ', this.state);
    });
  }

  /**
   * User has navigated here from the workout tracker page so we need to prefill data for them
   * and take them straight to the summary view, which workout they just completed will
   * be inside of workoutInfo which is a parameter that is passed into the function
   * by the navigator
   */
  prefillData() {
    console.log('props during prefill: ', this.props);
    console.log('state during prefill: ', this.state);
    const { workoutInfo } = this.props.navigation.state.params;
    console.log('workout info passed into prefil: ', workoutInfo);
    const { data } = this.state;
    let programSelection;

    data.forEach((item, index) => {
      if (item.name === workoutInfo.name) {
        programSelection = index;
      }
    });

    this.setState({
      programSelection,
      weekView: false,
      weekSelection: workoutInfo.selectedWeek,
      dayView: false,
      daySelection: workoutInfo.selectedDay,
      summaryView: true,
    }, () => {
      console.log('state after prefill data but before calculate totals: ', this.state);
      this.calculateTotals();
    });
  }

  render() {
    console.ignoredYellowBox = ['Remote debugger'];
    const { loading, data, weekView, programSelection, dayView, weekSelection, summaryView, daySelection, totalReps, totalWeight } = this.state;
    console.log('state in render: ', this.state);

    const headerRow = (
      <View style={styles.row} key={this.getKey()}>
        <View style={styles.cell} key={this.getKey()}>
          <Text key={this.getKey()}>Set</Text>
        </View>
        <View style={styles.cell} key={this.getKey()}>
          <Text key={this.getKey()}>Weight</Text>
        </View>
        <View style={styles.cell} key={this.getKey()}>
          <Text key={this.getKey()}>Reps</Text>
        </View>
        <View style={styles.cell} key={this.getKey()}>
          <Text key={this.getKey()}>Total lbs</Text>
        </View>
      </View>
    );

    if (loading) {
      return (
        <Loading />
      );
    }

    if (summaryView) {
      return (
        <Container scroll>
          {
            data[programSelection].workouts[`week${weekSelection}`][daySelection].exercises.map((item) => (
              <Card key={this.getKey()}>
                <Text style={{ marginBottom: 10 }}>{item.exercise}</Text>
                <Text style={{ marginBottom: 10 }}>Target Rep Range {item.repRange[0]} - {item.repRange[1]}</Text>
                <View style={styles.table}>
                  { headerRow }
                  {
                    item.trackedReps.map((exercise, index) => (
                      <View style={styles.row} key={this.getKey()}>
                        <View style={styles.cell} key={this.getKey()}>
                          <Text key={this.getKey()}>{index + 1}</Text>
                        </View>
                        <View style={styles.cell} key={this.getKey()}>
                          <Text key={this.getKey()}>{item.trackedWeights[index]}</Text>
                        </View>
                        <View style={styles.cell} key={this.getKey()}>
                          <Text key={this.getKey()}>{item.trackedReps[index]}</Text>
                        </View>
                        <View style={styles.cell} key={this.getKey()}>
                          <Text>{ parseFloat(item.trackedWeights[index], 10) * parseInt(item.trackedReps[index], 10) }</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
                <Text style={{ marginBottom: 10 }}>Total Reps Completed: {item.totalReps}</Text>
                <Text>Total Weight Lifted: {item.totalWeight} lbs</Text>
              </Card>
            ))
          }
          <Card containerStyle={{ marginBottom: 20 }}>
            <Text style={{ marginBottom: 10 }}>Accumulated Totals</Text>
            <Text style={{ marginBottom: 10 }}>Total Reps: {totalReps}</Text>
            <Text style={{ marginBottom: 10 }}>Total Volume lifted: {totalWeight} lbs</Text>
            <Button
              title="Back"
              backgroundColor="#3B5998"
              onPress={() => this.previousView('summaryView')}
            />
          </Card>
        </Container>
      );
    }

    if (dayView) {
      return (
        <Container scroll>
          <Card containerStyle={{ marginTop: 60 }}>
            <Text style={{ marginBottom: 20 }}>Choose Day</Text>
            <List>
              {

                data[programSelection].workouts[`week${weekSelection}`].map((item, index) => (
                  <ListItem
                    title={item.day}
                    key={this.getKey()}
                    onPress={() => this.changeViews('daySelection', index)}
                  />
                ))
              }
            </List>
            <Button
              containerViewStyle={{ marginTop: 20, width: '50%' }}
              title="Back"
              onPress={() => this.previousView('dayView')}
            />
          </Card>
        </Container>
      );
    }

    if (weekView) {
      return (
        <Container scroll>
          <Card containerStyle={{ marginTop: 60 }}>
            <Text style={{ marginBottom: 20 }}>Choose Week</Text>
            <List>
              {
                Object.keys(data[programSelection].workouts).map((item, index) => (
                  <ListItem
                    title={`Week ${index + 1}`}
                    key={this.getKey()}
                    onPress={() => this.changeViews('weekSelection', index)}
                  />
                ))
              }
            </List>
            <Button
              containerViewStyle={{ marginTop: 20, width: '50%' }}
              title="Back"
              onPress={() => this.previousView('weekView')}
            />
          </Card>
        </Container>
      );
    }

    return (
      <Container scroll>
        <Card containerStyle={{ marginTop: 60 }}>
          <Text style={{ marginBottom: 20 }}>View program stats</Text>
          <List>
            {
              data.map((item, index) => (
                <ListItem
                  title={item.name}
                  key={this.getKey()}
                  onPress={() => this.changeViews('programSelection', index, item.name)}
                />
              ))
            }
          </List>
        </Card>
      </Container>
    );
  }
}

export default Summary
