import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../../components/Card';
import { Input } from '../../components/Form';
import { PrimaryButton, NavButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import Container from '../../components/Container';
import { createUserAction } from '../../actions/authentication';
import { getLoadingByDomain } from '../../selectors/loading';
import { AUTHENTICATION } from '../../constants/reducerObjects';

const styles = StyleSheet.create( {
  cardContainer: {
    marginTop: 80,
    position: 'relative',
    height: 310,
  },
  inputContainer: {
    marginTop: 30,
  },
  passwordContainer: { position: 'relative' },
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 35,
    padding: 10,
  },
  helperFont: { color: theme.HELPER_FONT_COLOR },
  buttonContainer: {
    position: 'absolute',
    bottom: -138,
    left: 0,
    right: 0,
  },
} );

class Register extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <NavButton
          title="Login"
          onPress={ () => navigation.navigate( 'Login' ) }
          styling="standard"
        />
      ),
    };
  };

  constructor( props ) {
    super( props );
    this.state = {
      email: '',
      password: '',
      invalidEmail: false,
      invalidPassword: false,
      disableSubmitButton: false,
      passwordErrorMessage: '',
      passwordHint: 'none',
      hidePassword: true,
      passwordIcon: 'eye-off',
    };

    this.dropdownRef = React.createRef();
    this.passwordInput = React.createRef();
  }

  validateEmail = text => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState( {
      invalidEmail: !regex.test( text.toLowerCase() ),
      disableSubmitButton: !regex.test( text.toLowerCase() ),
    } );
  };

  validatePassword = text => {
    this.handlePasswordHint();
    let errorMessage = '';
    let invalidPassword = false;
    let disableSubmitButton = false;

    if ( text.length < 8 ) {
      errorMessage = 'Password is not long enough.';
      invalidPassword = true;
      disableSubmitButton = true;
    }

    if ( !/\d/.test( text ) ) {
      errorMessage = 'Password does not contain a number.';
      invalidPassword = true;
      disableSubmitButton = true;
    }

    this.setState( {
      passwordErrorMessage: errorMessage,
      invalidPassword,
      disableSubmitButton,
    } );
  };

  handlePasswordHint = () => {
    const style = ( this.state.passwordHint === 'none' ) ? 'flex' : 'none';
    this.setState( { passwordHint: style } );
  };

  togglePasswordMasking = () => {
    const passwordIcon = ( this.state.hidePassword ) ? 'eye' : 'eye-off';
    const hidePassword = !this.state.hidePassword;

    this.setState( {
      passwordIcon,
      hidePassword,
    } );
  };

  handleSignUp = () => {
    const { email, password } = this.state;

    if ( email === '' || password === '' ) {
      this.setState( {
        disableSubmitButton: true,
      }, () => {
        this.dropdownRef.current.alertWithType( 'error', 'Error', 'Please fill out fields' );
      } );
    }
    else {
      this.props.createUser( email, password );
    }
  };

  render() {
    const { invalidEmail, invalidPassword, passwordHint, passwordErrorMessage, disableSubmitButton, hidePassword, passwordIcon } = this.state;

    return (
      <Container>
        <Card title="Register" containerStyling={ styles.cardContainer }>
          <Input
            containerStyling={ styles.inputContainer }
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={ email => this.setState( { email } ) }
            onEndEditing={ email => this.validateEmail( email.nativeEvent.text ) }
            value={ this.state.email }
            errorMessage={ ( invalidEmail ) ? 'Invalid Email Address' : '' }
            onSubmitEditing={ () => this.passwordInput.current.focus() }
          />
          <View style={ styles.passwordContainer }>
            <Input
              containerStyling={ styles.inputContainer }
              ref={ this.passwordInput }
              placeholder="Password"
              keyboardType="email-address"
              secureTextEntry={ hidePassword }
              onChangeText={ password => this.setState( { password } ) }
              onEndEditing={ password => this.validatePassword(
                password.nativeEvent.text,
              ) }
              onFocus={ () => this.handlePasswordHint() }
              value={ this.state.password }
              errorMessage={ ( invalidPassword ) ? passwordErrorMessage : '' }
            />
            <Icon
              name={ passwordIcon }
              size={ 30 }
              color="white"
              style={ styles.icon }
              onPress={ () => this.togglePasswordMasking() }
            />
          </View>
          <View style={ { display: passwordHint } }>
            <Text style={ styles.helperFont }>
              Password must be at least 8 characters
            </Text>
            <Text style={ styles.helperFont }>
              Password must be contain at least 1 number
            </Text>
          </View>
          <PrimaryButton
            title="CREATE ACCOUNT"
            disabled={ disableSubmitButton }
            onPress={ this.handleSignUp }
            loading={ this.props.isLoading }
            containerViewStyle={ styles.buttonContainer }
          />
        </Card>
      </Container>
    );
  }
}

Register.propTypes = {
  isLoading: PropTypes.bool,
  createUser: PropTypes.func,
};

const mapStateToProps = state => ( {
  isLoading: getLoadingByDomain( state, AUTHENTICATION ),
} );

const mapDispatchToProps = dispatch => ( {
  createUser: ( email, password ) => dispatch( createUserAction( { email, password } ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Register );
