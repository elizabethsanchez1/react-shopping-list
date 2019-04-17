import 'react-native';
import React from 'react';
import { Input } from '../../Form';
import renderer from 'react-test-renderer';
import { Loading } from "../index";


describe( 'Loading Component', () => {


  it( 'Loading base visually looks the same', () => {
    const tree = renderer.create(
      <Loading />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

} );




