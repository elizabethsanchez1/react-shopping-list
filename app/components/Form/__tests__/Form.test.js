import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import { Input } from '../../Form';
import renderer from 'react-test-renderer';


describe( 'Form Components', () => {


  it( 'Input Base visually looks the same', () => {
    const tree = renderer.create(
      <Input
        label='Input Label'
        placeholder='my custom placeholder'
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );


  it( 'Input Base with error visually looks the same', () => {
    const tree = renderer.create(
      <Input
        containerStyling={ { marginTop: 50 } }
        placeholder="Input with error message"
        errorMessage="Error Message "
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } )


} );




