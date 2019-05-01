

export const getErrors = state => state.errors;

export const getDomainError = ( state, domain ) => {
  const reducer = getErrors( state );
  return ( reducer[ domain ] ) ? reducer[ domain ] : false;
};
