import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  navigationButton: { backgroundColor: 'transparent' },
  linkText: {
    fontSize: 18,
  },
  standardText: {
    fontWeight: theme.FONT_WEIGHT_BOLD,
    fontSize: 20,
  },
  standardButton: {
    backgroundColor: 'transparent',
    padding: 9,
  },
  standardButtonContainer: {
    paddingLeft: 0,
    marginLeft: 0,
  },
} );

class NavButton extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      isRunning: false,
    };
  }

  handleClick = () => {
    if ( !this.props.isDisabled ) {

      if ( !this.state.isRunning ) {
        this.props.onPress();
      }

      this.setState( { isRunning: true } );
      setTimeout( () => {
        this.setState( { isRunning: false } );
      }, 10000 );
    }
  };

  render() {
    const { isDisabled, title, onPress, styling } = this.props;

    // blue like links that usually mean saving some edits
    if ( styling === 'link' ) {
      return (
        <Button
          buttonStyle={ styles.navigationButton }
          color={ isDisabled ? theme.DISABLED_TEXT_COLOR : theme.ACTIVE_TAB_COLOR }
          textStyle={ styles.linkText }
          title={ title }
          onPress={ () => this.handleClick() }
        />
      );
    }

    // white header like buttons
    if ( styling === 'standard' ) {
      return (
        <Button
          containerViewStyle={ styles.standardButtonContainer }
          buttonStyle={ styles.standardButton }
          color={ theme.PRIMARY_FONT_COLOR }
          fontFamily={ theme.PRIMARY_FONT_FAMILY }
          textStyle={ styles.standardText }
          title={ title }
          onPress={ () => onPress() }
        />
      );
    }


    return (
      <Button
        buttonStyle={ styles.navigationButton }
        color={ isDisabled ? theme.DISABLED_TEXT_COLOR : theme.ACTIVE_TAB_COLOR }
        textStyle={ styles.standardText }
        title={ title }
        onPress={ () => onPress() }
      />
    );
  }
}

NavButton.propTypes = {
  title: PropTypes.string,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
  styling: PropTypes.string,
};

export default NavButton;
