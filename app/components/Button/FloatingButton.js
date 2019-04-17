import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-native-elements';
import styles from '../Form/styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/theme.style';

const FloatingButton = (props) => {
  return (
    <Button
     //  raised
      // icon={{ name: 'add', type: 'material-icons', buttonStyle: styles.actionButton }}
      title='+'
      backgroundColor={theme.PRIMARY_COLOR}
      borderRadius={50}
      buttonStyle={styles.actionButton}
      fontSize={40}
      onPress={() => props.onClick()}
    />
  )
};

FloatingButton.propTypes = {
  onClick: PropTypes.func,
};

export default FloatingButton;
