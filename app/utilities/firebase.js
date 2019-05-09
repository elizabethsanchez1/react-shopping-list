import firebase from 'react-native-firebase';
import moment from 'moment'
import mathFunctions from './mathFunctions';


const firbaseService = {
  loginUser: (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  },

  logOutUser: () => {
    return firebase.auth().signOut();
  },

  createNewUser: (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  },

  createUserDocument: (userUid, email) => {
    return firebase.firestore().collection('users').doc(userUid).set({
      email,
    });
  },

  getCurrentUser: () => {
    return firebase.auth().currentUser;
  },

  reAuthenticateUser: (email, password) => {
    return firebase.auth.EmailAuthProvider.credential(email, password);
  },

  getUserProfile: (userUid) => {
    return firebase.firestore().collection('users').doc(userUid).get()
  },

  updateProfile: (userUid, data) => {
    return firebase.firestore().collection('users').doc(userUid).set(
      data,
      { merge: true }
    );
  },

  updateBodyMeasurements: (userUid, date, data) => {
    console.log('date: ', date);
    console.log('data: ', data);
    return firebase.firestore().collection('users').doc(userUid).collection('bodyMeasurements').doc("08-30-2018").set(data);
  },

  /**
   * Retrieve the exercise list from firebase cloud firestore database
   * @return {Promise}
   */
  getExerciseList: () => {
    return firebase.firestore().collection('exerciseList').orderBy('name', 'asc').get()
  },

  listenForNewWorkouts: userId => {
    return firebase.firestore()
            .collection('savedWorkouts')
            .where('userId', '==', userId)
            // .orderBy('created', 'desc');
  },

  listenForNewTrackedExercises: userId => {
    return firebase.firestore()
            .collection('completedExercises')
            .where('userId', '==', userId);
  },

  listenForNewBodyLogs: userId => {
    return firebase.firestore()
            .collection( 'bodyLogs' )
            .where('userId', '==', userId);
  },

  /**
   * Remove all properties from the exercise object that does not need to be saved
   * @param {Object} data - workouts object
   * @return {Object} - filtered workout object
   */
  filterExerciseData: data => {
    const requiredKeys = ['locationId', 'exercise', 'reps', 'sets', 'initialWeight', 'currentWeight', 'muscleGroup'];

    Object.keys(data).forEach((week) => {
      data[week].forEach((day) => {
        day.exercises.forEach(( exercise) => {
          Object.keys(exercise).forEach((key) => {
            if (!requiredKeys.includes(key)) {
              delete exercise[key]
            }
          });
        });
      });
    });

    console.log('filtered data: ', data);
    return data;
  },

  saveWorkoutLogEdits: changedExercises => {
    const exercisesCollection = firebase.firestore().collection('completedExercises');
    const batch = firebase.firestore().batch();

    changedExercises.forEach(exercise => {
      batch.set( exercisesCollection.doc(exercise.uid), exercise );
    });

    return batch.commit();
  },

  saveBodyLogEdits: update => {
    const bodyLogCollection = firebase.firestore().collection( 'bodyLogs' );
    const { userId, logs, overwriteUid, selectedDate } = update;

    console.log('selected date passed in --------', selectedDate);
    // console.log('new date used:  ', new Date( selectedDate ));

    // console.log('moment format', moment())

    if ( overwriteUid ) {
      return bodyLogCollection.doc( overwriteUid ).set( {
        trackedOn: selectedDate,
        userId,
        ...logs,
      }, { merge: true } );
    }

    return bodyLogCollection.add( {
      trackedOn: selectedDate,
      userId,
      ...logs,
    } );
  },

  /**
   * Save program to the firebase database and return thenable promise
   * @param {Object} stateObject - entire state object
   * @param {String} userId - Firebase userId
   * @return {Promise}
   */
  saveWorkoutData: (userId, name, workoutData, type) => {
    const workoutCollection = firebase.firestore().collection('savedWorkouts');

    if (type === 'program') {
      return workoutCollection.add({
        activeAttempt: '',
        attempts: [],
        type,
        name,
        created: new Date(),
        program: workoutData,
        userId,
      })
    } else {
      return workoutCollection.add({
        type,
        name,
        userId,
        created: new Date(),
        workout: workoutData,
      })
    }
  },

  updateSavedWorkoutData: ( userId, workoutData, type, id ) => {
    const workoutCollection = firebase.firestore().collection( 'savedWorkouts' );

    if ( type === 'program' ) {
      return workoutCollection.doc( id ).set( {
        program: workoutData,
      }, { merge: true } );
    }
    else {
      return workoutCollection.doc( id ).set( {
        workout: workoutData,
      }, { merge: true } );
    }
  },


  saveTrackedProgram: exercises => {
    const exercisesCollection = firebase.firestore().collection('completedExercises');
    const batch = firebase.firestore().batch();
    exercises.forEach(exercise => batch.set(exercisesCollection.doc(), exercise));
    return batch.commit();
  },

  updateProgamAttempts: (uid, attemptInfo) => {
    return firebase.firestore()
            .collection('savedWorkouts')
            .doc(attemptInfo.id)
            .set(
              {
                activeAttempt: attemptInfo.activeAttempt,
                attempts: attemptInfo.attempts
              },
              {
                merge: true
              }
            );
  }

};

export default firbaseService;
