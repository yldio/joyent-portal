import React from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import pascalCase from 'pascal-case';

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
  HeaderDividerItem
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

const Panel = ({ name = '', expanded = false, children, ...rest }) => {
  if (!expanded) {
    return null;
  }

  const overlay = Overlays[pascalCase(name)];

  if (!overlay) {
    return null;
  }

  return React.createElement(overlay, rest, children);
};

const Navigation = ({ toggleSectionOpen, isOpen, activePanel }) => (
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
        <HeaderItemContent>Services</HeaderItemContent>
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
          <HeaderItemSubContent>Data Center:</HeaderItemSubContent> us-east-1
        </HeaderItemContent>
        <HeaderItemIcon>
          <DataCenterIcon light />
        </HeaderItemIcon>
      </HeaderItem>
      <HeaderDividerItem />
      <HeaderItem>
        <HeaderItemContent>
          <HeaderItemSubContent>Account:</HeaderItemSubContent> George
        </HeaderItemContent>
        <HeaderItemIcon>
          <Avatar />
        </HeaderItemIcon>
      </HeaderItem>
    </HeaderRow>
    <Panel expanded={isOpen} name={activePanel} />
  </Header>
);

export default compose(
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
