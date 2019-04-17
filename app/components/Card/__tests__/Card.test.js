import 'react-native';
import React from 'react';
import { Text } from 'react-native';
import Card from './../Card';
import renderer from 'react-test-renderer';


describe('Card Component', () => {


  it('Card base visually looks the same', () => {
    const tree = renderer.create(
      <Card
        title="title renders"
      >
        <Text>Testing</Text>
      </Card>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  })


});




