/* eslint-disable camelcase */

import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { destroyAll } from 'react-redux-values';
import { destroy, stopSubmit } from 'redux-form';
import { connect } from 'react-redux';
import { compose, graphql } from 'react-apollo';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import uniqBy from 'lodash.uniqby';
import omit from 'lodash.omit';
import find from 'lodash.find';

import {
  ViewContainer,
  H2,
  Button,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import CreateImage from '@graphql/create-image.gql';
import GetInstance from '@graphql/get-instance.gql';
import Details from '@containers/create-image/details';
import Tags from '@containers/create-image/tags';
import { Forms } from '@root/constants';
import parseError from '@state/parse-error';

const Create = ({
  step,
  history,
  location,
  match,
  disabled,
  loading,
  loadingError,
  handleSubmit
}) => (
  <ViewContainer>
    {loading ? (
      <Margin top={4}>
        <StatusLoader />
      </Margin>
    ) : null}
    {loadingError ? (
      <Margin top={4}>
        <Message error>
          <MessageTitle>Ooops!</MessageTitle>
          <MessageDescription>{loadingError}</MessageDescription>
        </Message>
      </Margin>
    ) : null}
    {!loading && !loadingError ? (
      <Margin top={4} bottom={4}>
        <H2>Create Image</H2>
      </Margin>
    ) : null}
    {!loading && !loadingError ? (
      <Details
        history={history}
        match={match}
        step="name"
        expanded={step === 'name'}
      />
    ) : null}
    {!loading && !loadingError ? (
      <Tags
        history={history}
        match={match}
        step="tag"
        expanded={step === 'tag'}
      />
    ) : null}
    <ReduxForm form={Forms.CREATE_FORM} onSubmit={handleSubmit}>
      {({ handleSubmit, submitting }) =>
        !loading && !loadingError ? (
          <form onSubmit={handleSubmit}>
            <Margin top={step === 'tag' ? 7 : 4}>
              <Button disabled={disabled} loading={submitting}>
                Create Image
              </Button>
            </Margin>
          </form>
        ) : null
      }
    </ReduxForm>
  </ViewContainer>
);

export default compose(
  graphql(CreateImage, { name: 'createImage' }),
  graphql(GetInstance, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const notFoundMsg = `Instance "${variables.name}" not found!`;
      const inst = find(get(rest, 'machines.results', []), [
        'name',
        variables.name
      ]);

      const notFound = !loading && !inst ? notFoundMsg : false;

      return {
        instance: inst,
        loadingError: error ? parseError(error) : notFound,
        loading
      };
    }
  }),
  connect(({ form, values }, { match }) => {
    const step = get(match, 'params.step', 'name');

    const name = get(form, `${Forms.FORM_DETAILS}.values.name`, '');
    const version = get(form, `${Forms.FORM_DETAILS}.values.version`, '');

    const disabled = !(name.length && version.length);

    if (disabled) {
      return { disabled, step };
    }

    const description = get(
      form,
      `${Forms.FORM_DETAILS}.values.description`,
      '<instance-description>'
    );

    const tags = get(values, Forms.CREATE_TAGS, []);

    return {
      forms: Object.keys(form), // improve this
      name,
      description,
      version,
      tags,
      disabled,
      step
    };
  }),
  connect(null, (dispatch, ownProps) => {
    const {
      name,
      description,
      version,
      tags,
      instance,
      forms,
      createImage,
      history
    } = ownProps;

    return {
      handleSubmit: async () => {
        const _name = name.toLowerCase();
        const _description = description.toLowerCase();
        const _version = version.toLowerCase();
        const _tags = uniqBy(tags, 'name').map(a => omit(a, 'expanded'));

        const [err, res] = await intercept(
          createImage({
            variables: {
              machine: instance.id,
              name: _name,
              version: _version,
              description: _description,
              tags: _tags
            }
          })
        );

        if (err) {
          return dispatch(
            stopSubmit(Forms.CREATE_FORM, {
              _error: parseError(err)
            })
          );
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);

        const { data } = res;
        const { createImageFromMachine } = data;

        history.push(`/images/${createImageFromMachine.name}`);
      }
    };
  })
)(Create);
