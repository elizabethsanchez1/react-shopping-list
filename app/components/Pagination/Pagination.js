import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { StyledText } from '../Text';
import theme from '../../styles/theme.style';

const Pagination = ({current, total, onPress}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TouchableOpacity onPress={() => onPress('previous')}>
        <Icon
          name={'chevron-left'}
          size={40}
          color={theme.ACTIVE_TAB_COLOR}
          style={{ marginRight: 40 }}
        />
      </TouchableOpacity>

      <StyledText style={{fontSize: theme.FONT_SIZE_LARGE}}>
        {current} of {total}
      </StyledText>

      <TouchableOpacity  onPress={() => onPress('next')}>
        <Icon
          name={'chevron-right'}
          size={40}
          color={theme.ACTIVE_TAB_COLOR}
          style={{ marginLeft: 40 }}
        />
      </TouchableOpacity>

    </View>
  );
};

Pagination.propTypes = {
  current: PropTypes.number,
  total: PropTypes.number,
  onPress: PropTypes.func,
};

export default Pagination;