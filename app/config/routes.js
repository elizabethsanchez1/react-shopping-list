import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-elements';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import Build from '../screens/Building/Build';
import BuildDashboard from '../screens/Building/BuildDashboard';
import BuildQuestions from '../screens/Building/BuildQuestions';
import MuscleGroupList from '../screens/Building/MuscleGroupList';
// import ExerciseList from '../screens/Building/ExerciseList';
import DeleteExercises from '../screens/Building/DeleteExercises';
import CustomExercise from '../screens/Exercises/CustomExercise';
import TrackDashboard from '../screens/Track/TrackDashboard';
import ExerciseSelection from '../screens/Track/ExerciseSelection';
import Sort from '../screens/Exercises/Sort';
import Profile from '../screens/Profile/Profile';
import Summary from '../screens/Summary';
import Loading from '../screens/Authentication/Loading';
import Register from '../screens/Authentication/Register';
import Tracker from '../screens/Track/Tracker';
import Logs from '../screens/Logs/SelectedLogs';
import theme from '../styles/theme.style';
import CustomSet from '../screens/Exercises/CustomSet';
import TrackSummary from '../screens/Track/TrackSummary';
import TrackSelection from '../screens/Track/TrackSelection';
// import AnalyticsDashboard from '../screens/Analytics/AnalyticsDashboard';
import ExerciseHistory from '../screens/Track/ExerciseHistory';
import Login from '../screens/Authentication/Login';
import TrackExerciseList from '../screens/Track/TrackExerciseList';
import TrackMuscleGroupList from '../screens/Track/TrackMuscleGroupList';
//vimport LineGraph from '../screens/Analytics/LineGraph';
import Calendar from '../screens/Logs/Calendar';
// import StorybookStack  from "../../oldStorybook/navigation";
import MuscleGroups from '../screens/Exercises/MuscleGroupList';
import ExerciseList from '../screens/Exercises/ExerciseList';
import Debug from '../screens/Debug/debug';

const navigationStyling = {
  headerStyle: {
    backgroundColor: theme.SECONDARY_BACKGROUND,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  headerTitleStyle: {
    color: theme.PRIMARY_FONT_COLOR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontSize: theme.FONT_SIZE_LARGE,
  },
  headerBackTitleStyle: {
    color: theme.ACTIVE_TAB_COLOR,
    fontWeight: '700',
    fontSize: 18,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
  },
  headerTintColor: theme.ACTIVE_TAB_COLOR,
};

export const BuildStack = createStackNavigator( {
  BuildDashboard: {
    screen: BuildDashboard,
    navigationOptions: {
      title: 'Building Dashboard',
    },
  },
  BuildQuestions: {
    screen: BuildQuestions,
    navigationOptions: {
      title: 'Options',
    },
  },
  Sort: {
    screen: Sort,
    navigationOptions: {
      title: 'Sort Exercises',
    },
  },
  MuscleGroupList: {
    // screen: MuscleGroupList,
    screen: MuscleGroups,
    navigationOptions: {
      title: 'Muscle Groups',
    },
  },
  ExerciseList: {
    screen: ExerciseList,
    navigationOptions: {
      title: 'Exercises',
    },
  },
  DeleteExercises: {
    screen: DeleteExercises,
    navigationOptions: {
      title: 'Delete Exercises',
    },
  },
  CustomSet: {
    screen: CustomSet,
    navigationOptions: {
      title: 'Custom Set',
    },
  },
  CustomExercise: {
    screen: CustomExercise,
    navigationOptions: {
      title: 'Custom Exercise',
    },
  },
  Build: {
    screen: Build,
    navigationOptions: {
      title: 'Build',
    },
  },
}, {
  navigationOptions: navigationStyling,
  headerMode: 'screen',
} );

export const TrackStack = createStackNavigator( {
  TrackDashboard: {
    screen: TrackDashboard,
    navigationOptions: {
      title: 'Track Dashboard',
    },
  },
  ExerciseSelection: {
    screen: ExerciseSelection,
    navigationOptions: {
      title: 'Exercise Selection',
    },
  },
  ExerciseHistory: {
    screen: ExerciseHistory,
    navigationOptions: {
      title: 'History',
    },
  },
  Tracker: {
    screen: Tracker,
    navigationOptions: {
      title: 'Tracker',
    },
  },
  TrackSummary: {
    screen: TrackSummary,
    navigationOptions: {
      title: 'Summary',
    },
  },
  TrackSelection: {
    screen: TrackSelection,
    navigationOptions: {
      title: 'Track Selection',
    },
  },
  TrackExerciseList: {
    screen: TrackExerciseList,
    navigationOptions: {
      title: 'Exercises',
    },
  },
  TrackMuscleGroupList: {
    screen: TrackMuscleGroupList,
    navigationOptions: {
      title: 'Muscle Groups',
    },
  },
}, {
  navigationOptions: navigationStyling,
  headerMode: 'screen',
} );

// export const AnalyticsStack = createStackNavigator({
//   LineGraph: {
//     screen: LineGraph,
//     navigationOptions: {
//       title: 'Graph'
//     },
//   },
//
//
//   AnalyticsDashboard: {
//     screen: AnalyticsDashboard,
//     navigationOptions: {
//       title: 'Analytics Dashboard'
//     },
//   },
//
//
//   Summary: {
//     screen: Summary,
//     navigationOptions: {
//       title: 'Workout Stats',
//     },
//   },
// }, {
//     navigationOptions: navigationStyling,
//     headerMode: 'screen',
// });

export const LogsStack = createStackNavigator( {
  Calendar: {
    screen: Calendar,
    navigationOptions: {
      title: 'Calendar',
    },
  },
  Logs: {
    screen: Logs,
  },
}, {
  navigationOptions: navigationStyling,
  headerMode: 'screen',
} );

export const AuthStack = createStackNavigator( {
  AuthLoading: {
    screen: Loading,
  },
}, {
  intialRouteKey: 'AuthLoading',
  intialRouteName: 'AuthLoading',
} );


export const ProfileStack = createStackNavigator( {
  Profile: {
    screen: Profile,
    navigationOptions: {
      title: 'Profile',
    },
  },
}, {
  navigationOptions: navigationStyling,
  headerMode: 'screen',
} );


export const Authentication = createStackNavigator( {
  Register: {
    screen: Register,
  },
  Login: {
    screen: Login,
  },
}, {
  navigationOptions: {
    headerStyle: {
      backgroundColor: theme.PRIMARY_BACKGROUND,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: theme.PRIMARY_FONT_COLOR,
      fontFamily: theme.PRIMARY_FONT_FAMILY,
      fontSize: theme.FONT_SIZE_LARGE,
    },
    headerBackTitleStyle: {
      fontWeight: 700,
      fontSize: 20,
    },
  },
  headerMode: 'screen',
} );


export const Tabs = createBottomTabNavigator( {
  Account: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: 'Account',
      tabBarIcon: ( { tintColor } ) => (
        <Icon
          name="account-circle"
          color={ tintColor }
          size={ 28 }
        />
      ),
    },
  },
  Logs: {
    screen: LogsStack,
    navigationOptions: {
      tabBarLabel: 'Logs',
      tabBarIcon: ( { tintColor } ) => (
        <FaIcon
          name="calendar"
          color={ tintColor }
          size={ 24 }
        />
      ),
    },
  },
  Build: {
    screen: BuildStack,
    navigationOptions: {
      tabBarLabel: 'Build',
      tabBarIcon: ( { tintColor } ) => (
        <Icon
          name="playlist-add"
          color={ tintColor }
          size={ 28 }
        />
      ),
    },
  },
  Track: {
    screen: TrackStack,
    navigationOptions: {
      tabBarLabel: 'Track',
      tabBarIcon: ( { tintColor } ) => (
        <Icon
          // name="list"
          name="fitness-center"
          color={ tintColor }
          size={ 28 }
        />
      ),
    },
  },
  // Analytics: {
  //   screen: AnalyticsStack,
  //   navigationOptions: {
  //     tabBarLabel: 'Analytics',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon
  //         name="equalizer"
  //         color={tintColor}
  //         size={28}
  //       />
  //     ),
  //   },
  // }
}, {
  intialRouteKey: 'Profile',
  intialRouteName: 'Profile',
  // tabBarPosition: 'bottom',
  // tabBarComponent: TabBarBottom,
  tabBarOptions: {
    activeTintColor: theme.ACTIVE_TAB_COLOR,
    // inactiveTintColor: "#858585",
    style: {
      backgroundColor: theme.SECONDARY_BACKGROUND,
      borderTopWidth: 2,
    },
  },
} );


export const Navigator = () => {
  return createSwitchNavigator(
    {
      AuthLoading: Loading,
      App: Tabs,
      Auth: Authentication,
      // This is housed outside of app inside of oldStorybook folder
      // Dev: StorybookStack,
    },
    {
      intialRouteName: 'AuthLoading',
    },
  );
};


export const debugStack = createStackNavigator( {
  Debug: {
    screen: Debug,
    navigationOptions: {
      title: 'Debug',
    },
  },
}, {
  navigationOptions: navigationStyling,
  headerMode: 'screen',
} );
