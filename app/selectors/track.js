import { createSelector } from "reselect";
import moment from 'moment'

export const getAttemptInfo = state => state.track.attemptInfo;

export const getActiveAttempt = state => state.track.attemptInfo.activeAttempt;

export const getBuildHistoryFlag = createSelector(
  state => state.track,
  (state) => {
    // debugger;
    // const { completedExercises, selectedData } = state;
    // const name = selectedData.name;
    // let flag = false;
    //
    // completedExercises.forEach(item => {
    //   if (item.program === name) {
    //     flag = true;
    //   }
    // });
    //
    // return flag;

    return true;
  }
);

export const getCompletedExercises = state => state.track.completedExercises;


export const getAvailableExerciseList = createSelector(
  state => state.track.completedExercises,
  exercises => {
     // return a order list of exercises with no duplicates
    const uniqueExercises = [...new Set(exercises.map(exercise => exercise.exercise).sort())];
    const formattedExercises = uniqueExercises.map(exercise => {
      return { value: exercise };
    });
    return formattedExercises;
  }
);


export const getExerciseHistory = state => state.track.exerciseHistory;

export const getExerciseIndexLocation = state => state.track.addExerciseIndexLocation;

export const getProgramPercentages = createSelector(
  state => state.program.savedPrograms,
  state => state.track.completedExercises,
  (programs, completedExercises) => {

    const completedPercentages = {};
    programs.forEach(program => {
      let totalDays = 0;
      Object.keys(program.program).forEach(key => {
        program.program[key].forEach(day => {
          totalDays += day.exercises.length;
        });
      });

      const completed = completedExercises.filter(exercise => exercise.belongsTo === program.activeAttempt).length;

      const percentage = Math.round((completed / totalDays) * 100);

      completedPercentages[program.name] = percentage;
    });


    return completedPercentages;
  }
);


export const getTrackDayName = createSelector(
  state => state.track,
  (state) => {
    const { selectedWeek, selectedDay, selectedData, type } = state;

    if (type === 'program') {
      return selectedData.program[selectedWeek][selectedDay].day;
    }

    if (type === 'workout') {
      return selectedData.workout.week1[0].day;
    }
  }
);

export const getTrackRedirect = state => state.track.redirectToSummary;

export const getProgram = state => state.track.selectedData.program;

export const getSelectedData = state => state.track.selectedData;

export const getTrackableExerciseSets = state => state.track.trackableExerciseSets;

export const getTracksSelectedWeek = state => state.track.selectedWeek;

export const getTracksSelectedDay = state => state.track.selectedDay;

export const getProgramWeeks = state => state.track.completedWeeks;

export const getTrackExercises = createSelector(
  state => state.track,
  (trackState) => {
    const { selectedData, selectedDay, selectedWeek, type } = trackState;

    if (type === 'program') {
      return selectedData.program[selectedWeek][selectedDay].exercises;
    }
    else if (type === 'workout') {
      return selectedData.workout.week1[0].exercises;
    }
  }
);

export const getTrackedExercises = state => state.track.trackedExercises;

export const getTrackerSetupLoadingState = state => state.track.trackerSetupLoading;

export const getTrackType = state => state.track.type;
