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

export const getUid = createSelector(
  state => getUser( state ),
  user => ( ( user.uid ) ? user.uid : undefined ),
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

export const getName = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return { firstName: user.firstName, lastName: user.lastName };
    }

    return { firstName: '', lastName: '' };
  },
);

export const getGender = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return user.gender;
    }

    return '';
  },
);

export const getPrimaryGoal = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return user.primaryGoal;
    }

    return '';
  },
);

export const getEmail = createSelector(
  state => getUser( state ),
  user => {
    if ( user.uid !== undefined && user.uid !== '' ) {
      return user.email;
    }

    return '';
  },
);
