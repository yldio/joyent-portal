import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { Link } from 'react-router-dom';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import {
  ViewContainer,
  Divider,
  Anchor,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import ToolbarForm from '@components/toolbar';
import ListImages from '@graphql/list-images.gql';

// const TABLE_FORM_NAME = 'images-list-table';
const MENU_FORM_NAME = 'images-list-menu';

export const List = ({ images = [], loading = false, error = null }) => (
  <ViewContainer main>
    <Divider height={remcalc(30)} transparent />
    <ReduxForm form={MENU_FORM_NAME}>
      {props => <ToolbarForm {...props} searchable={!loading} />}
    </ReduxForm>
    {loading && !images.length ? (
      <Fragment>
        <Divider height={remcalc(30)} transparent />
        <StatusLoader />
      </Fragment>
    ) : null}
    {error && !images.length && !loading ? (
      <Margin bottom={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>
            An error occurred while loading your instances
          </MessageDescription>
        </Message>
      </Margin>
    ) : null}
    <ul>
      {images.map(({ name }) => (
        <li>
          <Anchor to={`/${name}`} component={Link}>
            {name}
          </Anchor>
        </li>
      ))}
    </ul>
  </ViewContainer>
);

export default compose(
  graphql(ListImages, {
    props: ({ data: { images, loading, error, refetch } }) => {
      return {
        images,
        loading,
        error
      };
    }
  })
)(List);
