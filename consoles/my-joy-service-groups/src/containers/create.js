import React, { Component, Fragment } from 'react';
import { If, Then } from 'react-if';
import ReduxForm from 'declarative-redux-form';
import { SubmissionError, destroy } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set, destroyAll } from 'react-redux-values';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  Button
} from 'joyent-ui-toolkit';

import {
  PostCreation,
  PostCreationContent,
  PostCreationTitle
} from 'joyent-ui-resource-widgets';

import { Provider as ResourceSteps } from 'joyent-ui-resource-step';

import parseError from '@state/parse-error';
import { Forms, Values } from '@root/constants';
import ListServiceGroups from '@graphql/list-service-groups.gql';
import CreateServiceGroup from '@graphql/create-service-group.gql';
import GetServiceGroup from '@graphql/get-service-group.gql';
import Template from './steps/template';
import Name from './steps/name';

const { SGC_F } = Forms;
const { SGC_N_V, SGC_T_V } = Values;

class CreateTemplate extends Component {
  constructor(...args) {
    super(...args);
    this.isValids = {};
  }

  setIsValid = name => ref => {
    if (!ref) {
      return;
    }

    const { isValid } = ref;

    if (!isValid) {
      return;
    }

    this.isValids = Object.assign({}, this.isValids, {
      [name]: isValid
    });
  };

  isFormValid = () => {
    const { steps } = this.props;

    return Boolean(
      Object.keys(this.isValids).filter(
        name => !this.isValids[name](steps[name] || {})
      ).length
    );
  };

  isStepValid = step => {
    const { steps } = this.props;
    const fn = this.isValids[step];
    const values = steps[step];

    if (!fn || !values) {
      return true;
    }

    return fn(values);
  };

  render() {
    const { match, steps, handleDefocus, handleSubmit } = this.props;
    const { params } = match;
    const { step } = params;
    const { template, name } = steps;

    const disabled = !(
      template &&
      template.id &&
      name &&
      name.name &&
      name.capacity
    );

    return (
      <ViewContainer main>
        <Padding top="5">
          <ResourceSteps namespace="service-groups/~create">
            <Margin bottom="4">
              <Template
                ref={this.setIsValid('template')}
                expanded={step === 'template'}
                next="name"
                saved={get(steps, 'template.id', false)}
                onDefocus={handleDefocus(SGC_T_V)}
                preview={template}
                isValid={this.isStepValid('template')}
              />
            </Margin>
            <Margin bottom="4">
              <Name
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus(SGC_N_V)}
                preview={name}
                isValid={this.isStepValid('name')}
              />
            </Margin>
          </ResourceSteps>
          <Margin top="5" bottom="3">
            <ReduxForm form={SGC_F} onSubmit={handleSubmit}>
              {({ handleSubmit, submitting, error }) => (
                <Fragment>
                  <If condition={error}>
                    <Then>
                      <Margin bottom="4">
                        <Message error>
                          <MessageTitle>Ooops!</MessageTitle>
                          <MessageDescription>{error}</MessageDescription>
                        </Message>
                      </Margin>
                    </Then>
                  </If>
                  <form onSubmit={handleSubmit}>
                    <Button loading={submitting} disabled={disabled}>
                      Deploy
                    </Button>
                  </form>
                </Fragment>
              )}
            </ReduxForm>
          </Margin>
        </Padding>
      </ViewContainer>
    );
  }
}

export const Success = ({ match }) => {
  const id = match.params.sg;

  return (
    <ViewContainer main>
      <Margin top="5">
        <PostCreation id={id} object="service group">
          <PostCreationTitle>
            You have successfully created a service group
          </PostCreationTitle>
          <PostCreationContent>
            Your service group has been created and is currently being
            processed. It should only take a few minutes and will then appear in
            your console.
          </PostCreationContent>
        </PostCreation>
      </Margin>
    </ViewContainer>
  );
};

export default compose(
  graphql(CreateServiceGroup, { name: 'createServiceGroup' }),
  connect(({ form, values = {} }) => ({
    forms: Object.keys(form),
    steps: {
      name: get(values, SGC_N_V),
      template: get(values, SGC_T_V)
    }
  })),
  connect(null, (dispatch, { forms, steps, history, createServiceGroup }) => ({
    handleDefocus: name => value => {
      return dispatch(set({ name, value }));
    },
    handleSubmit: async () => {
      const [err, res] = await intercept(
        createServiceGroup({
          variables: {
            name: steps.name.name,
            template: steps.template.id,
            capacity: steps.name.capacity
          },
          update: (proxy, { data: { createGroup: group } }) => {
            try {
              proxy.writeQuery({
                query: ListServiceGroups,
                data: {
                  groups: proxy
                    .readQuery({ query: ListServiceGroups })
                    .groups.concat([group])
                }
              });
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }

            try {
              proxy.writeQuery({
                query: GetServiceGroup,
                variables: { id: group.id },
                data: { group }
              });
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error(err);
            }
          }
        })
      );

      if (err) {
        throw new SubmissionError({
          _error: parseError(err)
        });
      }

      const { data } = res;
      const { createGroup: cg } = data;
      const { id } = cg;

      dispatch([destroyAll(), forms.map(name => destroy(name))]);
      history.push(`/service-groups/~create/${id}/success`);
    }
  }))
)(CreateTemplate);
