import { create } from 'react-native-platform-stylesheet';
import theme from '../../styles/theme.style';

export default create({
  header: {
    fontSize: theme.FONT_SIZE_HEADERBAR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },

  // Text specific styles

  standardText: {
    fontFamily: theme.PRIMARY_FONT_FAMILY,
    fontWeight: theme.FONT_WEIGHT_MEDIUM,
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.PRIMARY_FONT_COLOR,
  },
});
