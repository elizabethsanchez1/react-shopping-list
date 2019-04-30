import { HANDLE_ERROR } from '../constants/errors';


export const handleErrorAction = data => ( {
  type: HANDLE_ERROR,
  payload: data,
} );