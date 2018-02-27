import React from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Cns } from '../cns';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

it('<Cns />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Cns />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Cns loading />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns loadingError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Cns loadingError />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns mutationError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Cns mutationError="mutation error" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns mutating />', async () => {
  const services = ['serbice', 'dssasda', 'dsasd'];

  const hostnames = [
    {
      values: ['stuffy-stuff'],
      public: true
    },
    {
      values: ['stuffy-stuff']
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      public: true,
      service: true
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      service: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Cns mutating services={services} hostnames={hostnames} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns disabled />', async () => {
  const services = ['serbice', 'dssasda', 'dsasd'];

  const hostnames = [
    {
      values: ['stuffy-stuff'],
      public: true
    },
    {
      values: ['stuffy-stuff']
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      public: true,
      service: true
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      service: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Cns disabled services={services} hostnames={hostnames} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns services />', async () => {
  const services = ['serbice', 'dssasda', 'dsasd'];

  expect(
    await screenshot(
      <Theme ss>
        <Cns services={services} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns hostnames />', async () => {
  const hostnames = [
    {
      values: ['stuffy-stuff'],
      public: true
    },
    {
      values: ['stuffy-stuff']
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      public: true,
      service: true
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      service: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Cns hostnames={hostnames} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Cns services hostnames />', async () => {
  const services = ['serbice', 'dssasda', 'dsasd'];

  const hostnames = [
    {
      values: ['stuffy-stuff'],
      public: true
    },
    {
      values: ['stuffy-stuff']
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      public: true,
      service: true
    },
    {
      values: ['serbice', 'dssasda', 'dsasd'],
      service: true
    }
  ];

  expect(
    await screenshot(
      <Theme ss>
        <Cns disabled services={services} hostnames={hostnames} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
