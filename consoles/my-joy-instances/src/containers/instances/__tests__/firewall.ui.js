/* eslint-disable camelcase */
import React, { Fragment } from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import { Firewall } from '../firewall';
import Theme from '@mocks/theme';

expect.extend({
  toMatchImageSnapshot
});

const rules = [
  {
    id: '3473327e-6d0c-4747-97c5-ced1260a7e42',
    enabled: true,
    rule_str: 'FROM any TO all vms ALLOW icmp TYPE 8 CODE 0',
    rule_obj: {
      from: [['wildcard', 'any']],
      to: [['wildcard', 'vmall']],
      action: 'allow',
      protocol: {
        name: 'icmp',
        targets: ['8:0']
      },
      isWildcard: true,
      tags: []
    },
    global: true,
    description: null
  },
  {
    id: '24d55d2f-12ba-4935-9de9-ac305b8a40a5',
    enabled: true,
    rule_str: 'FROM any TO all vms ALLOW icmp6 TYPE all',
    rule_obj: {
      from: [['wildcard', 'any']],
      to: [['wildcard', 'vmall']],
      action: 'allow',
      protocol: {
        name: 'icmp6',
        targets: ['all']
      },
      isWildcard: true,
      tags: []
    },
    global: true,
    description: 'allow all ICMPv6 types'
  },
  {
    id: '4bd8b2e2-981b-474b-9b8b-0b53fecb4b71',
    enabled: false,
    rule_str: 'FROM all vms TO all vms ALLOW tcp PORT all',
    rule_obj: {
      from: [['wildcard', 'vmall']],
      to: [['wildcard', 'vmall']],
      action: 'allow',
      protocol: {
        name: 'tcp',
        targets: ['all']
      },
      isWildcard: true,
      tags: []
    },
    global: null,
    description: null
  },
  {
    id: 'af549024-b3b1-43bf-8a66-49c2b2dc5640',
    enabled: false,
    rule_str: 'FROM all vms TO all vms ALLOW tcp PORT all',
    rule_obj: {
      from: [['wildcard', 'vmall']],
      to: [['wildcard', 'vmall']],
      action: 'allow',
      protocol: {
        name: 'tcp',
        targets: ['all']
      },
      isWildcard: true,
      tags: []
    },
    global: null,
    description: null
  },
  {
    id: '9e5a152a-582b-4525-909e-f9c55deb7f03',
    enabled: false,
    rule_str: 'FROM any TO tag "wat" ALLOW tcp PORT all',
    rule_obj: {
      from: [['wildcard', 'any']],
      to: [['tag', 'wat']],
      action: 'allow',
      protocol: {
        name: 'tcp',
        targets: ['all']
      },
      isWildcard: false,
      tags: ['wat']
    },
    global: null,
    description: null
  }
];

it('<Firewall />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Fragment>
          <Firewall />
          <Firewall enabled />
        </Fragment>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall loading />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Fragment>
          <Firewall loading />
          <Firewall loading enabled />
        </Fragment>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall inactive />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Fragment>
          <Firewall inactive />
          <Firewall inactive enabled />
        </Fragment>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall loadingError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Firewall loadingError />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall mutationError />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Firewall mutationError="error" />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall tagRules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Fragment>
          <Firewall
            tagRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
          />
          <Firewall
            tagRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
            inactive
          />
          <Firewall
            tagRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
            enabled
            inactive
          />
        </Fragment>
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Firewall tagRules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Fragment>
          <Firewall
            defaultRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
          />
          <Firewall
            defaultRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
            inactive
          />
          <Firewall
            defaultRules={rules.filter(({ rule_obj }) => rule_obj.tags.length)}
            enabled
            inactive
          />
        </Fragment>
      </Theme>
    )
  ).toMatchImageSnapshot();
});
