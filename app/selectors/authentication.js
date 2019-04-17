import { createSelector } from "reselect";



export const getRegisterLoading = createSelector(
  state => state.authentication.registerLoading,
  loading => loading,
);

export const getLoginLoading = createSelector(
  state => state.authentication.loginLoading,
  loading => loading,
);


export const isRegisterFlow = state => state.registerFlow;


export const getUid = createSelector(
  state => state.authentication.uid,
  (uid) => uid,
);

export const getEmail = createSelector(
  state => state.authentication.email,
  email => email,
);

