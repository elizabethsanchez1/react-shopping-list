import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from "../../Text";
import Tooltip from '../Tooltip';

describe( 'Tool tip Component', () => {


  it( 'Tooltip visually looks the same', () => {
    const tree = renderer.create(
      <Tooltip
        visibleState={true}
        close={ () => console.log('close') }
        text={<Text textStyling={{ color: 'black' }}>Tooltip content here</Text>}
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

} );




