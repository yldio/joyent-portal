import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import get from 'lodash.get';
import punycode from 'punycode';

import { NameIcon, H3, Button } from 'joyent-ui-toolkit';

import Name from '@components/create-instance/name';
import Title from '@components/create-instance/title';
import GetInstance from '@graphql/get-instance-small.gql';
import GetRandomName from '@graphql/get-random-name.gql';
import { client } from '@state/store';
import parseError from '@state/parse-error';

const FORM_NAME = 'create-instance-name';

const NameContainer = ({
  expanded,
  name,
  placeholderName,
  randomizing,
  handleAsyncValidation,
  shouldAsyncValidate,
  handleNext,
  handleRandomize,
  handleEdit
}) => (
  <Fragment>
    <Title onClick={!expanded && !name && handleEdit} icon={<NameIcon />}>
      Instance name
    </Title>
    <ReduxForm
      form={FORM_NAME}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleNext}
      asyncValidate={handleAsyncValidation}
      shouldAsyncValidate={shouldAsyncValidate}
    >
      {props =>
        expanded ? (
          <Name
            {...props}
            placeholderName={placeholderName}
            randomizing={randomizing}
            onRandomize={handleRandomize}
          />
        ) : name ? (
          <Fragment>
            <Margin bottom={2} top={3}>
              <H3 bold>{name}</H3>
            </Margin>
            <Button type="button" secondary onClick={handleEdit}>
              Edit
            </Button>
          </Fragment>
        ) : null
      }
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
        const sanitized = punycode.encode(name).replace(/-$/, '');

        if (sanitized !== name) {
          // eslint-disable-next-line no-throw-literal
          throw {
            name: 'Special characters are not accepted'
          };
        }

        if (!/^[a-zA-Z0-9][a-zA-Z0-9\\_\\.\\-]*$/.test(name)) {
          throw {
            name: 'Invalid name'
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
          // eslint-disable-next-line no-throw-literal
          throw {
            name: parseError(err)
          };
        }

        const { data } = res;
        const { machines = [] } = data;

        if (machines.length) {
          // eslint-disable-next-line no-throw-literal
          throw {
            name: `${name} already exists`
          };
        }
      },
      handleNext: () => {
        dispatch(set({ name: 'create-instance-name-proceeded', value: true }));

        return history.push(`/instances/~create/image`);
      },
      handleEdit: () => history.push(`/instances/~create/name`),
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
