import { create } from 'react-native-platform-stylesheet';
import theme from '../../styles/theme.style';

export default create({

  // Shared Styling
  titleStyle: {
    fontSize: theme.FONT_SIZE_HEADERBAR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
    marginBottom: 0
  },

  basicCard: {
    borderRadius: 4,
    backgroundColor: theme.SECONDARY_BACKGROUND,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },



  // LogsSelectedLogsCard component styling
  container: {
    marginBottom: 5,
  },

  inputView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inchesLabel: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontSize: 30,
    minWidth: 20,
    height: 20,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },

  inputStyles: {
    marginRight: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.BORDER_COLOR,
    color: theme.PRIMARY_FONT_COLOR,
    fontFamily: theme.SECONDARY_FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    minWidth: 75,
  },

  text: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
    minWidth: 20
  },

  // SavedWorkoutCard Component styling

  workoutCardHeader: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
    marginBottom: 30,
  }


});
