import React from 'react';
import PropTypes from 'prop-types';
import paramCase from 'param-case';
import forceArray from 'force-array';
import { compose, graphql } from 'react-apollo';
import { reduxForm } from 'redux-form';
import find from 'lodash.find';
import get from 'lodash.get';

import { ViewContainer, Title, StatusLoader, Message } from 'joyent-ui-toolkit';

import { KeyValue } from '@components/instances';
import GetTags from '@graphql/list-tags.gql';
import PutTags from '@graphql/add-tags.gql';

const TagForms = (tags = []) => tags.map(({ key, formName, formValue, value, name }) => {
  const TagForm = reduxForm({
    form: `instance-tags-${key}`,
    initialValues: {
      [formName]: name,
      [formValue]: value
    }
  })(KeyValue);

  return (
    <TagForm
      key={key}
      formName={formName}
      formValue={formValue}
      name={key}
      onSubmit={val => console.log(key, val)}
      onRemove={key => console.log('remove', key)}
    />
  );
});

const Tags = ({ tags = [], loading, error }) => {
  const _title = <Title>Tags</Title>;
  const _loading = !(loading && !forceArray(tags).length) ? null : (
    <StatusLoader />
  );

  const _tags = !_loading && TagForms(tags);

  const _error = !(error && !_loading) ? null : (
    <Message
      title="Ooops!"
      message="An error occurred while loading your instance tags"
      error
    />
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_title}
      {_loading}
      {_error}
      {_tags}
    </ViewContainer>
  );
};

Tags.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(GetTags, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => {
      const values = get(
        find(get(rest, 'machines', []), ['name', variables.name]),
        'tags',
        []
      );


      const tags = Object.keys(values).reduce((all, name) => {
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

      return { tags: Object.values(tags), loading, error };
    }
  }),
  graphql(PutTags, {
    props: ({ mutate, ownProps }) => ({
      updateTag: (name = '', value = '') =>
        mutate({
          variables: { name, value }
        })
    })
  })
)(Tags);
