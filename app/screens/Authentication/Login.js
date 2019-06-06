import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '../../components/Card';
import Container from '../../components/Container';
import { Input } from '../../components/Form';
import { PrimaryButton, NavButton } from '../../components/Button';
import { loginRequestAction } from '../../actions/authentication';
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
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    padding: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: -138,
    left: 0,
    right: 0,
  },
  passwordContainer: { position: 'relative' },
} );

class Login extends Component {
  static navigationOptions = ( { navigation } ) => {
    return {
      headerLeft: (
        <NavButton
          title="Register"
          onPress={ () => navigation.navigate( 'Register' ) }
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
      passwordIcon: 'eye-off',
      disableSubmitButton: false,
      invalidEmail: false,
      hidePassword: true,
      passwordHint: 'eye-off',
    };

    this.passwordInput = React.createRef();
    this.emailInput = React.createRef();
  }

  validateEmail = text => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState( {
      invalidEmail: !regex.test( text.toLowerCase() ),
      disableSubmitButton: !regex.test( text.toLowerCase() ),
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

  handleLogin = () => {
    const { email, password } = this.state;
    this.props.login( email, password );
  };

  render() {
    const { passwordIcon, disableSubmitButton, invalidEmail, hidePassword } = this.state;

    return (
      <Container>
        <Card title="Login" containerStyling={ styles.cardContainer }>
          <Input
            containerStyling={ styles.inputContainer }
            ref={ this.emailInput }
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={ email => this.setState( { email } ) }
            onEndEditing={ email => this.validateEmail( email.nativeEvent.text ) }
            errorMessage={ ( invalidEmail ) ? 'Invalid Email Address' : '' }
            value={ this.state.email }
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
              onFocus={ () => this.handlePasswordHint() }
              value={ this.state.password }
            />
            <Icon
              name={ passwordIcon }
              size={ 30 }
              color="white"
              style={ styles.icon }
              onPress={ () => this.togglePasswordMasking() }
            />
          </View>
          <PrimaryButton
            title="LOGIN"
            disabled={ disableSubmitButton }
            onPress={ this.handleLogin }
            loading={ this.props.isLoading }
            containerViewStyle={ styles.buttonContainer }
          />
        </Card>
      </Container>
    );
  }
}

Login.propTypes = {
  isLoading: PropTypes.bool,
  login: PropTypes.func,
};

const mapStateToProps = state => ( {
  isLoading: getLoadingByDomain( state, AUTHENTICATION ),
} );

const mapDispatchToProps = dispatch => ( {
  login: ( email, password ) => dispatch( loginRequestAction( {
    email,
    password,
  } ) ),
} );

export default connect( mapStateToProps, mapDispatchToProps )( Login );
