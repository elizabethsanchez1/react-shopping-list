import {
  OPEN_DELETE_SCREEN,
  STORE_BUILD_OBJECT_CONFIG,
  CREATE_BUILD_OBJECT,
  UPDATE_DAY_TITLE,
  ADD_PROGRAM,
  BUILD_EDIT_PROGRAM,
  BUILD_EDIT_FIELD,
  BUILD_DELETE_EXERCISE,
  COPY_BUILD_OBJECT,
  BUILD_CHANGE_WEEK,
  BUILD_SAVE_WORKOUT,
  ADD_WORKOUT,
  BUILD_EDIT_WORKOUT, BUILD_SELECT_DAY,
} from '../constants/building';
import { BUILD_UPDATE_EXERCISE_ORDER } from '../constants/exercises';

export const addProgramAction = data => ( {
  type: ADD_PROGRAM,
  payload: data,
} );

export const addWorkoutAction = data => ( {
  type: ADD_WORKOUT,
  payload: data,
} );

export const buildChangeWeekAction = data => ( {
  type: BUILD_CHANGE_WEEK,
  payload: data,
} );

export const buildDeleteExerciseAction = data => ( {
  type: BUILD_DELETE_EXERCISE,
  payload: data,
} );

export const buildEditFieldAction = data => ( {
  type: BUILD_EDIT_FIELD,
  payload: data,
} );

export const buildSaveWorkoutAction = data => ( {
  type: BUILD_SAVE_WORKOUT,
  payload: data,
} );

export const buildSelectDayAction = data => ( {
  type: BUILD_SELECT_DAY,
  payload: data,
} );

export const buildUpdateExerciseOrderAction = data => ( {
  type: BUILD_UPDATE_EXERCISE_ORDER,
  payload: data,
} );

export const copyBuildObjectAction = data => ( {
  type: COPY_BUILD_OBJECT,
  payload: data,
} );


export const createBuildObjectAction = data => ( {
  type: CREATE_BUILD_OBJECT,
  payload: data,
} );

export const editProgramAction = data => ( {
  type: BUILD_EDIT_PROGRAM,
  payload: data,
} );

export const editWorkoutAction = data => ( {
  type: BUILD_EDIT_WORKOUT,
  payload: data,
} );

export const openDeleteScreenAction = data => ( {
  type: OPEN_DELETE_SCREEN,
  payload: data,
} );

export const storeBuildObjectConfigAction = data => ( {
  type: STORE_BUILD_OBJECT_CONFIG,
  payload: data,
} );

export const updateDayTitleAction = data => ( {
  type: UPDATE_DAY_TITLE,
  payload: data,
} );
