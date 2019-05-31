import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
import workoutsApi from './workoutsApi';
import workout from './workout';
import program from './program';
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
import exercises from './exercises';
import track from './track';

const appReducer = combineReducers( {
  // migrated over
  authentication,
  bodyLogs,
  building,
  completedExercises,
  errors,
  exerciseList,
  exercises,
  loading,
  logs,
  profile,
  savedWorkouts,
  track,
  user,

  // old reducers
  // bodyLogs,
  // workoutsApi,
  // workout,
  // program,
  // analytics,

} );


const rootReducer = ( state, action ) => {
  if ( action.type === LOG_OUT ) {
    state = undefined;
  }

  return appReducer( state, action );
};

export default rootReducer;
