import React, { Component } from 'react';
import { YellowBox, StatusBar, View, Text } from 'react-native';
import { Navigator } from './app/config/routes';

// // Redux
import { Provider } from 'react-redux';
import configureStore from './app/store/configureStore';


const store = configureStore();

export default class App extends Component {
  render() {
    // YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
    const Layout = Navigator();
    // use this for debugging css
    // const Layout = Tabs;

    // if(module.hot) {
    //   // Support hot reloading of components.
    //   // Whenever the App component file or one of its dependencies
    //   // is changed, re-import the updated component and re-render it
    //   module.hot.accept("./app/layout/App", () => {
    //     setTimeout(render);
    //   });
    // }


    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar
            backgroundColor="#5E8D48"
            barStyle='light-content'
          />
          <Layout />
        </View>
      </Provider>
    )
  }
}
