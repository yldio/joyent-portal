import React from 'react';
import get from 'lodash.get';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

import { Anchor, Popover } from '../components';

const Ul = emotion('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const GetAccountServices = gql`
  {
    account {
      services {
        name
        url
      }
    }
  }
`;

const Account = ({ expanded, services = [] }) => {
  return expanded ? (
    <Popover>
      <Ul>
        {services.map(({ name, url }) => (
          <li>
            <Anchor href={url}>{name}</Anchor>
          </li>
        ))}
      </Ul>
    </Popover>
  ) : null;
};

export default compose(
  graphql(GetAccountServices, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => ({
      services: get(data, 'account.services', [])
    })
  })
)(Account);
