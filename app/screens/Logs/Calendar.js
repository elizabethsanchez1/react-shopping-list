import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import Container from '../../components/Container/Container';
import { StyledText } from '../../components/Text';
import theme from "../../styles/theme.style";
import { markDatesAction, selectedDayAction } from "../../actions/logs";
import { getCompletedExercises } from "../../selectors/track";
import { Loading } from '../../components/Loading';
import moment from 'moment'
import { getCompletedExercisesLoading } from "../../selectors/workoutsApi";
import { getMarkedDates, getSavedBodyLogs } from "../../selectors/logs";


const styles = StyleSheet.create({
  calendar: {
    backgroundColor: theme.SECONDARY_BACKGROUND,
    marginBottom: 50,
    padding: 10,
  },
  containerStyling: {
    justifyContent: 'flex-end',
  },
  contentView: {
    textAlign: 'center',
    padding: 20,
    flex: 1,
    alignItems: 'center',
  },
  legendContainer: {
    flex: 1,
  },
  legendKey: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutColor: {
    marginLeft: 10,
    borderRadius: 50,
    height: 10,
    width: 10,
    backgroundColor: theme.ACCENT_YELLOW,
  },
  logColor: {
    marginLeft: 10,
    borderRadius: 50,
    height: 10,
    width: 10,
    backgroundColor: theme.ACCENT_GREEN,
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format('YYYY-MM-DD'),
    };
  }

  onDaySelect = dateObject => {
    console.log('date object: ', dateObject);
    console.log( 'moment only: ', moment( dateObject ) );
    console.log( 'moment only _d: ', moment( dateObject ).toDate() );
    console.log('moment format: ', moment( dateObject.dateString ).format());

    this.props.selectedDay(dateObject, this.props.completedExercises);
    this.props.navigation.navigate('Logs', {
     date: `${dateObject.month}/${dateObject.day}/${dateObject.year}`,
    });
  };

  render() {
    console.log('props in Calendar.js : ', this.props);

    if ( this.props.isLoading ) {
      return <Loading />
    }

    return (
      <Container containerStyling={styles.containerStyling}>
        <View style={styles.contentView}>
          <StyledText>Select a day to log a workout or body measurement</StyledText>

          <View style={styles.legendContainer}>
            <View style={styles.legendKey}>
              <StyledText>Workout day logs will be marked:</StyledText>
              <View style={styles.workoutColor}></View>
            </View>


            <View style={styles.legendKey}>
              <StyledText>Body logs will be marked:</StyledText>
              <View style={styles.logColor}></View>
            </View>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <CalendarComponent
            current={this.state.currentDate}
            pastScrollRange={24}
            futureScrollRange={24}
            horizontal
            pagingEnabled
            onDayPress={this.onDaySelect}
            markedDates={this.props.markedDates}
            markingType={'multi-dot'}
            style={styles.calendar}
            theme={{
              calendarBackground: theme.SECONDARY_BACKGROUND,
              textSectionTitleColor: 'white',
              dayTextColor: 'white',
              monthTextColor: 'white',
              arrowColor: 'white',
              textDisabledColor: '#373737',
              textDayFontFamily: theme.SECONDARY_FONT_FAMILY,
              // textDayFontSize: 18,
              // textMonthFontSize: 18,
            }}
          />
        </View>

      </Container>
    );
  }
}

Calendar.propTypes = {
  markDates: PropTypes.func,
  selectedDay: PropTypes.func,
  markedDates: PropTypes.object,
  completedExercises: PropTypes.array,
  isLoading: PropTypes.bool,
  savedBodyLogs: PropTypes.array,
};

const mapStateToProps = ( state, containerProps ) => {
  return {
    markedDates: getMarkedDates( state ),
    savedBodyLogs: getSavedBodyLogs( state ),
    completedExercises: getCompletedExercises( state ),
    isLoading: getCompletedExercisesLoading( state ),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    markDates: ( exercises, bodyLogs ) => dispatch( markDatesAction( exercises, bodyLogs ) ),
    selectedDay: ( dateObject, exercises ) => dispatch( selectedDayAction( dateObject, exercises ) ),
  }
};

export default connect( mapStateToProps, mapDispatchToProps )( Calendar );
