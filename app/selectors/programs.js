import { createSelector } from 'reselect';


export const getProgramNames = createSelector(
  state => state.program,
  (program) => {

    if (program.savedPrograms) {
      return program.savedPrograms.map(program => {
        return {value: program.name};
      });
    }

    return undefined;
  }
);

export const getSavedPrograms = state => state.program.savedPrograms;
