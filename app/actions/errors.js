import { CLEAR_ERROR, HANDLE_ERROR } from '../constants/errors';


export const handleErrorAction = data => ( {
  type: HANDLE_ERROR,
  payload: data,
} );

export const clearErrorAction = data => ( {
  type: CLEAR_ERROR,
  payload: data,
} );
