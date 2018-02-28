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

import Title from '@components/create-instance/title';
import Name from '@components/create-instance/name';
import Description from '@components/description';
import GetInstance from '@graphql/get-instance-small.gql';
import GetRandomName from '@graphql/get-random-name.gql';
import createClient from '@state/apollo-client';
import parseError from '@state/parse-error';
import { fieldError } from '@root/constants';

const FORM_NAME = 'create-instance-name';

const NameContainer = ({
  expanded,
  proceeded,
  name,
  placeholderName,
  randomizing,
  handleAsyncValidation,
  shouldAsyncValidate,
  handleNext,
  handleRandomize,
  handleEdit,
  step
}) => (
  <Fragment>
    <Title
      id={step}
      onClick={!expanded && !proceeded && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<NameIcon />}
    >
      Instance name
    </Title>
    {expanded ? (
      <Description>
        Your instance name will be used to identify this specific instance.
      </Description>
    ) : null}
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
          <Margin top={3}>
            <H3>{name}</H3>
          </Margin>
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" disabled={!name} onClick={handleNext}>
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top={4} bottom={7}>
        <Button type="button" onClick={handleEdit} secondary>
          Edit
        </Button>
      </Margin>
    ) : null}
  </Fragment>
);

export default compose(
  graphql(GetRandomName, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => ({
      placeholderName: data.rndName || ''
    })
  }),
  connect(
    ({ form, values }, ownProps) => {
      const name = get(form, `${FORM_NAME}.values.name`, '');
      const proceeded = get(values, 'create-instance-name-proceeded', false);

      const randomizing = get(
        values,
        'create-instance-name-randomizing',
        false
      );

      return {
        ...ownProps,
        proceeded: proceeded || name.length,
        randomizing,
        name
      };
    },
    (dispatch, { history, query }) => ({
      handleNext: () => {
        dispatch(set({ name: 'create-instance-name-proceeded', value: true }));
        return history.push(
          `/~create/${query.image ? 'package' : 'image'}${
            history.location.search
          }`
        );
      },
      handleEdit: () => {
        history.push(`/~create/name${history.location.search}`);
      },
      shouldAsyncValidate: ({ trigger }) => trigger === 'change',
      handleAsyncValidation: async ({ name }) => {
        const sanitized = punycode.encode(name).replace(/-$/, '');

        if (sanitized !== name) {
          // eslint-disable-next-line no-throw-literal
          throw {
            name: fieldError
          };
        }

        if (!/^[a-zA-Z0-9][a-zA-Z0-9\\_\\.\\-]*$/.test(name)) {
          // eslint-disable-next-line no-throw-literal
          throw {
            name: fieldError
          };
        }

        const [err, res] = await intercept(
          createClient().query({
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
      handleRandomize: async () => {
        dispatch(
          set({ name: 'create-instance-name-randomizing', value: true })
        );

        const [err, res] = await intercept(
          createClient().query({
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