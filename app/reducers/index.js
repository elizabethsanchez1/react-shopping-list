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

const appReducer = combineReducers( {
  authentication,
  errors,
  profile,
  track,
  workoutsApi,
  workout,
  program,
  exercises,
  analytics,
  logs,
  loading,
  user,
} );


const rootReducer = ( state, action ) => {
  if ( action.type === LOG_OUT ) {
    state = undefined;
  }

  return appReducer( state, action );
};

export default rootReducer;
