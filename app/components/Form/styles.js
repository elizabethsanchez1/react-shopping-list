import { create } from 'react-native-platform-stylesheet';
import colors from '../../config/colors';
import theme from '../../styles/theme.style';

export default create({


  // global styles
  fontFamily: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
  },

  fontWeight: {
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
  },







  // button specific styles

  primaryButton: {
    marginTop: 20,
    backgroundColor: theme.PRIMARY_COLOR,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },



  secondaryButton: {
    // marginVertical: 20,
    // marginHorizontal: 30,
    padding: 12,
    borderWidth: 1,
    borderColor: theme.BORDER_COLOR,
    borderRadius: 5,
  },
  secondaryButtonText: {
    alignSelf: 'center',
    color: theme.PRIMARY_FONT_COLOR,
  },




  disabledStyle: {
    backgroundColor: theme.PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },

  disabledText: {
    color: theme.DISABLED_TEXT_COLOR,
  },

  // Floating button specific styles

  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    padding: 5,
    paddingBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 1,
  },



  // Input specific styles

  input: {
    width: 'auto',
    height: 40,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    borderBottomColor: theme.BORDER_COLOR,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },


  viewContainer: {
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },

  inputContainer: {
    marginLeft: 0,
    marginRight: 0,
    borderBottomWidth: 0,
    marginBottom: 0,
  },


  errorMessage: {
    marginLeft: 0,
    marginRight: 0,
    marginTop: 10,
    color: theme.ERROR_RED,
  },


  errorMessageContainer: {
    marginLeft: 0,
    marginRight: 0,
  },




  basicInput: {
    borderBottomColor: theme.BORDER_COLOR,
    borderBottomWidth: theme.BORDER_BOTTOM_WIDTH,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    height: 40,
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    marginBottom: 15,
    color: theme.PRIMARY_FONT_COLOR,
  }
});
