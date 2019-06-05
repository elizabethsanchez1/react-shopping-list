import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import theme from '../../styles/theme.style';

const styles = StyleSheet.create( {
  navigationButton: { backgroundColor: 'transparent' },
  text: {
    fontSize: 18,
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
    const { isDisabled, title } = this.props;

    return (
      <Button
        buttonStyle={ styles.navigationButton }
        color={ isDisabled ? theme.DISABLED_TEXT_COLOR : theme.ACTIVE_TAB_COLOR }
        textStyle={ styles.text }
        title={ title }
        onPress={ () => this.handleClick() }
      />
    );
  }
}

NavButton.propTypes = {
  title: PropTypes.string,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

export default NavButton;
