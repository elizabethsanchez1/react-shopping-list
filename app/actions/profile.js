import {
  UPDATE_FIELD_REQUEST,
  UPDATE_FIELD_SUCCESS,
  UPDATE_FIELD_FAILED,
} from '../constants/profile';

export const updateProfileFieldRequestAction = data => {
  return {
    type: UPDATE_FIELD_REQUEST,
    payload: data,
  };
};

export const updateProfileFieldSuccessAction = data => {
  return {
    type: UPDATE_FIELD_SUCCESS,
    payload: data,
  };
};

export const updateProfileFieldFailedAction = data => {
  return {
    type: UPDATE_FIELD_FAILED,
    payload: data,
  };
};
