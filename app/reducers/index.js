import { combineReducers } from 'redux';
import authentication from './authentication';
import profile from './profile';
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
  authentication,  // this needs to be cleaned up
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
  // analytics,

} );


const rootReducer = ( state, action ) => {
  if ( action.type === LOG_OUT ) {
    state = undefined;
  }

  return appReducer( state, action );
};

export default rootReducer;
