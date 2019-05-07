import React, { Component } from 'react';
import { YellowBox, StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { Navigator } from './app/config/routes';
import configureStore from './app/store/configureStore';
import navigationService from './app/utilities/navigationService';


const store = configureStore();

export default class App extends Component {
  render() {
    // YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    const Layout = Navigator();
    // use this for debugging css
    // const Layout = Tabs;

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
