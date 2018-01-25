import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import pascalCase from 'pascal-case';
import keys from 'lodash.keys';

import { DataCenterIcon, TritonIcon, ServicesIcon } from './components';
import * as Overlays from './containers';

import {
  Avatar,
  Header,
  HeaderRow,
  HeaderItem,
  HeaderItemContent,
  HeaderItemSubContent,
  HeaderItemIcon,
  HeaderFlexibleSpaceItem,
  HeaderDividerItem,
  HeaderSpace
} from './components';

const updateHeaderMutation = gql`
  mutation updateHeader($isOpen: Boolean!, $activePanel: String!) {
    updateHeader(isOpen: $isOpen, activePanel: $activePanel) @client
  }
`;

const getHeader = gql`
  {
    isOpen @client
    activePanel @client
  }
`;

const getAccount = gql`
  {
    account {
      login
    }
  }
`;

const Navigation = ({ login, toggleSectionOpen, isOpen, activePanel }) => (
  <Header onOutsideClick={() => toggleSectionOpen()}>
    <HeaderRow>
      <HeaderItem>
        <TritonIcon light />
      </HeaderItem>
      <HeaderDividerItem />
      <HeaderItem
        onClick={() => toggleSectionOpen('services')}
        active={isOpen && activePanel === 'services'}
      >
        <HeaderItemContent>Products & Services</HeaderItemContent>
        <HeaderItemIcon>
          <ServicesIcon light />
        </HeaderItemIcon>
      </HeaderItem>
      <HeaderDividerItem />
      <HeaderFlexibleSpaceItem />
      <HeaderDividerItem />
      <HeaderItem
        onClick={() => toggleSectionOpen('datacenter')}
        active={isOpen && activePanel === 'datacenter'}
      >
        <HeaderItemContent>
          <HeaderItemSubContent>Data Center:</HeaderItemSubContent>
          <HeaderSpace />
          <span>us-east-1</span>
        </HeaderItemContent>
        <HeaderItemIcon>
          <DataCenterIcon light />
        </HeaderItemIcon>
      </HeaderItem>
      <HeaderDividerItem />
      {login ? (
        <HeaderItem>
          <HeaderItemContent>
            <HeaderItemSubContent>Account:</HeaderItemSubContent>
            <HeaderSpace />
            {login}
          </HeaderItemContent>
          <HeaderItemIcon>
            <Avatar />
          </HeaderItemIcon>
        </HeaderItem>
      ) : null}
    </HeaderRow>
    {keys(Overlays).map(panelName =>
      React.createElement(Overlays[panelName], {
        expanded: isOpen && panelName === pascalCase(activePanel)
      })
    )}
  </Header>
);

export default compose(
  graphql(getAccount, {
    props: ({ data }) => {
      const { account = {}, loading = false, error = null } = data;

      const { login } = account;

      return { login, loading, error };
    }
  }),
  graphql(getHeader, {
    props: ({ data }) => {
      const {
        isOpen = false,
        activePanel = '',
        loading = false,
        error = null
      } = data;

      return { isOpen, activePanel, loading, error };
    }
  }),
  graphql(updateHeaderMutation, {
    props: ({ mutate, ownProps }) => ({
      toggleSectionOpen: (name = '') => {
        const { isOpen, activePanel } = ownProps;
        return mutate({
          variables: {
            isOpen: !(isOpen && name === activePanel),
            activePanel: name
          }
        });
      }
    })
  })
)(Navigation);
