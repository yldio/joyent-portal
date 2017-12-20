import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import {
  Checkbox,
  Label,
  Fieldset,
  FormGroup,
  Input,
  Textarea,
  FormLabel,
  Legend,
  FormMeta,
  Radio,
  Select,
  Toggle
} from '../';
import theme from '../../theme/';
import { ThemeProvider } from 'styled-components';

describe('Form', () => {
  test('Checkbox', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Checkbox>
            <Label>Detailed explanations</Label>
          </Checkbox>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Radio', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Radio>
            <Label>Detailed explanations</Label>
          </Radio>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('FormLabel', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <FormLabel>Detailed explanations</FormLabel>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });

  test('Fieldset', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Fieldset>Detailed explanations</Fieldset>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('FormMeta', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input placeholder="Enter email" type="email" />
            <FormMeta error>Unexpected children error!</FormMeta>
          </FormGroup>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Toggle', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <FormGroup name="who-killed-2" disabled>
            <Toggle value="video" disabled>
              Video
            </Toggle>
          </FormGroup>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Textarea', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Textarea />
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Legend', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <Legend>I am the legend </Legend>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Input', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <FormGroup>
            <Label>Username</Label>
            <Input placeholder="Example: JarJarBinks" type="email" />
          </FormGroup>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Select', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={theme}>
          <FormGroup>
            <Select>
              <option selected disabled>
                Select a datacenter
              </option>
              <option>Amsterdam, EU</option>
              <option>San Francisco, USA</option>
              <option>Seoul, South Korea</option>
              <option>Tokyo, Japan</option>
            </Select>
          </FormGroup>
        </ThemeProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
