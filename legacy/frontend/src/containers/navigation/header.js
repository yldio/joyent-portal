import React from 'react';
import { graphql } from 'react-apollo';
import PortalQuery from '@graphql/Portal.gql';
import { Header as HeaderComponent } from '@components/navigation';

const Header = ({
  portal = {
    datacenter: {
      region: ''
    },
    user: {
      firstName: ''
    }
  },
  loading,
  error
}) => {

  return (
    <HeaderComponent
      datacenter={portal.datacenter.region}
      username={portal.user.firstName}
    />
  );
};

const HeaderWithData = graphql(PortalQuery, {
  props: ({ data: { portal, loading, error }}) => ({
    portal,
    loading,
    error
  })
})(Header);

export default HeaderWithData;
