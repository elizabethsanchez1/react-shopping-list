import { combineReducers } from 'redux';
import profile from './profile';
import analytics from './analytics';
import logs from './logs';
import { CLEAR_STORE } from '../constants/authentication';
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
  if ( action.type === CLEAR_STORE ) {
    state = undefined;
  }

  return appReducer( state, action );
};

export default rootReducer;
