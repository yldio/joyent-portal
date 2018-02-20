import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import find from 'lodash.find';
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
        User script can be used to inject a custom boot script.
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
      <Empty>No User Script defined</Empty>
    ) : null}
  </ViewContainer>
);

export default compose(
  graphql(GetMetadata, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        fetchPolicy: 'network-only',
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      const { loading, error, variables, refetch, ...rest } = data;
      const { name } = variables;

      const instance = find(get(rest, 'machines', []), ['name', name]);
      const metadata = get(instance, 'metadata', [])
        .filter(({ name = '' }) => name === 'user-script')
        .shift();

      return {
        metadata,
        instance,
        loading,
        error
      };
    }
  })
)(UserScript);
