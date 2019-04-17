import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import  { Card } from '../../components/Card';
import { View, Alert } from 'react-native';
import Container from '../../components/Container';
import { Input } from '../../components/Form';
import { PrimaryButton } from '../../components/Button';
import {Button} from 'react-native-elements';
import theme from '../../styles/theme.style';
import { connect } from 'react-redux';
import { getLoginLoading } from "../../selectors/authentication";
import { login } from "../../actions/authentication";


class Login extends Component {
  constructor(props) {
    super(props);
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

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          title='Register'
          color={theme.PRIMARY_FONT_COLOR}
          fontFamily={theme.PRIMARY_FONT_FAMILY}
          fontSize={theme.FONT_SIZE_HEADERBAR}
          textStyle={{ fontWeight: theme.FONT_WEIGHT_MEDIUM }}
          buttonStyle={{ backgroundColor: 'transparent', padding: 9 }}
          containerViewStyle={{paddingLeft: 0, marginLeft: 0}}
          onPress={ () => navigation.navigate('Register')}
        />
      )
    }
  };

  formatErrorMessage = (message) => {
    const filtered = message.substring(message.indexOf("/") + 1).replace(/-/g, " ");
    return filtered.charAt(0).toUpperCase() + filtered.slice(1);
  };


  /**
   * Validate email inputted by user
   * @param {String} text
   */
  validateEmail = (text) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    this.setState({
      invalidEmail: !regex.test(text.toLowerCase()),
      disableSubmitButton: !regex.test(text.toLowerCase()),
    });
  };

  /**
   * Show or hide the password hint depending on if the password
   * text field has focus or not
   */
  handlePasswordHint = () => {
    const style = (this.state.passwordHint === 'none') ? 'flex' : 'none';

    this.setState({
      passwordHint: style
    });
  };

  /**
   * When user clicks on the eye icon on top of the password input text
   * field toggle the masking of the password text
   */
  togglePasswordMasking = () => {
    const passwordIcon = (this.state.hidePassword) ? 'eye' : 'eye-off';
    const hidePassword = !this.state.hidePassword;

    this.setState({
      passwordIcon,
      hidePassword,
    });
  };


  handleLogin = () => {
    const { email, password } = this.state;
    this.props.login(email,password);
  };


  render() {
    const { passwordIcon, disableSubmitButton, invalidEmail, hidePassword } = this.state;

    return (
      <Container>
        <Card
          title='Login'
          containerStyling={{ marginTop: 80, position: 'relative', height: 310}}
        >
          <Input
            containerStyling={{ marginTop: 30 }}
            ref={this.emailInput}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(email) => this.setState({ email })}
            onEndEditing={email => this.validateEmail(email.nativeEvent.text)}
            errorMessage={ (invalidEmail) ? 'Invalid Email Address' : ''}
            value={this.state.email}
            onSubmitEditing={() => this.passwordInput.current.focus()}
          />
          <View style={{ position: 'relative' }}>
            <Input
              containerStyling={{ marginTop: 30 }}
              ref={this.passwordInput}
              placeholder="Password"
              keyboardType="email-address"
              secureTextEntry={hidePassword}
              onChangeText={password => this.setState({ password })}
              onFocus={() => this.handlePasswordHint()}
              value={this.state.password}
            />
            <Icon
              name={passwordIcon}
              size={30}
              color='white'
              style={{ position: 'absolute', right : 0, bottom: 12, padding: 10 }}
              onPress={() => this.togglePasswordMasking()}
            />
          </View>
          <PrimaryButton
            title="LOGIN"
            disabled={disableSubmitButton}
            onPress={this.handleLogin}
            loading={this.props.isLoading}
            containerViewStyle={{ position: 'absolute', bottom: -138, left: 0, right: 0 }}
          />
        </Card>
      </Container>
    )
  }
}

Login.propTypes = {
  loginFailed:   PropTypes.string,
  isLoading:     PropTypes.bool,
  navigation:    PropTypes.object,
  login: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isLoading: getLoginLoading(state),
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: (email, password) => dispatch(login(email, password)),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);
