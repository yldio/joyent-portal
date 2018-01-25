import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import { Cns } from '../cns';
import Theme from '@mocks/theme';

it('renders <Cns /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Cns />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns loading /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Cns loading />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns loadingError /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Cns loadingError />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns mutationError /> without throwing', () => {
  expect(
    renderer
      .create(
        <Theme>
          <Cns mutationError="mutation error" />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns mutating /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Cns mutating services={services} hostnames={hostnames} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns disabled /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Cns disabled services={services} hostnames={hostnames} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns services /> without throwing', () => {
  const services = ['serbice', 'dssasda', 'dsasd'];

  expect(
    renderer
      .create(
        <Theme>
          <Cns services={services} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns hostnames /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Cns hostnames={hostnames} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});

it('renders <Cns services hostnames /> without throwing', () => {
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
    renderer
      .create(
        <Theme>
          <Cns disabled services={services} hostnames={hostnames} />
        </Theme>
      )
      .toJSON()
  ).toMatchSnapshot();
});
