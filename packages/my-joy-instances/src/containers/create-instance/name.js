import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Margin } from 'styled-components-spacing';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import { NameIcon, H3, Button } from 'joyent-ui-toolkit';

import Title from '@components/create-instance/title';
import Name from '@components/create-instance/name';
import Description from '@components/description';
import GetRandomName from '@graphql/get-random-name.gql';
import { instanceName as validateName } from '@state/validators';
import createClient from '@state/apollo-client';
import parseError from '@state/parse-error';
import { Forms, Values } from '@root/constants';

const { IC_NAME_F } = Forms;
const { IC_NAME_V_PROCEEDED, IC_NAME_V_RANDOMIZING } = Values;

const NameContainer = ({
  invalid,
  expanded,
  proceeded,
  name,
  placeholderName,
  randomizing,
  handleAsyncValidate,
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
      invalid={!expanded && invalid}
    >
      Instance name
    </Title>
    {expanded ? (
      <Description>
        Your instance name will be used to identify this specific instance.
      </Description>
    ) : null}
    <ReduxForm
      form={IC_NAME_F}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleNext}
      asyncValidate={handleAsyncValidate}
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
      const name = get(form, `${IC_NAME_F}.values.name`, '');
      const invalid = get(form, `${IC_NAME_F}.asyncErrors.name`, null);
      const randomizing = get(values, IC_NAME_V_RANDOMIZING, false);
      const proceeded = get(values, IC_NAME_V_PROCEEDED, false);

      return {
        invalid,
        proceeded: proceeded || name.length,
        randomizing,
        name
      };
    },
    (dispatch, { history, query }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_NAME_V_PROCEEDED, value: true }));
        return history.push(
          `/~create/${query.image ? 'package' : 'image'}${
            history.location.search
          }`
        );
      },
      handleEdit: () => {
        history.push(`/~create/name${history.location.search}`);
      },
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'change';
      },
      handleAsyncValidate: validateName,
      handleRandomize: async () => {
        dispatch(set({ name: IC_NAME_V_RANDOMIZING, value: true }));

        const [err, res] = await intercept(
          createClient().query({
            fetchPolicy: 'network-only',
            query: GetRandomName
          })
        );

        dispatch(set({ name: IC_NAME_V_RANDOMIZING, value: false }));

        if (err) {
          console.error(err);
          return;
        }

        const { data } = res;
        const { rndName } = data;

        return dispatch(change(IC_NAME_F, 'name', rndName));
      }
    })
  )
)(NameContainer);
