

const ABS = 'Abs';
const BACK = 'Back';
const BICEPS = 'Biceps';
const CALVES = 'Calves';
const CHEST = 'Chest';
const FOREARMS = 'Forearms';
const GLUTES = 'Glutes';
const HAMSTRINGS = 'Hamstrings';
const QUADS = 'Quads';
const SHOULDERS = 'Shoulders';
const TRAPS = 'Traps';
const TRICEPS = 'Triceps';

// Body measurements
const ARMS = 'Arms';
const BODY_FAT = 'Body Fat';
const HIPS = 'Hips';
const THIGHS = 'Thighs';
const WAIST = 'Waist';
const WEIGHT = 'Weight';



export const bodyMeasurements = [
  { title: ARMS,     measurement: 'in' },
  { title: BODY_FAT, measurement: '%' },
  { title: CALVES,   measurement: 'in' },
  { title: CHEST,    measurement: 'in' },
  { title: FOREARMS, measurement: 'in' },
  { title: HIPS,     measurement: 'in' },
  { title: THIGHS,   measurement: 'in' },
  { title: WAIST,    measurement: 'in' },
  { title: WEIGHT,   measurement: 'lbs' },
];


export const baseExerciseList = [
  ABS,
  BACK,
  BICEPS,
  CALVES,
  CHEST,
  FOREARMS,
  GLUTES,
  HAMSTRINGS,
  QUADS,
  SHOULDERS,
  TRAPS,
  TRICEPS
];

export const muscleGroupSeparatedExercises = {
  upperBodyMuscles: [
    { exercise: ABS },
    { exercise: BACK },
    { exercise: BICEPS },
    { exercise: CHEST },
    { exercise: FOREARMS },
    { exercise: SHOULDERS },
    { exercise: TRAPS },
    { exercise: TRICEPS },
  ],
  lowerBodyMuscles: [
    { exercise: CALVES },
    { exercise: GLUTES },
    { exercise: HAMSTRINGS },
    { exercise: QUADS },
  ],
};

