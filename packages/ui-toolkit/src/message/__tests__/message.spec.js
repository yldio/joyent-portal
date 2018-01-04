import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Message, Title, Description } from '../';
import { Theme } from '../../mocks';

describe('Message', () => {
  test('Message', () => {
    const tree = renderer
      .create(
        <Theme>
          <Message>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Message Error', () => {
    const tree = renderer
      .create(
        <Theme>
          <Message error>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Message Warning', () => {
    const tree = renderer
      .create(
        <Theme>
          <Message warning>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Title', () => {
    const tree = renderer
      .create(
        <Theme>
          <Title>Choosing deployment data center</Title>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Description', () => {
    const tree = renderer
      .create(
        <Theme>
          <Description>Choosing deployment data center</Description>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
