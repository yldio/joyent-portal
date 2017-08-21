import React from 'react';
import { graphql } from 'react-apollo';
import get from 'lodash.get';

import PortalQuery from '@graphql/Portal.gql';
import { Header as HeaderComponent } from '@components/navigation';

export const Header = ({ datacenter, username }) =>
  <HeaderComponent datacenter={datacenter} username={username} />;

const HeaderWithData = graphql(PortalQuery, {
  props: ({ data: { portal = {} } }) => ({
    datacenter: get(portal, 'datacenter.region', ''),
    username: get(portal, 'user.firstName', '')
  })
})(Header);

export default HeaderWithData;
