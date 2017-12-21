import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Theme } from '../../mocks'
import theme from '../../theme'

import {
  Checkbox,
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

describe('Form', () => {
  test('Checkbox', () => {
    const tree = renderer
      .create(
        <Theme>
          <Checkbox>
            <FormLabel>Detailed explanations</FormLabel>
          </Checkbox>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Radio', () => {
    const tree = renderer
      .create(
        <Theme>
          <Radio>
            <FormLabel>Detailed explanations</FormLabel>
          </Radio>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('FormLabel', () => {
    const tree = renderer
      .create(
        <Theme>
          <FormLabel>Detailed explanations</FormLabel>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
    expect(tree).toHaveStyleRule('color', theme.secondary.replace(/ /g, ''));
  });

  test('Fieldset', () => {
    const tree = renderer
      .create(
        <Theme>
          <Fieldset>Detailed explanations</Fieldset>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('FormMeta', () => {
    const tree = renderer
      .create(
        <Theme>
          <div>
            <FormMeta error>Unexpected children error!</FormMeta>
            <FormMeta warning>Unexpected children warning!</FormMeta>
            <FormMeta success>Unexpected children success!</FormMeta>
          </div>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Toggle', () => {
    const tree = renderer
      .create(
        <Theme>
          <FormGroup name="who-killed-2" disabled>
            <Toggle value="video" disabled>
              Video
            </Toggle>
          </FormGroup>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Textarea', () => {
    const tree = renderer
      .create(
        <Theme>
          <Textarea />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Legend', () => {
    const tree = renderer
      .create(
        <Theme>
          <Legend>I am the legend </Legend>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Input', () => {
    const tree = renderer
      .create(
        <Theme>
          <Input placeholder="Example: JarJarBinks" type="email" />
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('Select', () => {
    const tree = renderer
      .create(
        <Theme>
          <Select>
            <option selected disabled>
              Select a datacenter
            </option>
            <option>Amsterdam, EU</option>
            <option>San Francisco, USA</option>
            <option>Seoul, South Korea</option>
            <option>Tokyo, Japan</option>
          </Select>
        </Theme>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
