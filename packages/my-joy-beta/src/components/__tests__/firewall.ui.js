import React, { Fragment } from 'react';
import { toMatchImageSnapshot } from 'jest-image-snapshot';
import screenshot from 'react-screenshot-renderer';

import {
  Rules,
  TagRules,
  DefaultRules,
  ToggleFirewallForm,
  ToggleInactiveForm
} from '../firewall';

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

it('<Rules/>', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Rules />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<Rules rules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <Rules rules={rules} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<DefaultRules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <DefaultRules />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<DefaultRules rules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <DefaultRules rules={rules} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<TagRules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <TagRules />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<TagRules rules />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <TagRules rules={rules} />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<ToggleFirewallForm />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <ToggleFirewallForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<ToggleFirewallForm submitting />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <ToggleFirewallForm submitting />
      </Theme>
    )
  ).toMatchImageSnapshot();
});

it('<ToggleInactiveForm />', async () => {
  expect(
    await screenshot(
      <Theme ss>
        <ToggleInactiveForm />
      </Theme>
    )
  ).toMatchImageSnapshot();
});
