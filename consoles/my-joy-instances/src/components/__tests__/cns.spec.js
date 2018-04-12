import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Header, HostnamesHeader, AddServiceForm, Hostname } from '../cns';
import Theme from '@mocks/theme';

it('renders <Header/> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Header />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <HostnamesHeader /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <HostnamesHeader />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <AddServiceForm /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <AddServiceForm />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <AddServiceForm pristine /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <AddServiceForm pristine />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Hostname /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Hostname values={[]} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Hostname values /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Hostname values={['111', '111']} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
