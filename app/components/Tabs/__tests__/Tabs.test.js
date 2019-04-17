import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { View } from "react-native";
import { Text } from "../../Text";
import Tabs from "../Tabs";


describe( 'Tabs Component', () => {

  const firstView = () => (
    <View><Text>First tab content</Text></View>
  );

  const secondView = () => (
    <View><Text>Second tab content</Text></View>
  );


  it( 'Tabs base visually looks the same', () => {
    const tree = renderer.create(
      <View style={{width: '100%', height: 100}}>
        <Tabs
          routes={[
            { key: 'first', title: 'FIRST TAB' },
            { key: 'second', title: 'SECOND TAB' },
          ]}
          subViews={{
            first: firstView,
            second: secondView,
          }}
        />
      </View>
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

} );




