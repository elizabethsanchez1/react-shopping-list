import React from 'react';
import { Button } from 'react-native-elements'
import PropTypes from 'prop-types';
import theme from '../../styles/theme.style';

const Link = ({title, onPress}) => {
  return (
    <Button
      title={title}
      containerViewStyle={{
        backgroundColor: 'transparent',
        padding: 0,
        marginLeft: 0,
        marginRight: 0,
      }}
      buttonStyle={{
        backgroundColor: 'transparent',
        padding: 0,
        margin:0
      }}
      fontSize={theme.FONT_SIZE_MEDIUM}
      color={theme.ACTIVE_TAB_COLOR}
      onPress={onPress}
    />
  );
};

Link.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
};

export default Link;