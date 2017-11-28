import React from 'react';
import renderer from 'react-test-renderer';
import Store from '@mocks/store';
import 'jest-styled-components';

import Home, { CopyToClipboardTooltip, CopiableField, Meta } from '../home';

it('renders <CopiableField /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <CopiableField label="test" text="test" />
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Home /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Home
          instance={{
            id: '2252839a-e698-ceec-afac-9549ad0c6624',
            state: 'RUNNING',
            name: '2252839a',
            created: '2017-10-13T11:36:04.463Z',
            updated: '2017-11-27T13:46:28.000Z',
            primary_ip: '72.2.119.146',
            ips: ['ahgsjdasdhjas', 'ajshdajkdhk'],
            docker: null,
            dns_names: {},
            compute_node: '70bb1cee-dba3-11e3-a799-002590e4f2b0',
            image: {},
            package: {},
            __typename: 'Machine'
          }}
          starting={true}
          stopping={false}
          rebooting={true}
          deleteing={false}
          onAction={() => {}}
        />
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <Meta /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <Meta {...{
          "id": "2252839a-e698-ceec-afac-9549ad0c6624",
          "state": "RUNNING",
          "name": "2252839a",
          "created": "2017-10-13T11:36:04.463Z",
          "updated": "2017-11-27T13:46:28.000Z",
          "primary_ip": "72.2.119.146",
          "ips": {},
          "docker": null,
          "dns_names": {},
          "compute_node": "70bb1cee-dba3-11e3-a799-002590e4f2b0",
          "image": {},
          "package": {},
          "__typename": "Machine"
      }} onAction={() => console.log('sup??')}/>
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it('renders <CopyToClipboardTooltip /> without throwing', () => {
  const tree = renderer
    .create(
      <Store>
        <CopyToClipboardTooltiptip>{"test"}</CopyToClipboardTooltiptip>
      </Store>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
