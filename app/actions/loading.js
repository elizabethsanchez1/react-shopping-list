import { HIDE_LOADING, SHOW_LOADING } from '../constants/loading';


export const showLoadingAction = data => ( {
  type: SHOW_LOADING,
  payload: data,
} );

export const hideLoadingAction = data => ( {
  type: HIDE_LOADING,
  payload: data,
} );
