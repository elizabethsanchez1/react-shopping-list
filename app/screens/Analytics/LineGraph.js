// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { View, StyleSheet, ScrollView } from 'react-native';
// import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme, VictoryStack } from 'victory-native';
// import { StyledText } from '../../components/Text';
// import Container from "../../components/Container/Container";
// import { Dropdown } from 'react-native-material-dropdown';
// import theme from "../../styles/theme.style";
// import { connect } from 'react-redux';
// import {
//   getAvailableExerciseList,
//   getCompletedExercises,
//   getExerciseDateRanges,
//   getOldestDate
// } from "../../selectors/track";
// import { getProgramNames, getSavedPrograms } from "../../selectors/programs";
// import { calculateDateRanges, filterBodyMeasurementsAction, filterExercises } from "../../actions/analytics";
// import { getAvailableDates, getFilteredResult, getSelectedScope } from "../../selectors/analytics";
// import { PrimaryButton } from "../../components/Button";
// import { Loading } from '../../components/Loading/index';
// import { getWorkoutRequestsLoadingState } from "../../selectors/workoutsApi";
// import { getBodyMeasurements, getSavedBodyLogs } from "../../selectors/logs";
//
//
// const styles = StyleSheet.create({
//   description: {
//     marginTop: 50,
//     textAlign: 'center'
//   },
//   progressContainer: {
//     marginTop: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-around'
//   }
// });
//
//
// const white = '#fff';
// const lightGrey = '#74777b';
//
//
//
// const chartTheme = {
//   axis: {
//     style: {
//       axis: {
//         fill: lightGrey,
//         stroke: lightGrey,
//         strokeWidth: 1,
//         strokeLinecap: 'round',
//         strokeLinejoin: 'round',
//       },
//       axisLabel: {
//         padding: 30,
//         stroke: white,
//         strokeWidth: 0,
//         fill: white,
//       },
//       grid: {
//         fill: lightGrey,
//         // stroke: 'none',
//         stroke: lightGrey,
//         strokeWidth: 1,
//       },
//       ticks: {
//         fill: 'transparent',
//         stroke: 'transparent',
//         strokeWidth: 0,
//       },
//       tickLabels: {
//         stroke: lightGrey,
//         strokeWidth: 0,
//         fill: lightGrey,
//         padding: 5,
//       }
//     }
//   },
//   line: {
//     style: {
//       data: {
//         fill: 'transparent',
//         stroke: theme.ACCENT_PURPLE,
//       }
//     }
//   }
// };
//
//
// const ALL_PROGRAMS = 'All Programs & Workouts';
// const VOLUME = 'Volume';
// const REP_MAX = '1 Rep Max';
// const ALL_EXERCISES = 'All Exercises';
// const BODY_MEASUREMENTS = 'Body Measurements';
//
// class LineGraph extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       programOptions: [
//         { value: ALL_PROGRAMS },
//       ],
//       metricOptions: [
//         { value: VOLUME },
//         { value: REP_MAX },
//         { value: BODY_MEASUREMENTS }
//       ],
//       exerciseOptions: [
//         { value: ALL_EXERCISES },
//       ],
//
//       programName: '',
//       metric: '',
//       exercise: '',
//       measurement: '',
//       // disableCalculate: false,
//     };
//   }
//
//   componentDidMount() {
//     this.props.calculateDateRanges(this.props.completedExercises);
//   }
//
//   filterExercises = (programInfo, metric) => {};
//
//   calculateGraph = () => {
//     const { programName, metric, exercise } = this.state;
//
//
//     if ( metric === BODY_MEASUREMENTS ) {
//       this.props.filterBodyMeasurements( {
//         bodyMeasurements: this.props.bodyMeasurements,
//         bodyLogs: this.props.bodyLogs,
//         measurement: this.state.measurement,
//       } );
//     }
//     else {
//
//       if ( programName !== '' && metric !== '' && exercise !== '' ) {
//
//         let program;
//
//         if ( programName !== ALL_PROGRAMS ) {
//           program = this.props.savedPrograms.find( program => {
//             if ( program.name === this.state.programName ) {
//               return program;
//             }
//           } );
//
//         }
//         else {
//           program = programName;
//         }
//
//         this.props.filterExercises( program, metric, exercise, this.props.completedExercises );
//       }
//
//     }
//
//
//   };
//
//   formatYAxis = value => {
//     const { metric } = this.state;
//
//     if (value > 1000) {
//       return `${Math.round(value) / 1000 }k`;
//     }
//
//     return value;
//   };
//
//   calculateMinValue = () => {
//     // TODO not being used right now
//
//     let total = 0;
//     this.props.filteredResult.map(result => total += result.weeklyData);
//     const values = this.props.filteredResult.map(result => result.weeklyData);
//     const smallestNum = Math.min(...values);
//
//     console.log('this is suppsoed to be th answer : ', smallestNum - (smallestNum * .20));
//
//     return {y: 0};
//   };
//
//   formatBodyMeasurements = measurements => {
//     return measurements.map( measurement => {
//       return { value: measurement.title };
//     });
//   };
//
//   render() {
//     console.log('linge graph state: ', this.state);
//     console.log('line graph props: ', this.props);
//
//     if (this.props.isLoading) {
//       return <Loading />
//     }
//
//     return (
//         <Container>
//           <ScrollView>
//             <View style={{paddingLeft: 20, paddingRight: 20}}>
//               <Dropdown
//                 label="Program"
//                 placeholderTextColor="white"
//                 baseColor='white'
//                 textColor='white'
//                 selectedItemColor='black'
//                 containerStyle={{width: '100%' }}
//                 data={[...this.state.programOptions, ...this.props.programNames]}
//                 onChangeText={value => this.setState({ programName: value })}
//               />
//
//               <Dropdown
//                 label="Metric"
//                 placeholderTextColor="white"
//                 baseColor='white'
//                 textColor='white'
//                 selectedItemColor='black'
//                 // containerStyle={
//                 //   (this.props.selectedScope === 'programName')
//                 //     ? { width: '50%', paddingLeft: 15 }
//                 //     : { width: '100%' }
//                 // }
//                 containerStyle={{ width: '100%' }}
//                 data={this.state.metricOptions}
//                 onChangeText={value => this.setState({ metric: value })}
//               />
//
//
//               {
//                 (this.state.metric === BODY_MEASUREMENTS)
//                   ? <Dropdown
//                       label="Measurement"
//                       placeholderTextColor="white"
//                       baseColor='white'
//                       textColor='white'
//                       selectedItemColor='black'
//                       containerStyle={{width: '100%'}}
//                       data={ this.formatBodyMeasurements( this.props.bodyMeasurements ) }
//                       onChangeText={value => this.setState({ measurement: value })}
//                     />
//                   : <Dropdown
//                       label="Exercise"
//                       placeholderTextColor="white"
//                       baseColor='white'
//                       textColor='white'
//                       selectedItemColor='black'
//                       containerStyle={{width: '100%'}}
//                       data={[...this.state.exerciseOptions, ...this.props.exerciseList]}
//                       onChangeText={value => this.setState({ exercise: value })}
//                     />
//               }
//
//
//               <PrimaryButton
//                 title="Calculate"
//                 disabled={this.state.disableCalculate}
//                 onPress={() => this.calculateGraph()}
//               />
//             </View>
//
//             {/*<StyledText style={styles.description}>*/}
//             {/*Total weekly volume from week to week*/}
//             {/*</StyledText>*/}
//             {/*<View style={styles.progressContainer}>*/}
//             {/*<StyledText>Progress</StyledText>*/}
//             {/*<StyledText>22%</StyledText>*/}
//             {/*<StyledText>1200 lbs</StyledText>*/}
//             {/*</View>*/}
//
//
//               {
//                 (this.props.filteredResult !== undefined)
//                 && <View>
//                   <VictoryChart
//                     theme={chartTheme}
//                     // minDomain={{y: this.calculateMinValue}}
//                     // minDomain={this.calculateMinValue}
//                   >
//                     <VictoryAxis
//                       label="Week"
//                       style={{
//                         tickLabel: {color: 'white'}
//                       }}
//                       tickFormat={x => `${Math.round(x)}`}
//                     />
//                     <VictoryAxis
//                       dependentAxis
//                       label="Volume lbs"
//                       tickFormat={x => this.formatYAxis(x)}
//                     />
//                     <VictoryLine
//                       // data={[
//                       //   { x: 1, y: 2 },
//                       //   { x: 2, y: 3 },
//                       //   { x: 3, y: 5 },
//                       //   { x: 4, y: 4 },
//                       //   { x: 5, y: 7 }
//                       // ]}
//                       data={this.props.filteredResult}
//                       x="week"
//                       y="weeklyData"
//                     />
//                   </VictoryChart>
//
//
//                   <View style={{ padding: 20, flex: 1 }}>
//                     {
//                       this.props.filteredResult.map(result => (
//                         <StyledText key={result.week}>
//                           Week {result.week}: {result.weeklyData}
//                         </StyledText>
//                       ))
//                     }
//                   </View>
//                 </View>
//               }
//
//           </ScrollView>
//         </Container>
//     )
//   }
// }
//
//
// LineGraph.propTypes = {
//   bodyMeasurements: PropTypes.array,
//   bodyLogs: PropTypes.array,
//   filterBodyMeasurements: PropTypes.func,
// };
//
// const mapStateToProps = ( state ) => {
//   return {
//     completedExercises: getCompletedExercises( state ),
//     bodyLogs: getSavedBodyLogs( state ),
//     bodyMeasurements: getBodyMeasurements( state ),
//     dateRanges: getAvailableDates( state ),
//     programNames: getProgramNames( state ),
//     savedPrograms: getSavedPrograms( state ),
//     filteredResult: getFilteredResult( state ),
//     selectedScope: getSelectedScope( state ),
//     exerciseList: getAvailableExerciseList( state ),
//     isLoading: getWorkoutRequestsLoadingState( state ),
//   }
// };
//
// const mapDispatchToProps = ( dispatch ) => {
//   return {
//     filterExercises: ( program, metric, exercises, completedExercises ) => dispatch( filterExercises( program, metric, exercises, completedExercises ) ),
//     calculateDateRanges: completedExercises => dispatch( calculateDateRanges( completedExercises ) ),
//     filterBodyMeasurements: measurementInfo => dispatch( filterBodyMeasurementsAction( measurementInfo ) ),
//   }
// };
//
// export default connect( mapStateToProps, mapDispatchToProps )( LineGraph )
