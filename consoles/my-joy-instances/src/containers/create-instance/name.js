import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import {
  Card,
  CardOutlet,
  NameIcon,
  ArrowIcon,
  Divider,
  H3
} from 'joyent-ui-toolkit';

import Name from '@components/create-instance/name';
import Description from '@components/description';
import SavedIcon from '@components/saved-icon';
import VerticalDivider from '@components/vertical-divider';
import GetRandomName from '@graphql/get-random-name.gql';
import { instanceName as validateName } from '@state/validators';
import createClient from '@state/apollo-client';
import { Forms, Values } from '@root/constants';

const { IC_NAME_F } = Forms;
const { IC_NAME_V_PROCEEDED, IC_NAME_V_RANDOMIZING } = Values;

const Header = ({ expanded }) => (
  <Flex alignCenter>
    <FlexItem>
      <NameIcon />
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem>
      <H3>Name this instance</H3>
    </FlexItem>
    <FlexItem>
      <VerticalDivider />
    </FlexItem>
    <FlexItem alignCenter>
      {expanded ? (
        <Link to={`/instances/~create/name`}>
          <Flex alignCenter>
            Collapse
            <Margin left={0.5}>
              <ArrowIcon direction="up" />
            </Margin>
          </Flex>
        </Link>
      ) : (
        <Link to={`/instances/~create/name`}>
          <Flex alignCenter>
            Expand
            <Margin left={0.5}>
              <ArrowIcon />
            </Margin>
          </Flex>
        </Link>
      )}
    </FlexItem>
  </Flex>
);

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
    <Margin bottom={4}>
      <Card>
        <CardOutlet>
          <Padding all={4}>
            <Flex justifyBetween>
              <FlexItem>
                <Header />
              </FlexItem>
              {proceeded && name ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : null}
            </Flex>
            {expanded || name ? (
              <Margin vertical={3}>
                <Divider height={remcalc(1)} />
              </Margin>
            ) : null}
            {expanded ? (
              <Margin top={3} bottom={4}>
                <Description>
                  Your instance name will be used to identify this specific
                  instance.
                </Description>
              </Margin>
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
                    onSave={handleNext}
                  />
                ) : name ? (
                  <Margin top={3}>
                    <H3>{name}</H3>
                  </Margin>
                ) : null
              }
            </ReduxForm>
          </Padding>
        </CardOutlet>
      </Card>
    </Margin>
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
        proceeded,
        randomizing,
        name
      };
    },
    (dispatch, { history, query }) => ({
      handleNext: () => {
        dispatch(set({ name: IC_NAME_V_PROCEEDED, value: true }));
        return history.push(
          `/instances/~create/${query.image ? 'package' : 'image'}${
            history.location.search
          }`
        );
      },
      handleEdit: () => {
        history.push(`/instances/~create/name${history.location.search}`);
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
