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

const UpdateHeaderMutation = gql`
  mutation updateHeader($isOpen: Boolean!, $activePanel: String!) {
    updateHeader(isOpen: $isOpen, activePanel: $activePanel) @client
  }
`;

const GetHeader = gql`
  {
    isOpen @client
    activePanel @client
  }
`;

// Needs to be revised
// const GetAccount = gql`
//   {
//     datacenter {
//       name
//     }
//     account {
//       login
//     }
//   }
// `;

const Navigation = ({
  login,
  datacenter = true,
  toggleSectionOpen,
  isOpen,
  activePanel
}) => (
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
      {datacenter ? (
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
      ) : null}
      {datacenter ? <HeaderDividerItem /> : null}
      <HeaderItem>
        <HeaderItemContent>
          <HeaderItemSubContent>Account:</HeaderItemSubContent>
          <HeaderSpace />
          Raul Millais
        </HeaderItemContent>
        <HeaderItemIcon>
          <Avatar />
        </HeaderItemIcon>
      </HeaderItem>
      )
    </HeaderRow>
    {keys(Overlays).map(panelName =>
      React.createElement(Overlays[panelName], {
        expanded: isOpen && panelName === pascalCase(activePanel)
      })
    )}
  </Header>
);

export default compose(
  // graphql(GetAccount, {
  //   options: () => ({
  //     ssr: false
  //   }),
  //   props: ({ data }) => {
  //     const {
  //       account = {},
  //       datacenter = {},
  //       loading = false,
  //       error = null
  //     } = data;
  //     const { login } = account;
  //     const { name } = datacenter;

  //     return { login, datacenter: name, loading, error };
  //   }
  // }),
  graphql(GetHeader, {
    options: () => ({
      ssr: false
    }),
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
  graphql(UpdateHeaderMutation, {
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
