

export const getLoading = state => state.loading;


export const getLoadingByDomain = ( state, domain ) => {
  const reducer = getLoading( state );
  return ( reducer[ domain ] ) ? reducer[ domain ] : false;
};
