import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
import track from './track';
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

const appReducer = combineReducers( {
  authentication,
  bodyLogs,
  completedExercises,
  errors,
  exerciseList,
  profile,
  track,
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
