import reducer from '../../reducers/track'
import {
  ADD_EXERCISES,
  CALCULATE_PROGRAM_ATTEMPT, FORMAT_EXERCISES, MARK_PROGRAM_COMPLETED_FLAGS,
  MODIFY_SETS,
  QUICK_TRACK,
  REMOVE_EXERCISE, STORE_ADD_EXERCISE_INDEX,
  UPDATE_FIELD
} from "../../constants/track";


describe('Track Reducer', () => {
  const initialState = {
    addExerciseIndexLocation: 0,
    attemptInfo: {},
    exerciseHistory: {},
    redirectToSummary: false,
    selectedData: {},
    type: '',
    selectedDay: '',
    selectedWeek: '',
    trackedExercises: [],
    // continueProgram: false,
    // resetProgram: false,
    completedExercises: [],
    completedWeeks: [],
    active: false,
    trackableExerciseSets: [],
    trackerSetupLoading: true,
  };

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  });


  it('should handle UPDATE_FIELD', () => {
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

    expect(
      reducer({}, {
        type: UPDATE_FIELD,
        payload: { exerciseSets, exerciseIndex, setIndex, field, value }
      })
    ).toEqual(
      {
        trackableExerciseSets: [
          [
            { set: 1, previous: '', weight: 10, reps: ''},
            { set: 2, previous: '', weight: '', reps: ''},
            { set: 3, previous: '', weight: '', reps: ''},
          ]
        ]
      }
    );

    expect(
      reducer({}, {
        type: UPDATE_FIELD,
        payload: { exerciseSets, exerciseIndex, setIndex, field, value: '' }
      })
    ).toEqual(
      {
        trackableExerciseSets: [
          [
            { set: 1, previous: '', weight: '', reps: ''},
            { set: 2, previous: '', weight: '', reps: ''},
            { set: 3, previous: '', weight: '', reps: ''},
          ]
        ]
      }
    );
  });

  it('should handle QUICK_TRACK', () => {
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
    const finishedSet = [
      [
        { set: 1, previous: '', weight: 185, reps: 8 },
        { set: 2, previous: '', weight: 185, reps: 8 },
        { set: 3, previous: '', weight: 185, reps: 8 },
      ]
    ];

    expect(
      reducer({}, {
        type: QUICK_TRACK,
        payload: { exercises, exerciseSets, exerciseIndex }
      })
    ).toEqual(
      { trackableExerciseSets: finishedSet }
    )

  });


  it('should handle REMOVE_EXERCISE', () => {
    // TODO need to create test cases for type:workout use case
    const selectedData = {
      "program": {
        "week1": [
          {
            "completed": true,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "60",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ]
          },
          {
            "completed": true,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "exercise": "Barbell Squat",
                "weight": "225",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ],
        "week2": [
          {
            "completed": true,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "50",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ]
          },
          {
            "completed": false,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "exercise": "Barbell Squat",
                "weight": "225",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ],
      },
      "created": "2018-09-27T13:09:12.624Z",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "name": "Cutting Program 2018",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "type": "program"
    };
    const type = 'program';
    const exerciseIndex = 1;
    const selectedDay = 1;
    const selectedWeek = 'week2';
    const exerciseSets = [
      [
        {
          "set": 1,
          "previous": "",
          "weight": 185,
          "reps": 8
        },
        {
          "set": 2,
          "previous": "",
          "weight": 185,
          "reps": 8
        },
        {
          "set": 3,
          "previous": "",
          "weight": 185,
          "reps": 8
        }
      ],
      [
        {
          "set": 1,
          "previous": "",
          "weight": 225,
          "reps": 8
        },
        {
          "set": 2,
          "previous": "",
          "weight": 225,
          "reps": 8
        },
        {
          "set": 3,
          "previous": "",
          "weight": 225,
          "reps": 8
        }
      ]
    ];

    const finishedSelectedData = {
      "program": {
        "week2": [
          {
            "completed": true,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "50",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ]
          },
          {
            "completed": false,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ],
        "week1": [
          {
            "completed": true,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "60",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ]
          },
          {
            "completed": true,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "exercise": "Barbell Squat",
                "weight": "225",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ]
      },
      "created": "2018-09-27T13:09:12.624Z",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "name": "Cutting Program 2018",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "type": "program"
    };
    const finishedExerciseSets = [
      [
        {
          "set": 1,
          "previous": "",
          "weight": 185,
          "reps": 8
        },
        {
          "set": 2,
          "previous": "",
          "weight": 185,
          "reps": 8
        },
        {
          "set": 3,
          "previous": "",
          "weight": 185,
          "reps": 8
        }
      ]
    ];

    expect(
      reducer({}, {
        type: REMOVE_EXERCISE,
        payload: { selectedData, type, selectedWeek, selectedDay, exerciseIndex, exerciseSets }
      })
    ).toEqual(
      {
        selectedData: finishedSelectedData,
        trackableExerciseSets: finishedExerciseSets,
      }
    )
  });

  it('should handle ADD_EXERCISES from tracker screen', () => {
    const initialState = {
      active: true,
    };
    const selectedData = {
      "program": {
        "week1": [
          {
            "completed": false,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "60",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              }
            ]
          },
          {
            "completed": false,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "exercise": "Barbell Squat",
                "weight": "225",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ]
      },
      "created": "2018-09-27T13:09:12.624Z",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "name": "Cutting Program 2018",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "type": "program"
    }
    const type = 'program';
    const exerciseIndex = 2;
    const selectedDay = 0;
    const selectedWeek = 'week1';
    const newExercises = [
      {
        "compound": false,
        "muscleGroup": "Back",
        "name": "Barbell Good Morning",
        "isolation": true,
        "selected": true
      }
    ]
    const exerciseSets = [
      [
        {
          "set": 1,
          "previous": "",
          "weight": 60,
          "reps": 12
        },
        {
          "set": 2,
          "previous": "",
          "weight": 60,
          "reps": 12
        },
        {
          "set": 3,
          "previous": "",
          "weight": 60,
          "reps": 12
        }
      ],
      [
        {
          "set": 1,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 2,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 3,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 4,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 5,
          "previous": "",
          "weight": 225,
          "reps": 5
        }
      ]
    ];

    const finishedSelectedData = {
      "program": {
        "week1": [
          {
            "completed": false,
            "day": "Upper Body",
            "exercises": [
              {
                "exercise": "Barbell Curl",
                "weight": "60",
                "sets": "3",
                "reps": "12",
                "compound": false,
                "isolation": true,
                "muscleGroup": "Biceps"
              },
              {
                "exercise": "Barbell Bench Press",
                "weight": "225",
                "sets": "5",
                "reps": "5",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Chest"
              },
              {
                "weight": "",
                "reps": "",
                "sets": 3,
                "exercise": "Barbell Good Morning",
                "muscleGroup": "Back",
                "compound": false,
                "isolation": true
              }
            ]
          },
          {
            "completed": false,
            "day": "Lower Body",
            "exercises": [
              {
                "exercise": "Barbell Front Squat",
                "weight": "185",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              },
              {
                "exercise": "Barbell Squat",
                "weight": "225",
                "sets": "3",
                "reps": "8",
                "compound": true,
                "isolation": false,
                "muscleGroup": "Quads"
              }
            ]
          }
        ]
      },
      "created": "2018-09-27T13:09:12.624Z",
      "activeAttempt": "cutting_program_2018_attempt_1",
      "name": "Cutting Program 2018",
      "attempts": [
        "cutting_program_2018_attempt_1"
      ],
      "type": "program"
    };
    const trackableExerciseSets = [
      [
        {
          "set": 1,
          "previous": "",
          "weight": 60,
          "reps": 12
        },
        {
          "set": 2,
          "previous": "",
          "weight": 60,
          "reps": 12
        },
        {
          "set": 3,
          "previous": "",
          "weight": 60,
          "reps": 12
        }
      ],
      [
        {
          "set": 1,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 2,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 3,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 4,
          "previous": "",
          "weight": 225,
          "reps": 5
        },
        {
          "set": 5,
          "previous": "",
          "weight": 225,
          "reps": 5
        }
      ],
      [
        {
          "set": 1,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 2,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 3,
          "previous": "",
          "weight": "",
          "reps": ""
        }
      ]
    ];

    expect(
      reducer(initialState, {
        type: ADD_EXERCISES,
        payload: {
          selectedData,
          type,
          selectedWeek,
          selectedDay,
          exerciseIndex,
          newExercises,
          exerciseSets
        }
      })
    ).toEqual(
      {
        active: true,
        selectedData: finishedSelectedData,
        trackableExerciseSets: trackableExerciseSets,
      }
    )

  });

  it('should handle removing and adding sets with MODIFY_SETS', () => {
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
      ],
    ];
    const exerciseIndex = 0;

    const updatedRemoveSet = [
      [
        {
          "set": 1,
          "previous": "185 x 5",
          "weight": "",
          "reps": ""
        },
      ],
    ];
    const updatedAddSet = [
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
          "previous": "",
          "weight": "",
          "reps": ""
        },
      ],
    ];

    expect(
      reducer({}, {
        type: MODIFY_SETS,
        payload: { exerciseSets, exerciseIndex, modification: 'remove' }
      })
    ).toEqual(
      { trackableExerciseSets: updatedRemoveSet }
    );

    expect(
      reducer({}, {
        type: MODIFY_SETS,
        payload: { exerciseSets, exerciseIndex, modification: 'add' }
      })
    ).toEqual(
      { trackableExerciseSets: updatedAddSet }
    );

  });

  it('should handle calculating new attempt string with CALCULATE_PROGRAM_PERCENTAGES', () => {
    const initialState = {
      selectedData: {
        "activeAttempt": "",
        "created": "2019-01-03T02:59:37.299Z",
        "attempts": [],
        "program": {
          "week1": [
            {
              "day": "Day 1",
              "exercises": [
                {
                  "weight": "185",
                  "exercise": "Barbell Bench Press",
                  "compound": true,
                  "reps": "10",
                  "sets": "3",
                  "isolation": false,
                  "muscleGroup": "Chest"
                },
                {
                  "weight": "60",
                  "exercise": "Barbell Curl",
                  "compound": false,
                  "reps": "10",
                  "sets": "3",
                  "isolation": true,
                  "muscleGroup": "Biceps"
                },
                {
                  "weight": "130",
                  "exercise": "Cable Overhead Tricep Extension",
                  "compound": false,
                  "reps": "12",
                  "sets": "2",
                  "isolation": true,
                  "muscleGroup": "Triceps"
                }
              ],
              "completed": false
            },
            {
              "day": "Day 2",
              "exercises": [
                {
                  "weight": "225",
                  "exercise": "Barbell Squat",
                  "compound": true,
                  "reps": "8",
                  "sets": "3",
                  "isolation": false,
                  "muscleGroup": "Quads"
                },
                {
                  "weight": "115",
                  "exercise": "Lying Leg Curl",
                  "compound": false,
                  "reps": "10",
                  "sets": "4",
                  "isolation": true,
                  "muscleGroup": "Hamstrings"
                },
                {
                  "weight": "105",
                  "exercise": "Standing Calf Raise",
                  "compound": false,
                  "reps": "12",
                  "sets": "2",
                  "isolation": true,
                  "muscleGroup": "Calves"
                }
              ],
              "completed": false
            }
          ],
        },
        "type": "program",
        "name": "Maintenance Jan-2019 to Apr-2019"
      },
    };

    const documentIds = [
      {
        "name": "Maintenance Jan-2019 to Apr-2019",
        "id": "szhLlnStkplUCHullOhR"
      },
    ];
    const completedState = {

      attemptInfo : {
        id: 'szhLlnStkplUCHullOhR',
        activeAttempt: 'maintenance_jan-2019_to_apr-2019_attempt_1',
        attempts: ['maintenance_jan-2019_to_apr-2019_attempt_1'],
        updateDatabase: true,
      },
    };

    expect(reducer( initialState, {
      type: CALCULATE_PROGRAM_ATTEMPT,
      payload: {
        selectedData: initialState.selectedData,
        documentIds
      }
    })).toEqual(
      Object.assign({}, initialState, {
        ...completedState
      })
    );

  });

  it('should handle creating a formatted object for trackable exercises with FORMAT_EXERCISES', () => {
    const exercises = [
      {
        "exercise": "Barbell Squat",
        "weight": "205",
        "sets": "3",
        "reps": "8",
        "compound": true,
        "isolation": false,
        "muscleGroup": "Quads"
      },
      {
        "exercise": "Standing Calf Raise",
        "weight": "105",
        "sets": "5",
        "reps": "12",
        "compound": false,
        "isolation": true,
        "muscleGroup": "Calves"
      },
      {
        "exercise": "Seated Leg Curl",
        "weight": "100",
        "sets": "4",
        "reps": "12",
        "compound": false,
        "isolation": true,
        "muscleGroup": "Hamstrings"
      },
    ];
    const formattedExercises = [
      [
        {
          "set": 1,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 2,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 3,
          "previous": "",
          "weight": "",
          "reps": ""
        }
      ],
      [
        {
          "set": 1,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 2,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 3,
          "previous": "",
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
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 2,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 3,
          "previous": "",
          "weight": "",
          "reps": ""
        },
        {
          "set": 4,
          "previous": "",
          "weight": "",
          "reps": ""
        }
      ],
    ]

    expect(reducer({}, {
      type: FORMAT_EXERCISES,
      payload: { exercises }
    })).toEqual(
      {
        trackableExerciseSets: formattedExercises,
        active: true,
        trackerSetupLoading: false,
      }
    )
  });


  it('should handle storing index location of where to insert exercises with STORE_ADD_EXERCISE_INDEX', () => {

    expect(reducer({}, {
      type: STORE_ADD_EXERCISE_INDEX,
      payload: { index: 0 }
    })).toEqual(
      {
        addExerciseIndexLocation: 0
      }
    )

  });


  it('should handle sorting of completed exercises in order to mark completion flag for exercise days that have already been tracked with MARK_PROGRAM_COMPLETED_FLAGS', () => {

    const selectedData = {
        "program": {
          "week7": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week5": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week3": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week1": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week8": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week12": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week6": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week4": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week11": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week2": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week9": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week10": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ]
        },
        "created": "2019-01-01T21:55:55.558Z",
        "activeAttempt": "maintenance_01-04_attempt_1",
        "name": "Maintenance 01-04",
        "attempts": [
          "maintenance_01-04_attempt_1"
        ],
        "type": "program"
      };
    const completedExercises = [
      {
        "estimated1RM": 157,
        "totalVolume": 6000,
        "exercise": "Standing Calf Raise",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 136,
        "trackedWeights": [
          120,
          120,
          120,
          120,
          120
        ],
        "estimated10RM": 120,
        "weight": 105,
        "trackedReps": [
          10,
          10,
          10,
          10,
          10
        ],
        "estimated12RM": 114,
        "estimated8RM": 126,
        "program": "Maintenance 01-04",
        "totalReps": 50,
        "muscleGroup": "Calves",
        "week": "week1",
        "estimated3RM": 144
      },
      {
        "estimated1RM": 274,
        "totalVolume": 4725,
        "exercise": "Barbell Squat",
        "trackedOn": "2019-01-16T00:47:18.047Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 237,
        "trackedWeights": [
          225,
          225,
          225
        ],
        "estimated10RM": 209,
        "weight": 205,
        "trackedReps": [
          7,
          7,
          7
        ],
        "estimated12RM": 199,
        "estimated8RM": 220,
        "program": "Maintenance 01-04",
        "totalReps": 21,
        "muscleGroup": "Quads",
        "week": "week10",
        "estimated3RM": 251
      },
      {
        "estimated1RM": 267,
        "totalVolume": 4050,
        "exercise": "Barbell Squat",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 231,
        "trackedWeights": [
          225,
          225,
          225
        ],
        "estimated10RM": 204,
        "weight": 205,
        "trackedReps": [
          6,
          6,
          6
        ],
        "estimated12RM": 194,
        "estimated8RM": 214,
        "program": "Maintenance 01-04",
        "totalReps": 18,
        "muscleGroup": "Quads",
        "week": "week1",
        "estimated3RM": 244
      },
      {
        "estimated1RM": 274,
        "totalVolume": 4950,
        "exercise": "Barbell Bench Press",
        "trackedOn": "2019-01-15T13:54:48.822Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 237,
        "trackedWeights": [
          225,
          225,
          225
        ],
        "estimated10RM": 209,
        "weight": 225,
        "trackedReps": [
          7,
          7,
          8
        ],
        "estimated12RM": 199,
        "estimated8RM": 220,
        "program": "Maintenance 01-04",
        "totalReps": 22,
        "muscleGroup": "Chest",
        "week": "week1",
        "estimated3RM": 251
      },
      {
        "estimated1RM": 175,
        "totalVolume": 4160,
        "exercise": "Machine Leg Extension",
        "trackedOn": "2019-01-16T00:47:18.047Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 152,
        "trackedWeights": [
          130,
          130,
          130
        ],
        "estimated10RM": 134,
        "weight": 130,
        "trackedReps": [
          11,
          11,
          10
        ],
        "estimated12RM": 127,
        "estimated8RM": 140,
        "program": "Maintenance 01-04",
        "totalReps": 32,
        "muscleGroup": "Quads",
        "week": "week10",
        "estimated3RM": 160
      },
      {
        "estimated1RM": 143,
        "totalVolume": 4600,
        "exercise": "Seated Leg Curl",
        "trackedOn": "2019-01-15T13:54:48.822Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 124,
        "trackedWeights": [
          115,
          115,
          115,
          115,
          115
        ],
        "estimated10RM": 109,
        "weight": 100,
        "trackedReps": [
          8,
          8,
          8,
          8,
          8
        ],
        "estimated12RM": 104,
        "estimated8RM": 115,
        "program": "Maintenance 01-04",
        "totalReps": 40,
        "muscleGroup": "Hamstrings",
        "week": "week1",
        "estimated3RM": 131
      },
      {
        "estimated1RM": 179,
        "totalVolume": 5980,
        "exercise": "Cable Overhead Tricep Extension",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 155,
        "trackedWeights": [
          130,
          130,
          130,
          130
        ],
        "estimated10RM": 137,
        "weight": 130,
        "trackedReps": [
          12,
          12,
          12,
          10
        ],
        "estimated12RM": 130,
        "estimated8RM": 144,
        "program": "Maintenance 01-04",
        "totalReps": 46,
        "muscleGroup": "Triceps",
        "week": "week1",
        "estimated3RM": 164
      },
      {
        "estimated1RM": 170,
        "totalVolume": 3900,
        "exercise": "Machine Leg Extension",
        "trackedOn": "2019-01-15T13:54:48.822Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 147,
        "trackedWeights": [
          130,
          130,
          130
        ],
        "estimated10RM": 130,
        "weight": 130,
        "trackedReps": [
          10,
          10,
          10
        ],
        "estimated12RM": 124,
        "estimated8RM": 136,
        "program": "Maintenance 01-04",
        "totalReps": 30,
        "muscleGroup": "Quads",
        "week": "week1",
        "estimated3RM": 156
      },
      {
        "estimated1RM": 150,
        "totalVolume": 4800,
        "exercise": "Standing Calf Raise",
        "trackedOn": "2019-01-15T13:54:48.822Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 130,
        "trackedWeights": [
          120,
          120,
          120,
          120,
          120
        ],
        "estimated10RM": 115,
        "weight": 105,
        "trackedReps": [
          8,
          8,
          8,
          8,
          8
        ],
        "estimated12RM": 109,
        "estimated8RM": 120,
        "program": "Maintenance 01-04",
        "totalReps": 40,
        "muscleGroup": "Calves",
        "week": "week1",
        "estimated3RM": 137
      },
      {
        "estimated1RM": 262,
        "totalVolume": 8000,
        "exercise": "Leverage Shrug",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 227,
        "trackedWeights": [
          200,
          200,
          200,
          200
        ],
        "estimated10RM": 200,
        "weight": 220,
        "trackedReps": [
          10,
          10,
          10,
          10
        ],
        "estimated12RM": 191,
        "estimated8RM": 210,
        "program": "Maintenance 01-04",
        "totalReps": 40,
        "muscleGroup": "Traps",
        "week": "week1",
        "estimated3RM": 240
      },
      {
        "estimated1RM": 77,
        "totalVolume": 1620,
        "exercise": "Machine Bicep Curl",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 67,
        "trackedWeights": [
          60,
          60,
          60
        ],
        "estimated10RM": 59,
        "weight": 95,
        "trackedReps": [
          9,
          9,
          9
        ],
        "estimated12RM": 56,
        "estimated8RM": 62,
        "program": "Maintenance 01-04",
        "totalReps": 27,
        "muscleGroup": "Biceps",
        "week": "week1",
        "estimated3RM": 70
      },
      {
        "estimated1RM": 256,
        "totalVolume": 4920,
        "exercise": "Barbell Squat",
        "trackedOn": "2019-01-15T13:54:48.822Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 222,
        "trackedWeights": [
          205,
          205,
          205
        ],
        "estimated10RM": 196,
        "weight": 205,
        "trackedReps": [
          8,
          8,
          8
        ],
        "estimated12RM": 186,
        "estimated8RM": 205,
        "program": "Maintenance 01-04",
        "totalReps": 24,
        "muscleGroup": "Quads",
        "week": "week1",
        "estimated3RM": 234
      },
      {
        "estimated1RM": 151,
        "totalVolume": 4600,
        "exercise": "Seated Leg Curl",
        "trackedOn": "2019-01-16T00:47:18.047Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 131,
        "trackedWeights": [
          115,
          115,
          115,
          115
        ],
        "estimated10RM": 115,
        "weight": 100,
        "trackedReps": [
          10,
          10,
          10,
          10
        ],
        "estimated12RM": 110,
        "estimated8RM": 121,
        "program": "Maintenance 01-04",
        "totalReps": 40,
        "muscleGroup": "Hamstrings",
        "week": "week10",
        "estimated3RM": 138
      },
      {
        "estimated1RM": 77,
        "totalVolume": 1620,
        "exercise": "Barbell Curl",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 67,
        "trackedWeights": [
          60,
          60,
          60
        ],
        "estimated10RM": 59,
        "weight": 60,
        "trackedReps": [
          9,
          9,
          9
        ],
        "estimated12RM": 56,
        "estimated8RM": 62,
        "program": "Maintenance 01-04",
        "totalReps": 27,
        "muscleGroup": "Biceps",
        "week": "week1",
        "estimated3RM": 70
      },
      {
        "estimated1RM": 218,
        "totalVolume": 4200,
        "exercise": "Pull ups",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 189,
        "trackedWeights": [
          175,
          175,
          175
        ],
        "estimated10RM": 166,
        "weight": 175,
        "trackedReps": [
          8,
          8,
          8
        ],
        "estimated12RM": 159,
        "estimated8RM": 175,
        "program": "Maintenance 01-04",
        "totalReps": 24,
        "muscleGroup": "Back",
        "week": "week1",
        "estimated3RM": 200
      },
      {
        "estimated1RM": 79,
        "totalVolume": 1680,
        "exercise": "Barbell Curl",
        "trackedOn": "2019-01-16T00:47:18.047Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 68,
        "trackedWeights": [
          60,
          60,
          60
        ],
        "estimated10RM": 60,
        "weight": 60,
        "trackedReps": [
          10,
          10,
          8
        ],
        "estimated12RM": 58,
        "estimated8RM": 63,
        "program": "Maintenance 01-04",
        "totalReps": 28,
        "muscleGroup": "Biceps",
        "week": "week10",
        "estimated3RM": 72
      },
      {
        "estimated1RM": 281,
        "totalVolume": 5400,
        "exercise": "Barbell Bench Press",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 243,
        "trackedWeights": [
          225,
          225,
          225
        ],
        "estimated10RM": 215,
        "weight": 225,
        "trackedReps": [
          8,
          8,
          8
        ],
        "estimated12RM": 205,
        "estimated8RM": 225,
        "program": "Maintenance 01-04",
        "totalReps": 24,
        "muscleGroup": "Chest",
        "week": "week1",
        "estimated3RM": 257
      },
      {
        "estimated1RM": 262,
        "totalVolume": 8000,
        "exercise": "Leverage Shrug",
        "trackedOn": "2019-01-15T14:28:00.004Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 1,
        "type": "program",
        "estimated5RM": 227,
        "trackedWeights": [
          200,
          200,
          200,
          200
        ],
        "estimated10RM": 200,
        "weight": 220,
        "trackedReps": [
          10,
          10,
          10,
          10
        ],
        "estimated12RM": 191,
        "estimated8RM": 210,
        "program": "Maintenance 01-04",
        "totalReps": 40,
        "muscleGroup": "Traps",
        "week": "week1",
        "estimated3RM": 240
      },
      {
        "estimated1RM": 143,
        "totalVolume": 3680,
        "exercise": "Seated Leg Curl",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 124,
        "trackedWeights": [
          115,
          115,
          115,
          115
        ],
        "estimated10RM": 109,
        "weight": 100,
        "trackedReps": [
          8,
          8,
          8,
          8
        ],
        "estimated12RM": 104,
        "estimated8RM": 115,
        "program": "Maintenance 01-04",
        "totalReps": 32,
        "muscleGroup": "Hamstrings",
        "week": "week1",
        "estimated3RM": 131
      },
      {
        "estimated1RM": 175,
        "totalVolume": 4290,
        "exercise": "Machine Leg Extension",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 152,
        "trackedWeights": [
          130,
          130,
          130
        ],
        "estimated10RM": 134,
        "weight": 130,
        "trackedReps": [
          11,
          11,
          11
        ],
        "estimated12RM": 127,
        "estimated8RM": 140,
        "program": "Maintenance 01-04",
        "totalReps": 33,
        "muscleGroup": "Quads",
        "week": "week1",
        "estimated3RM": 160
      },
      {
        "estimated1RM": 131,
        "totalVolume": 4560,
        "exercise": "Machine Ab Crunch",
        "trackedOn": "2019-01-15T14:41:31.039Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 2,
        "type": "program",
        "estimated5RM": 113,
        "trackedWeights": [
          95,
          95,
          95,
          95
        ],
        "estimated10RM": 100,
        "weight": 95,
        "trackedReps": [
          12,
          12,
          12,
          12
        ],
        "estimated12RM": 95,
        "estimated8RM": 105,
        "program": "Maintenance 01-04",
        "totalReps": 48,
        "muscleGroup": "Abs",
        "week": "week1",
        "estimated3RM": 120
      },
      {
        "estimated1RM": 157,
        "totalVolume": 6000,
        "exercise": "Standing Calf Raise",
        "trackedOn": "2019-01-16T00:47:18.047Z",
        "belongsTo": "maintenance_01-04_attempt_1",
        "day": 0,
        "type": "program",
        "estimated5RM": 136,
        "trackedWeights": [
          120,
          120,
          120,
          120,
          120
        ],
        "estimated10RM": 120,
        "weight": 105,
        "trackedReps": [
          10,
          10,
          10,
          10,
          10
        ],
        "estimated12RM": 114,
        "estimated8RM": 126,
        "program": "Maintenance 01-04",
        "totalReps": 50,
        "muscleGroup": "Calves",
        "week": "week10",
        "estimated3RM": 144
      }
    ];

    const finishedState = {
      selectedData: {
        "program": {
          "week7": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week5": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week3": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week1": [
            {
              "completed": true,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": true,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": true,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week8": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week12": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week6": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week4": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week11": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week2": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week9": [
            {
              "completed": false,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ],
          "week10": [
            {
              "completed": true,
              "day": "Lower Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 1",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Lower Body 2",
              "exercises": []
            },
            {
              "completed": false,
              "day": "Upper Body 2",
              "exercises": []
            }
          ]
        },
        "created": "2019-01-01T21:55:55.558Z",
        "activeAttempt": "maintenance_01-04_attempt_1",
        "name": "Maintenance 01-04",
        "attempts": [
          "maintenance_01-04_attempt_1"
        ],
        "type": "program"
      },
      completedWeeks: [
        {
          "label": "Week 1",
          "week": "week1",
          "completed": false
        },
        {
          "label": "Week 2",
          "week": "week2",
          "completed": false
        },
        {
          "label": "Week 3",
          "week": "week3",
          "completed": false
        },
        {
          "label": "Week 4",
          "week": "week4",
          "completed": false
        },
        {
          "label": "Week 5",
          "week": "week5",
          "completed": false
        },
        {
          "label": "Week 6",
          "week": "week6",
          "completed": false
        },
        {
          "label": "Week 7",
          "week": "week7",
          "completed": false
        },
        {
          "label": "Week 8",
          "week": "week8",
          "completed": false
        },
        {
          "label": "Week 9",
          "week": "week9",
          "completed": false
        },
        {
          "label": "Week 10",
          "week": "week10",
          "completed": false
        },
        {
          "label": "Week 11",
          "week": "week11",
          "completed": false
        },
        {
          "label": "Week 12",
          "week": "week12",
          "completed": false
        }
      ]
    };


    expect(reducer({}, {
      type: MARK_PROGRAM_COMPLETED_FLAGS,
      payload: {
        selectedData,
        completedExercises,
      }
    })).toEqual(
      finishedState
    )
  });




});
