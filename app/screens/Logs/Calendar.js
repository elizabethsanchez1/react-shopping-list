import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Calendar as CalendarComponent } from 'react-native-calendars';
import moment from 'moment';
import Container from '../../components/Container/Container';
import { StyledText } from '../../components/Text';
import theme from '../../styles/theme.style';
import { logSelectDayAction } from '../../actions/logs';
import { Loading } from '../../components/Loading';
import { getMarkedDates } from '../../selectors/logs';
import { getLoadingByDomain } from '../../selectors/loading';
import { BODY_LOGS } from '../../constants/reducerObjects';
import { getCompletedExercises } from '../../selectors/completedExercises';
import { getBodyLogs } from '../../selectors/bodyLogs';


const styles = StyleSheet.create( {
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
  },
} );

class Calendar extends Component {

  onDaySelect = dateObject => {
    const date = `${ dateObject.month }/${ dateObject.day }/${ dateObject.year }`;
    this.props.selectedDay( {
      selectedDay: date,
      exercises: this.props.exercises,
      bodyLogs: this.props.bodyLogs,
    } );
    this.props.navigation.navigate( 'Logs' );
  };

  render() {
    console.log( 'props in Calendar.js : ', this.props );

    if ( this.props.isLoading ) {
      return <Loading />;
    }

    return (
      <Container containerStyling={ styles.containerStyling }>
        <View style={ styles.contentView }>
          <StyledText>Select a day to log a workout or body measurement</StyledText>

          <View style={ styles.legendContainer }>
            <View style={ styles.legendKey }>
              <StyledText>Workout day logs will be marked:</StyledText>
              <View style={ styles.workoutColor } />
            </View>


            <View style={ styles.legendKey }>
              <StyledText>Body logs will be marked:</StyledText>
              <View style={ styles.logColor } />
            </View>
          </View>
        </View>

        <View style={ { flex: 2 } }>
          <CalendarComponent
            current={ moment().format( 'YYYY-MM-DD' ) }
            pastScrollRange={ 24 }
            futureScrollRange={ 24 }
            horizontal
            pagingEnabled
            onDayPress={ this.onDaySelect }
            markedDates={ this.props.markedDates }
            markingType="multi-dot"
            style={ styles.calendar }
            theme={ {
              calendarBackground: theme.SECONDARY_BACKGROUND,
              textSectionTitleColor: 'white',
              dayTextColor: 'white',
              monthTextColor: 'white',
              arrowColor: 'white',
              textDisabledColor: '#373737',
              textDayFontFamily: theme.SECONDARY_FONT_FAMILY,
              // textDayFontSize: 18,
              // textMonthFontSize: 18,
            } }
          />
        </View>

      </Container>
    );
  }
}

Calendar.propTypes = {
  selectedDay: PropTypes.func,
  markedDates: PropTypes.object,
  exercises: PropTypes.array,
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  bodyLogs: PropTypes.array,
};

const mapStateToProps = state => ( {
  exercises: getCompletedExercises( state ),
  markedDates: getMarkedDates( state ),
  isLoading: getLoadingByDomain( state, BODY_LOGS ),
  bodyLogs: getBodyLogs( state ),
} );

const mapDispatchToProps = dispatch => ( {
  selectedDay: date => dispatch( logSelectDayAction( date ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Calendar );
