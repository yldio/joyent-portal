import React from 'react';
import { compose, graphql } from 'react-apollo';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import find from 'lodash.find';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  H3,
  ViewContainer,
  StatusLoader,
  Divider,
  Message,
  MessageTitle,
  MessageDescription,
  TagList
} from 'joyent-ui-toolkit';

import Tag from '@components/tags';
import ToolbarForm from '@components/toolbar';
import GetTags from '@graphql/get-tags.gql';

const MENU_FORM_NAME = 'image-tags-list-menu';

export const Tags = ({ tags = [], loading = false, error = null }) => (
  <ViewContainer main>
    <ReduxForm form={MENU_FORM_NAME}>
      {props => (
        <Margin bottom="4">
          <ToolbarForm
            {...props}
            searchable={!loading}
            actionLabel="Add Tag"
            actionable={!loading}
            action
          />
          <Divider height={remcalc(1)} />
        </Margin>
      )}
    </ReduxForm>
    {error && !loading && !tags.length ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your instance tags
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {!loading ? (
      <Margin bottom={4}>
        <H3>
          {tags.length} tag{tags.length === 1 ? '' : 's'}
        </H3>
      </Margin>
    ) : null}
    {loading && !tags.length ? <StatusLoader /> : null}
    <TagList>
      {tags.map(({ name, value }) => (
        <Tag key={value} name={name} value={value} active />
      ))}
    </TagList>
  </ViewContainer>
);

export default compose(
  graphql(GetTags, {
    options: ({ match }) => ({
      variables: {
        name: get(match, 'params.image')
      }
    }),
    props: ({
      data: { loading = false, error = null, variables, ...rest }
    }) => ({
      tags: get(
        find(get(rest, 'images', []), ['name', variables.name]),
        'tags',
        []
      ),
      loading,
      error
    })
  })
)(Tags);
