import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions } from 'react-native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import theme from '../../styles/theme.style';


const styles = StyleSheet.create( {
  label: {
    color: '#fff',
    fontSize: theme.FONT_SIZE_LARGE,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: theme.SECONDARY_BACKGROUND,
    // changes to black background
    // backgroundColor: theme.PRIMARY_BACKGROUND,
  },
  tabHeader: {
    // marginTop: 30,
  },
} );


/*
* TODO
* Needs base height set inside of here just in case its not being set inside the component
* */


class Tabs extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      // Both of these are being used by
      // navigationState prop in TabView
      index: 0,
      routes: props.routes,
    };

    console.log( 'props passed in: ', props );
  }

  renderTabBar = props => (
    <TabBar
      { ...props }
      indicatorStyle={ {
        backgroundColor: theme.ACTIVE_TAB_COLOR,
      } }
      //renderIcon={this._renderIcon}
      labelStyle={ styles.label }
      // tabStyle={{ height: 200 }}
      // style={
      //   (props.background === 'dark')
      //     ? { ...styles.shadow, backgroundColor: theme.SECONDARY_BACKGROUND }
      //     : { ...styles.shadow, backgroundColor: theme.PRIMARY_BACKGROUND }
      // }
      style={ { ...styles.shadow, ...this.props.tabBarStyling } }
    />
  );

  // Optimized using Pure.Component but does not auto refresh when I need to to
  // renderScene = SceneMap( this.props.subViews );

  renderScene = ( { route } ) => {
    // console.log('ROUTE PASSED IN', route);
    switch ( route.key ) {
      case 'first':
        return this.props.subViews.first();

      case 'second':
        return this.props.subViews.second();

      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        style={ { ...styles.tabHeader, ...this.props.tabHeaderStyling } }
        navigationState={ this.state }
        renderScene={ this.renderScene }
        onIndexChange={ index => this.setState( { index } ) }
        initialLayout={ {
          width: Dimensions.get( 'window' ).width,
          height: Dimensions.get( 'window' ).height,
        } }
        renderTabBar={ this.renderTabBar }
        { ...this.props }
      />
    );
  }
}


Tabs.propTypes = {
  tabBarStyling: PropTypes.object,
  tabHeaderStyling: PropTypes.object,
  routes: PropTypes.array,
  subViews: PropTypes.object,
};

export default Tabs;
