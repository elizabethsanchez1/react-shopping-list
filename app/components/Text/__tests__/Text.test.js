import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from "../../Text";


describe( 'Text Component', () => {

  it( 'Text is visually looks the same', () => {
    const tree = renderer.create(
      <Text>Testing</Text>
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

} );




