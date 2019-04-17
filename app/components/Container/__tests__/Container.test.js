import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import renderer from 'react-test-renderer';
import Container from "../Container";


describe('Container Component', () => {


  it('Container base visually looks the same', () => {
    const tree = renderer.create(
      <Container>
        <Text>Container</Text>
      </Container>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Container scroll base visually looks the same', () => {
    const tree = renderer.create(
      <Container scroll>
        <Text>Container</Text>
      </Container>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });


});




