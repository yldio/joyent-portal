import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import renderer from 'react-test-renderer';
import screenshot from 'react-screenshot-renderer';

import { Header, HostnamesHeader, AddServiceForm, Hostname } from '../cns';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Header/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Header />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<HostnamesHeader />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <HostnamesHeader />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<AddServiceForm />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <AddServiceForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<AddServiceForm pristine />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <AddServiceForm pristine />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Hostname />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Hostname values={[]} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Hostname values />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Hostname values={['111', '111']} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
