import {
  ADD_WORKOUT,
  CREATE_WORKOUT_OBJECT,
  EDIT_WORKOUT,
  STORE_WORKOUT_CONFIG,
  WORKOUT_DELETE_EXERCISE,
  WORKOUT_OPEN_CUSTOM_SET, WORKOUT_SAVE_CUSTOM_SET,
  WORKOUT_SAVE_ORDER,
  WORKOUT_UPDATE_DAY
} from "../constants/workout";
import { EDIT_FIELD } from "../constants/program";

export function addWorkout() {
  return { type: ADD_WORKOUT };
}

export function createWorkoutObject() {
  return { type: CREATE_WORKOUT_OBJECT };
}

export function deleteExercise(exerciseIndex) {
  return { type: WORKOUT_DELETE_EXERCISE, payload: { exerciseIndex } };
}

export function editField(update) {
  return { type: EDIT_FIELD, payload: { update } };
}

export function editWorkout(workout) {
  return { type: EDIT_WORKOUT, payload: { workout } };
}

export function openCustomSet(exerciseSelected) {
  return { type: WORKOUT_OPEN_CUSTOM_SET, payload: { exerciseSelected } };
}

export function saveCustomSet(customSet) {
  return { type: WORKOUT_SAVE_CUSTOM_SET, payload: { customSet } };
}

export function saveSortedOrder(newOrder) {
  return { type: WORKOUT_SAVE_ORDER, payload: { newOrder } };
}

export function storeWorkoutConfig(config) {
  return { type: STORE_WORKOUT_CONFIG, payload: { config } };
}

export function updateDay(name, daySelected) {
  return { type: WORKOUT_UPDATE_DAY, payload: { name, daySelected } };
}