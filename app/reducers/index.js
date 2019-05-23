import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
import trackOLD from './track-OLD';
import workoutsApi from './workoutsApi';
import workout from './workout';
import program from './program';
import exercises from './exercises';
import analytics from './analytics';
import logs from './logs';
import { LOG_OUT } from '../constants/authentication';
import loading from './loading';
import user from './user';
import errors from './errors';
import bodyLogs from './bodyLogs';
import completedExercises from './completedExercises';
import savedWorkouts from './savedWorkouts';
import exerciseList from './exerciseList';
import building from './building';
import exercisesNEW from './exercises-NEW';
import track from './track';

const appReducer = combineReducers( {
  authentication,
  bodyLogs,
  building,
  completedExercises,
  errors,
  exerciseList,
  exercisesNEW,
  profile,
  track,
  trackOLD,
  workoutsApi,
  workout,
  program,
  exercises,
  analytics,
  logs,
  loading,
  savedWorkouts,
  user,
} );


const rootReducer = ( state, action ) => {
  if ( action.type === LOG_OUT ) {
    state = undefined;
  }

  return appReducer( state, action );
};

export default rootReducer;
