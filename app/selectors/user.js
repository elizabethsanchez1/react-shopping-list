import { createSelector } from 'reselect';


export const getUser = state => state.user;

export const getAuthenticaton = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return true;
    }
    else {
      return false;
    }
  },
);

export const getPreferredWeightMeasurement = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return user.preferredWeightMeasurement;
    }

    return 'lbs';
  },
);
