import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Message, Title, Description } from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Message', () => {
  test('Message', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Message>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Message Error', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Message error>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Message Warning', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Message warning>
            <Title>Choosing deployment data center</Title>
            <Description>
              Not all data centres have all configurations of instances
              available. Make sure that you choose the data center that suits
              your requirements. Learn more
            </Description>
          </Message>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Title', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Title>Choosing deployment data center</Title>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Description', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Description>Choosing deployment data center</Description>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
