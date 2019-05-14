import React, { Component } from 'react';
import { YellowBox, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { debugStack, Navigator } from './app/config/routes';
import config from './app/config/dev.config';
import configureStore from './app/store/configureStore';
import navigationService from './app/utilities/navigationService';


const store = configureStore();

export default class App extends Component {
  render() {
    // YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);


    if ( config.devCss ) {
      // use this for debugging css
      const Layout = debugStack;

      return (
        <Layout
          ref={ navigatorRef => navigationService.setTopLevelNavigator( navigatorRef ) }
        />
      );
    }
    else {
      const Layout = Navigator();

      return (
        <Provider store={ store }>
          <View style={ { flex: 1 } }>
            <StatusBar
              backgroundColor="#5E8D48"
              barStyle='light-content'
            />
            <Layout
              ref={ navigatorRef => navigationService.setTopLevelNavigator( navigatorRef ) }
            />
          </View>
        </Provider>
      );
    }


  }
}
