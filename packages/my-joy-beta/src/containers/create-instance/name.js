import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import punycode from 'punycode';

import { NameIcon } from 'joyent-ui-toolkit';

import Name from '@components/create-instance/name';
import Title from '@components/create-instance/title';
import GetInstance from '@graphql/get-instance-small.gql';
import GetRandomName from '@graphql/get-random-name.gql';
import { client } from '@state/store';
import parseError from '@state/parse-error';

const FORM_NAME = 'CREATE_INSTANCE_NAME';

const NameContainer = ({
  expanded,
  name,
  placeholderName,
  randomizing,
  handleAsyncValidation,
  shouldAsyncValidate,
  handleNext,
  handleCancel,
  handleRandomize
}) => (
  <Fragment>
    <Title icon={<NameIcon />}>Instance name</Title>
    <ReduxForm
      form={FORM_NAME}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleNext}
      asyncValidate={handleAsyncValidation}
      shouldAsyncValidate={shouldAsyncValidate}
    >
      {props => (
        <Name
          {...props}
          name={name}
          placeholderName={placeholderName}
          expanded={expanded}
          randomizing={randomizing}
          onCancel={handleCancel}
          onRandomize={handleRandomize}
        />
      )}
    </ReduxForm>
  </Fragment>
);

export default compose(
  graphql(GetRandomName, {
    fetchPolicy: 'network-only',
    props: ({ data }) => ({
      placeholderName: data.rndName || ''
    })
  }),
  connect(
    ({ form, values }, ownProps) => {
      const randomizing = get(
        values,
        'create-instance-name-randomizing',
        false
      );
      const name = get(form, `${FORM_NAME}.values.name`, '');

      return {
        ...ownProps,
        randomizing,
        name
      };
    },
    (dispatch, { history }) => ({
      shouldAsyncValidate: ({ trigger }) => trigger === 'submit',
      handleAsyncValidation: async ({ name }) => {
        const sanitized = punycode.encode(name).replace(/\-$/, '');

        if (sanitized !== name) {
          throw {
            name: 'Special characters are not accepted'
          };
        }

        const [err, res] = await intercept(
          client.query({
            fetchPolicy: 'network-only',
            query: GetInstance,
            variables: { name }
          })
        );

        if (err) {
          throw {
            name: parseError(err)
          };
        }

        const { data } = res;
        const { machines = [] } = data;

        if (machines.length) {
          throw {
            name: `${name} already exists`
          };
        }
      },
      handleNext: () => history.push(`/instances/~create/image`),
      handleCancel: () => history.push(`/instances/~create/name`),
      handleRandomize: async () => {
        dispatch(
          set({ name: 'create-instance-name-randomizing', value: true })
        );

        const [err, res] = await intercept(
          client.query({
            fetchPolicy: 'network-only',
            query: GetRandomName
          })
        );

        dispatch(
          set({ name: 'create-instance-name-randomizing', value: false })
        );

        if (err) {
          console.error(err);
          return;
        }

        const { data } = res;
        const { rndName } = data;

        return dispatch(change(FORM_NAME, 'name', rndName));
      }
    })
  )
)(NameContainer);
