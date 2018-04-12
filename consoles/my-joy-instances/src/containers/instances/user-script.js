import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import get from 'lodash.get';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  StatusLoader
} from 'joyent-ui-toolkit';

import Editor from 'joyent-ui-toolkit/dist/es/editor';
import Description from '@components/description';
import Empty from '@components/empty';
import GetMetadata from '@graphql/list-metadata.gql';

export const UserScript = ({ metadata, loading = false, error = null }) => (
  <ViewContainer main>
    <Margin bottom={1}>
      <Description>
        User script can be used to inject a custom boot script.{' '}
        <a
          href="https://docs.joyent.com/private-cloud/instances/using-mdata#UsingtheMetadataAPI-ListofMetadataKeys"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read the docs
        </a>
      </Description>
    </Margin>
    {loading ? <StatusLoader /> : null}
    {!loading && error ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading the instance user-script
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {!loading && metadata ? (
      <Editor defaultValue={metadata.value} readOnly />
    ) : null}
    {!loading && !error && !metadata ? (
      <Empty borderTop>No User Script defined</Empty>
    ) : null}
  </ViewContainer>
);

export default compose(
  graphql(GetMetadata, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        fetchPolicy: 'network-only',
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      const { loading, error, machine } = data;

      const metadata = get(machine, 'metadata', [])
        .filter(({ name = '' }) => name === 'user-script')
        .shift();

      return {
        metadata,
        instance: machine,
        loading,
        error
      };
    }
  })
)(UserScript);
