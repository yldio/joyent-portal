import React from 'react';
import PropTypes from 'prop-types';
import paramCase from 'param-case';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import GetMetadata from '@graphql/list-metadata.gql';
import { KeyValue } from '@components/instances';

const MetadataForms = (metadata = []) =>
  metadata.map(({ key, formName, formValue, value, name }) => {
    const MetadataForm = reduxForm({
      form: `instance-metadata-${key}`,
      initialValues: {
        [formName]: name,
        [formValue]: value
      }
    })(KeyValue);

    return (
      <MetadataForm
        key={key}
        formName={formName}
        formValue={formValue}
        name={key}
        onSubmit={val => console.log(key, val)}
        onRemove={key => console.log('remove', key)}
        textarea
      />
    );
  });

const Metadata = ({ metadata = [], loading, error }) => {
  const values = forceArray(metadata);
  const _title = <Title>Metadata</Title>;
  const _loading = !(loading && !values.length) ? null : (
    <StatusLoader />
  );

  const _metadata = !_loading && MetadataForms(values);

  const _error = (error && !values.length && !_loading) ? (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance metadata"
      error
    />
  ) : null;

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_metadata}
    </ViewContainer>
  );
};

Metadata.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetMetadata, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const values = get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'metadata',
        []
      );

      const metadata = Object.keys(values).reduce((all, name) => {
        const key = paramCase(name);

        return {
          ...all,
          [key]: {
            key,
            formName: `${key}-name`,
            formValue: `${key}-value`,
            value: values[name],
            name
          }
        };
      }, {});

      return { metadata: Object.values(metadata), loading, error };
    }
  })
)(Metadata);
