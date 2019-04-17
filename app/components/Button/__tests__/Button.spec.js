import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import { FloatingButton, Link, PrimaryButton, SecondaryButton } from "../../Button";

describe( 'Button Components', () => {

  it( 'Primary Button visually looks the same', () => {
    const tree = renderer.create(
      <PrimaryButton
        title="PRIMARY"
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

  it( 'Primary Button with loading visually looks the same', () => {
    const tree = renderer.create(
      <PrimaryButton
        title="PRIMARY"
        loading={ true }
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );

  it( 'Primary Button disabled visually looks the same', () => {
    const tree = renderer.create(
      <PrimaryButton
        title="PRIMARY"
        disabled
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );


  it( 'Secondary Button visually looks the same', () => {
    const tree = renderer.create(
      <SecondaryButton
        title="SECONDARY"
      />
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );


  it( 'Floating Button visually looks the same', () => {
    const tree = renderer.create(
      <FloatingButton/>
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );


  it( 'Link Button visually looks the same', () => {
    const tree = renderer.create(
      <Link/>
    ).toJSON();

    expect( tree ).toMatchSnapshot();
  } );
} );




