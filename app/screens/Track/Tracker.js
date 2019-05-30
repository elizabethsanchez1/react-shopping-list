import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { StyledText } from '../../components/Text';
import Container from '../../components/Container/index';
import { Pagination } from '../../components/Pagination';
import { Link } from '../../components/Button';
import Card from '../../components/Card/Card';
import theme from '../../styles/theme.style';
import { Loading } from '../../components/Loading';
import {
  getTrackDay,
  getTrackExercisesByDay,
  getTrackSets,
} from '../../selectors/track';
import ExerciseInputTable from '../../components/Table/Shared/ExerciseInputTable';
import ButtonBar from '../../containers/Track/ButtonBar';
import { trackSaveExercisesAction, trackEditFieldAction } from '../../actions/track';
import { getLoadingByDomain } from '../../selectors/loading';
import { TRACK } from '../../constants/reducerObjects';

const styles = StyleSheet.create( {
  buttonStyle: {
    width: '33.3%',
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: theme.PRIMARY_BACKGROUND,
    paddingTop: 20,
    paddingBottom: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: theme.ACTIVE_TAB_COLOR,
  },
  disabledStyle: {
    fontSize: 16,
    color: 'gray',
  },
  scrollView: { overflow: 'scroll' },
  card: { padding: 20 },
  cardContainer: { padding:0 },
  innerCardContainer: { padding: 10 },
  exerciseContainer: { marginTop: 20, marginBottom: 20 },
  linkContainer: { justifyContent: 'space-between', flexDirection: 'row' },
  targetWeight: { marginTop: 5 },
  pagination: {
    backgroundColor: theme.PRIMARY_BACKGROUND,
    height: 70,
    marginTop: 20,
  },
} );

class Tracker extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerRight: (
        <Button
          buttonStyle={ { backgroundColor: 'transparent' } }
          color={ theme.ACTIVE_TAB_COLOR }
          textStyle={ { fontSize: 18 } }
          title='Save'
          onPress={ () => navigation.state.params.saveWorkout() }
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      currentIndex: 0,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams( { saveWorkout: this.saveWorkout } );
  }

  saveWorkout = () => this.props.saveTrackedExercises();

  handleNavigation = direction => {
    const { currentIndex } = this.state;
    const isNotLastItem = currentIndex + 1 < this.props.exercises.length;
    const isNotFirstItem = currentIndex !== 0;

    if ( direction === 'next' && isNotLastItem ) {
      this.setState( { currentIndex: currentIndex + 1 } );
    }
    else if ( direction === 'previous' && isNotFirstItem ) {
      this.setState( { currentIndex: currentIndex - 1 } );
    }
  };

  render() {
    const { currentIndex } = this.state;
    const { sets, day, exercises, navigation, editField, loading } = this.props;
    const targetWeight = exercises[ currentIndex ].weight;
    const targetReps = exercises[ currentIndex ].reps;
    const name = ( exercises[ currentIndex ].name )
      ? exercises[ currentIndex ].name
      : exercises[ currentIndex ].exercise;

    if ( loading ) {
      return <Loading />;
    }

    return (
      <Container>
        <KeyboardAwareScrollView
          containerStyling={ styles.scrollView }
          extraScrollHeight={ 30 }
        >
          <Card
            style={ styles.card }
            containerStyling={ styles.cardContainer }
          >
            <View style={ styles.innerCardContainer }>
              <View style={ styles.exerciseContainer }>
                <StyledText>{ day }</StyledText>
              </View>


              <View style={ styles.linkContainer }>
                <Link
                  title={ name }
                  onPress={
                    () => {
                      navigation.navigate( 'ExerciseHistory', {
                        exercise: name,
                      } );
                    }
                  }
                />
              </View>

              <View style={ styles.targetWeight }>
                {
                  ( targetWeight !== '' && targetReps !== '' )
                  && (
                    <StyledText>
                    Target: { targetWeight } lbs x { targetReps }
                    </StyledText>
                  )
                }
              </View>

              <ExerciseInputTable
                items={ sets[ currentIndex ] || [] }
                updateField={ update => editField( {
                  ...update,
                  index: currentIndex,
                } ) }
              />
            </View>

            <ButtonBar
              currentIndex={ currentIndex }
              updateIndex={ index => this.setState( { currentIndex: index } ) }
            />
          </Card>

          <View style={ styles.pagination }>
            <Pagination
              current={ currentIndex + 1 }
              total={ this.props.exercises.length }
              onPress={ direction => this.handleNavigation( direction ) }
            />
          </View>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

Tracker.propTypes = {
  navigation: PropTypes.object,
  sets: PropTypes.array,
  day: PropTypes.string,
  exercises: PropTypes.array,
  editField: PropTypes.func,
  saveTrackedExercises: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ( {
  sets: getTrackSets( state ),
  day: getTrackDay( state ),
  exercises: getTrackExercisesByDay( state ),
  loading: getLoadingByDomain( state, TRACK ),
} );

const mapDispatchToProps = dispatch => ( {
  editField: data => dispatch( trackEditFieldAction( data ) ),
  saveTrackedExercises: data => dispatch( trackSaveExercisesAction( data ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Tracker );
