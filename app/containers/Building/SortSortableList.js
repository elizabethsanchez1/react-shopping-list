import React, { Component } from 'react';
import { Animated, Easing, StyleSheet, Text, View, Dimensions, Platform } from 'react-native';
import SortableList from 'react-native-sortable-list';
import theme from '../../styles/theme.style';

const window = Dimensions.get( 'window' );

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  contentContainer: {
    width: window.width,

    ...Platform.select( {
      ios: {
        paddingHorizontal: 30,
      },

      android: {
        paddingHorizontal: 0,
      },
    } ),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.SECONDARY_BACKGROUND,
    padding: 15,
    flex: 1,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 4,

    ...Platform.select( {
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: 2,
      },

      android: {
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowOffset: { height: 3, width: 0 },
        shadowRadius: 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    } ),
  },
  text: {
    fontSize: 18,
    color: theme.PRIMARY_FONT_COLOR,
    fontFamily: theme.PRIMARY_FONT_FAMILY,
  },
} );

export default class List extends Component {
  _renderRow = ( { data, active } ) => {
    return <Row data={ data } active={ active } />;
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.text }>Drag and Drop</Text>
        <SortableList
          contentContainerStyle={ styles.contentContainer }
          data={ this.props.data }
          renderRow={ this._renderRow }
          onChangeOrder={ nextOrder => this.props.onChangeOrder( nextOrder ) }
          onReleaseRow={ key => this.props.onReleaseRow( key ) }
          onActivateRow={ key => this.props.onActivateRow( key ) }
        />
      </View>
    );
  }
}

class Row extends Component {
  constructor( props ) {
    super( props );

    this._active = new Animated.Value( 0 );

    this._style = {
      ...Platform.select( {
        ios: {
          transform: [ {
            scale: this._active.interpolate( {
              inputRange: [ 0, 1 ],
              outputRange: [ 1, 1.1 ],
            } ),
          } ],
          shadowRadius: this._active.interpolate( {
            inputRange: [ 0, 1 ],
            outputRange: [ 2, 10 ],
          } ),
        },

        android: {
          transform: [ {
            scale: this._active.interpolate( {
              inputRange: [ 0, 1 ],
              outputRange: [ 1, 1.07 ],
            } ),
          } ],
          elevation: this._active.interpolate( {
            inputRange: [ 0, 1 ],
            outputRange: [ 2, 6 ],
          } ),
        },
      } ),
    };
  }

  componentWillReceiveProps( nextProps ) {
    if ( this.props.active !== nextProps.active ) {
      Animated.timing( this._active, {
        duration: 300,
        easing: Easing.bounce,
        toValue: Number( nextProps.active ),
      } ).start();
    }
  }

  render() {
    const { data } = this.props;

    return (
      <Animated.View
        style={ [
          styles.row,
          this._style,
        ] }
      >
        <Text style={ styles.text }>{ data.name }</Text>
      </Animated.View>
    );
  }
}
