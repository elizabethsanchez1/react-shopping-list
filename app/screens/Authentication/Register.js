import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../../components/Card';
import { Input } from '../../components/Form';
import { PrimaryButton } from '../../components/Button';
import theme from '../../styles/theme.style';
import Container from '../../components/Container';
import { connect } from 'react-redux';
import { createUser, createUserAction } from '../../actions/authentication';
import { getRegisterLoading } from '../../selectors/authentication';


class Register extends Component {
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

  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <Button
          title="Login"
          color={ theme.PRIMARY_FONT_COLOR }
          fontFamily={ theme.PRIMARY_FONT_FAMILY }
          fontSize={ theme.FONT_SIZE_HEADERBAR }
          textStyle={ { fontWeight: theme.FONT_WEIGHT_MEDIUM } }
          buttonStyle={ { backgroundColor: 'transparent', padding: 9 } }
          containerViewStyle={ { paddingLeft: 0, marginLeft: 0 } }
          onPress={ () => navigation.navigate( 'Login' ) }
        />
      ),
    };
  };

  /**
   * Validate email inputted by user
   * @param {String} text
   */
  validateEmail = text => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState( {
      invalidEmail: !regex.test( text.toLowerCase() ),
      disableSubmitButton: !regex.test( text.toLowerCase() ),
    } );
  };

  /**
   * Validate password for at least 8 characters long and
   * one number
   * @param {String} text
   */
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

  /**
   * Show or hide the password hint depending on if the password
   * text field has focus or not
   */
  handlePasswordHint = () => {
    const style = ( this.state.passwordHint === 'none' ) ? 'flex' : 'none';

    this.setState( {
      passwordHint: style,
    } );
  };

  /**
   * When user clicks on the eye icon on top of the password input text
   * field toggle the masking of the password text
   */
  togglePasswordMasking = () => {
    const passwordIcon = ( this.state.hidePassword ) ? 'eye' : 'eye-off';
    const hidePassword = !this.state.hidePassword;

    this.setState( {
      passwordIcon,
      hidePassword,
    } );
  };


  /**
   * Make call to firebase to register the user. If failed
   * provide user feedback using dropdown alert component
   */
  handleSignUp = () => {
    const { email, password } = this.state;

    if ( email === '' || password === '' ) {
      this.setState( {
        disableSubmitButton: true,
      }, () => {
        this.dropdownRef.current.alertWithType( 'error', 'Error', 'Please fill out fields' );
      } );
    } else {

      this.props.createUser( email, password );
    }
  };

  render() {
    const { invalidEmail, invalidPassword, passwordHint, passwordErrorMessage, disableSubmitButton, hidePassword, passwordIcon } = this.state;

    return (
      <Container>
        <Card
          title="Register"
          containerStyling={ { marginTop: 80, position: 'relative', height: 310 } }
        >
          <Input
            containerStyling={ { marginTop: 30 } }
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={ email => this.setState( { email } ) }
            onEndEditing={ email => this.validateEmail( email.nativeEvent.text ) }
            value={ this.state.email }
            errorMessage={ ( invalidEmail ) ? 'Invalid Email Address' : '' }
            onSubmitEditing={ () => this.passwordInput.current.focus() }
          />
          <View style={ { position: 'relative' } }>
            <Input
              containerStyling={ { marginTop: 30 } }
              ref={ this.passwordInput }
              placeholder="Password"
              keyboardType="email-address"
              secureTextEntry={ hidePassword }
              onChangeText={ password => this.setState( { password } ) }
              onEndEditing={ password => this.validatePassword( password.nativeEvent.text ) }
              onFocus={ () => this.handlePasswordHint() }
              value={ this.state.password }
              errorMessage={ ( invalidPassword ) ? passwordErrorMessage : '' }
            />
            <Icon
              name={ passwordIcon }
              size={ 30 }
              color="white"
              style={ { position: 'absolute', right: 0, bottom: 35, padding: 10 } }
              onPress={ () => this.togglePasswordMasking() }
            />
          </View>
          <View style={ { display: passwordHint } }>
            <Text style={ { color: theme.HELPER_FONT_COLOR } }>Password must be at least 8 characters</Text>
            <Text style={ { color: theme.HELPER_FONT_COLOR } }>Password must be contain at least 1 number</Text>
          </View>
          <PrimaryButton
            title="CREATE ACCOUNT"
            disabled={ disableSubmitButton }
            onPress={ this.handleSignUp }
            loading={ this.props.isLoading }
            containerViewStyle={ { position: 'absolute', bottom: -138, left: 0, right: 0 } }
          />
        </Card>
      </Container>
    );
  }
}

Register.propTypes = {
  isLoading: PropTypes.bool,
  navigation: PropTypes.object,
  createUser: PropTypes.func,
};

const mapStateToProps = state => ( {
  isLoading: getRegisterLoading( state ),
} );


const mapDispatchToProps = dispatch => ( {
  // createUser: ( email, password ) => dispatch( createUser( email, password ) ),
  createUser: ( email, password ) => dispatch( createUserAction( { email, password } ) ),
} )


export default connect( mapStateToProps, mapDispatchToProps )( Register );
