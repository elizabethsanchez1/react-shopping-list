import PropTypes from 'prop-types';
import React from 'react';
import { Card as CardComponent } from 'react-native-elements';
import styles from './styles';

const Card = ( { children, containerStyling, ...props } ) => (
  <CardComponent
    titleStyle={ styles.titleStyle }
    dividerStyle={ { display: 'none' } }
    containerStyle={ [ styles.basicCard, containerStyling ] }
    { ...props }
  >
    { children }
  </CardComponent>
);

Card.propTypes = {
  children: PropTypes.any,
  title: PropTypes.string,
  containerStyling: PropTypes.object,
};

export default Card;
