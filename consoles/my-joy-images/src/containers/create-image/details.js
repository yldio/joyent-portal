import React, { Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import { set } from 'react-redux-values';
import ReduxForm from 'declarative-redux-form';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import { change } from 'redux-form';
import { connect } from 'react-redux';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import { NameIcon, H3, Button, H4, P } from 'joyent-ui-toolkit';

import Title from '@components/create-image/title';
import Details from '@components/create-image/details';
import Description from '@components/description';
import GetRandomName from '@graphql/get-random-name.gql';
import createClient from '@state/apollo-client';
import { instanceName as validateName } from '@state/validators';
import { Forms } from '@root/constants';

const NameContainer = ({
  expanded,
  proceeded,
  name,
  version,
  description,
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
      onClick={!expanded && !name && handleEdit}
      collapsed={!expanded && !proceeded}
      icon={<NameIcon />}
    >
      Image name and details
    </Title>
    {expanded ? (
      <Description>
        Here you can name your custom image, version it, and give it a
        description so that you can identify it elsewhere in the Triton
        ecosystem.
      </Description>
    ) : null}
    <ReduxForm
      form={Forms.FORM_DETAILS}
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      asyncValidate={handleAsyncValidate}
      shouldAsyncValidate={shouldAsyncValidate}
      onSubmit={handleNext}
    >
      {props =>
        expanded ? (
          <Details
            {...props}
            placeholderName={placeholderName}
            randomizing={randomizing}
            onRandomize={handleRandomize}
          />
        ) : name ? (
          <Margin top="3">
            <H3 bold noMargin>
              {name}
            </H3>
            {version ? (
              <Margin top="2">
                <H4 bold noMargin>
                  {version}
                </H4>
              </Margin>
            ) : null}
            {description ? (
              <Row>
                <Col xs="12" sm="8">
                  <Margin top="1">
                    <P>{description}</P>
                  </Margin>
                </Col>
              </Row>
            ) : null}
          </Margin>
        ) : null
      }
    </ReduxForm>
    {expanded ? (
      <Margin top="4" bottom="7">
        <Button type="button" disabled={!name} onClick={handleNext}>
          Next
        </Button>
      </Margin>
    ) : proceeded ? (
      <Margin top="4" bottom="7">
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
      fetchPolicy: 'network-only',
      ssr: false
    }),
    props: ({ data }) => ({
      placeholderName: data.rndName || ''
    })
  }),
  connect(
    ({ form, values }, ownProps) => {
      const name = get(form, `${Forms.FORM_DETAILS}.values.name`, '');
      const version = get(form, `${Forms.FORM_DETAILS}.values.version`, '');

      const description = get(
        form,
        `${Forms.FORM_DETAILS}.values.description`,
        ''
      );

      const proceeded = get(values, `${Forms.FORM_DETAILS}-proceeded`, false);
      const randomizing = get(values, 'create-image-name-randomizing', false);

      return {
        ...ownProps,
        proceeded,
        randomizing,
        name,
        version,
        description
      };
    },
    (dispatch, { history, match }) => ({
      handleNext: () => {
        dispatch(set({ name: `${Forms.FORM_DETAILS}-proceeded`, value: true }));
        return history.push(`/images/~create/${match.params.instance}/tag`);
      },
      handleEdit: () => {
        dispatch(set({ name: `${Forms.FORM_DETAILS}-proceeded`, value: true }));
        return history.push(`/images/~create/${match.params.instance}/name`);
      },
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'change';
      },
      handleAsyncValidate: validateName,
      handleRandomize: async () => {
        dispatch(set({ name: 'create-image-name-randomizing', value: true }));

        const [err, res] = await intercept(
          createClient().query({
            fetchPolicy: 'network-only',
            query: GetRandomName
          })
        );

        dispatch(set({ name: 'create-image-name-randomizing', value: false }));

        if (err) {
          // eslint-disable-next-line no-console
          console.error(err);
          return;
        }

        const { data } = res;
        const { rndName } = data;

        return dispatch(change(Forms.FORM_DETAILS, 'name', rndName));
      }
    })
  )
)(NameContainer);
