import 'jest-styled-components';

import React from 'react';
import renderer from 'react-test-renderer';
import ReduxForm from 'declarative-redux-form';

import Store from '@mocks/store';
import Theme from '@mocks/theme';
import ListForm, { MenuForm, Actions, Item } from '../list';

it('renders <MenuForm /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <ReduxForm form="instance-list-form">{MenuForm}</ReduxForm>
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <MenuForm searchable /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <ReduxForm form="instance-list-form" searchable>
              {MenuForm}
            </ReduxForm>
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <Actions />
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions submitting /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <Actions submitting />
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions submitting allowedActions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <Actions submitting allowedActions={{ stop: true }} />
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions allowedActions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <Actions allowedActions={{ stop: true }} />
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Actions allowedActions /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <Actions allowedActions={{ stop: true }} />
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <ListForm /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <ReduxForm form="instance-list-form">{ListForm}</ReduxForm>
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Item /> without throwing', () => {
  expect(
    renderer
      .create(
        <Store>
          <Theme>
            <ReduxForm form="instance-list-item-form">{Item}</ReduxForm>
          </Theme>
        </Store>
      )
      .toJSON()
  ).toMatchSnapshot();
});
