import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { Pagination } from "../../Pagination";

describe( 'Pagination Component', () => {

  it( 'Pagination visually looks the same', () => {
    const tree = renderer.create(
      <Pagination
        current={ 1 }
        total={ 4 }
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

} );




