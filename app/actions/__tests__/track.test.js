import * as constants from '../../constants/track';
import * as actions from '../../actions/track';

describe('Track action creators', () => {

  it('should create an action to update a field', () => {
    const exerciseSets = [
      [
        { set: 1, previous: '', weight: '', reps: '' },
        { set: 2, previous: '', weight: '', reps: '' },
        { set: 3, previous: '', weight: '', reps: '' }
      ]
    ];
    const exerciseIndex = 0;
    const setIndex = 0;
    const field = 'weight';
    const value = 10;

    const expectedAction = {
      type: constants.UPDATE_FIELD,
      payload: { exerciseSets, exerciseIndex, setIndex, field, value }
    };

    expect(actions.updateField(exerciseSets, exerciseIndex, setIndex, field, value))
    .toEqual(expectedAction);
  });

  it('should create an action to quick track trackable sets', () => {
    const exercises = [
      { weight: '185', exercise: "Barbell Front Squat", compound: true, reps: '8', sets: '3' },
    ];
    const exerciseSets = [
      [
        { set: 1, previous: '', weight: '', reps: '' },
        { set: 2, previous: '', weight: '', reps: '' },
        { set: 3, previous: '', weight: '', reps: '' },
      ]
    ];
    const exerciseIndex = 0;

    const expectedAction = {
      type: constants.QUICK_TRACK,
      payload: { exercises, exerciseSets, exerciseIndex }
    };

    expect(
      actions.quickTrack(exercises, exerciseSets, exerciseIndex)
    ).toEqual(
      expectedAction
    )
  });

  it('should create an action to remove exercise from trackable sets', () => {
    // TODO need to create test cases for type:workout use case
    const selectedData = {
      "type": "program",
      "name": "Cutting Program 2018",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "created": "2018-09-27T13:09:12.624Z",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "program": {
        "week1": [
        {
          "day": "Upper Body",
          "exercises": [
            {
              "weight": "60",
              "exercise": "Barbell Curl",
              "compound": false,
              "reps": "12",
              "sets": "3",
              "isolation": true,
              "muscleGroup": "Biceps"
            },
            {
              "weight": "225",
              "exercise": "Barbell Bench Press",
              "compound": true,
              "reps": "5",
              "sets": "5",
              "isolation": false,
              "muscleGroup": "Chest"
            }
          ],
          "completed": true
        },
        {
          "day": "Lower Body",
          "exercises": [
            {
              "weight": "185",
              "exercise": "Barbell Front Squat",
              "compound": true,
              "reps": "8",
              "sets": "3",
              "isolation": false,
              "muscleGroup": "Quads"
            },
            {
              "weight": "225",
              "exercise": "Barbell Squat",
              "compound": true,
              "reps": "8",
              "sets": "3",
              "isolation": false,
              "muscleGroup": "Quads"
            }
          ],
          "completed": true
        }
      ]
      },
    };
    const type = 'program';
    const exerciseIndex = 0;
    const selectedDay = 0;
    const selectedWeek = 'week1';
    const expectedAction = {
      type: constants.REMOVE_EXERCISE,
      payload: { selectedData, type, selectedWeek, selectedDay, exerciseIndex }
    };

    expect(
      actions.removeExercise(selectedData, type, selectedWeek, selectedDay, exerciseIndex)
    ).toEqual(
      expectedAction
    )
  });

  it('should create an action to add exercises from the tracker screen', () => {
    const selectedData = {
      "type": "program",
      "name": "Cutting Program 2018",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "created": "2018-09-27T13:09:12.624Z",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "program": {
        "week1": [
          {
            "day": "Upper Body",
            "exercises": [
              {
                "weight": "60",
                "exercise": "Barbell Curl",
                "compound": false,
                "reps": "12",
                "sets": "3",
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "weight": "225",
                "exercise": "Barbell Bench Press",
                "compound": true,
                "reps": "5",
                "sets": "5",
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ],
            "completed": true
          },
          {
            "day": "Lower Body",
            "exercises": [
              {
                "weight": "185",
                "exercise": "Barbell Front Squat",
                "compound": true,
                "reps": "8",
                "sets": "3",
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "weight": "225",
                "exercise": "Barbell Squat",
                "compound": true,
                "reps": "8",
                "sets": "3",
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ],
            "completed": true
          }
        ]
      },
    };
    const type = 'program';
    const exerciseIndex = 0;
    const selectedDay = 0;
    const selectedWeek = 'week1';
    const newExercises = [[],[]];

    const expectedAction = {
      type: constants.ADD_EXERCISES,
      payload: { selectedData, type, selectedWeek, selectedDay, exerciseIndex, newExercises }
    };

    expect(
      actions.addExercises(selectedData, type, selectedWeek, selectedDay, exerciseIndex, newExercises)
    ).toEqual(
      expectedAction
    );
  });

  it('should create an action to add or remove sets from trackable sets', () => {
    const exerciseSets = [
        [
          {
            "set": 1,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          },
          {
            "set": 2,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          },
          {
            "set": 3,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          },
          {
            "set": 4,
            "previous": "",
            "weight": "",
            "reps": ""
          },
          {
            "set": 5,
            "previous": "",
            "weight": "",
            "reps": ""
          }
        ],
        [
          {
            "set": 1,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          },
          {
            "set": 2,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          },
          {
            "set": 3,
            "previous": "185 x 5",
            "weight": "",
            "reps": ""
          }
        ]
      ];
    const exerciseIndex = 1;
    const modification = 'remove';

    const expectedAction = {
      type: constants.MODIFY_SETS,
      payload: { exerciseSets, exerciseIndex, modification }
    };

    expect(
      actions.modifySets(exerciseSets, exerciseIndex, modification)
    ).toEqual(
      expectedAction
    )
  });


  it('should create an action to calculate program attempt information', () => {
    const selectedData = {};
    const documentIds = [
      {
        "name": "Maintenance Jan-2019 to Apr-2019",
        "id": "szhLlnStkplUCHullOhR"
      },
    ];

    const expectedAction = {
      type: constants.CALCULATE_PROGRAM_ATTEMPT,
      payload: { selectedData, documentIds }
    };

    expect(
      actions.calculateProgramAttempt(selectedData, documentIds)
    ).toEqual(expectedAction);
  });

  it('should create an action to handle formatting exercises for the tracker page', () => {
    const exercises = [];

    const expectedAction = {
      type: constants.FORMAT_EXERCISES,
      payload: { exercises }
    };

    expect(
      actions.formatExercises(exercises)
    ).toEqual(expectedAction);
  });

  it('should store index number for exercise selected while adding exercises on the tracker page', () => {


    const expectedAction = {
      type: constants.STORE_ADD_EXERCISE_INDEX,
      payload: { index: 0 }
    };

    expect(
      actions.storeAddExerciseIndex(0)
    ).toEqual(expectedAction);

  });

  it('should handle removing exercises from workout while user is tracking it', () => {
    const expectedAction =  {
      type: constants.REMOVE_EXERCISE,
      payload: {
        selectedData: {},
        type: '',
        selectedWeek: '',
        selectedDay: 0,
        exerciseIndex: 0
      }
    };


    expect(
      actions.removeExercise(
        {},
        '',
        '',
        0,
        0
      )
    ).toEqual(
      expectedAction
    );
  });

  it('should handle marking program completed flags', () => {
    const expectedAction = {
      type: constants.MARK_PROGRAM_COMPLETED_FLAGS,
      payload: {
        selectedData: {},
        completedExercises: [],
      }
    };

    const selectedData = {};
    const completedExercises = [];

    expect(
      actions.markProgramCompletedFlags(selectedData, completedExercises)
    ).toEqual(
      expectedAction
    )
  })

});
