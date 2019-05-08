import {
  ADD_PROGRAM,
  CREATE_PROGRAM_OBJECT,
  EDIT_FIELD,
  EDIT_PROGRAM, LISTEN_FOR_SAVED_WORKOUTS,
  PROGRAM_CHANGE_WEEK, PROGRAM_COPY_WEEK,
  PROGRAM_DELETE_EXERCISE, PROGRAM_OPEN_CUSTOM_SET, PROGRAM_OPEN_DELETE, PROGRAM_SAVE_CUSTOM_SET,
  PROGRAM_SAVE_ORDER,
  PROGRAM_UPDATE_DAY, RECEIVED_SAVED_WORKOUTS,
  SORT_EXERCISES,
  STORE_PROGRAM_CONFIG,
} from '../constants/program';

export function changeWeek(week) {
  return { type: PROGRAM_CHANGE_WEEK, payload: { week } };
}

export function copyWeek(copyFrom, copyTo) {
  return { type: PROGRAM_COPY_WEEK, payload: { copyFrom, copyTo } };
}

export function createProgramObject() {
  return { type: CREATE_PROGRAM_OBJECT };
}

export function deleteExercise(exerciseIndex) {
  return { type: PROGRAM_DELETE_EXERCISE, payload: { exerciseIndex } };
}

export function editField(update) {
  return { type: EDIT_FIELD, payload: { update } };
}

export function openCustomSet(exerciseSelected, daySelected) {
  return { type: PROGRAM_OPEN_CUSTOM_SET, payload: { exerciseSelected, daySelected } };
}

export function openDeletePage(daySelected) {
  return { type: PROGRAM_OPEN_DELETE, payload: { daySelected } };
}

export function saveCustomSet(customSet) {
  return { type: PROGRAM_SAVE_CUSTOM_SET, payload: { customSet } };
}

export function saveSortedOrder(newOrder) {
  return { type: PROGRAM_SAVE_ORDER, payload: { newOrder } };
}

export function sortExercises(daySelected) {
  return { type: SORT_EXERCISES, payload: { daySelected } };
}

export function updateDay(name, daySelected) {
  return { type: PROGRAM_UPDATE_DAY, payload: { name, daySelected } };
}
