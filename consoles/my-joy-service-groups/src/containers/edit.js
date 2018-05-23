import React, { Fragment } from 'react';
import { If, Then, Else } from 'react-if';
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
  Button,
  StatusLoader
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
import UpdateServiceGroup from '@graphql/update-service-group.gql';
import GetServiceGroup from '@graphql/get-service-group.gql';
import Template from './steps/template';
import Name from './steps/name';

const { SGE_F } = Forms;
const { SGE_N_V } = Values;

const EditTemplate = ({
  match,
  steps,
  loading,
  initialCapacity,
  handleDefocus,
  handleSubmit
}) => {
  const { params } = match;
  const { step, sg } = params;
  const { template, name } = steps;

  const disabled = name && name.capacity && initialCapacity === name.capacity;

  return (
    <ViewContainer main>
      <Padding top="5">
        <If condition={loading}>
          <Then>
            <StatusLoader />
          </Then>
          <Else>
            <Fragment>
              <ResourceSteps namespace={`service-groups/~edit/${sg}`}>
                <Margin bottom="4">
                  <Template next="name" preview={template} readOnly />
                </Margin>
                <Margin bottom="4">
                  <Name
                    expanded={step === 'name'}
                    saved={get(steps, 'name.name', false)}
                    onDefocus={handleDefocus(SGE_N_V)}
                    preview={name}
                    readOnlyName
                  />
                </Margin>
              </ResourceSteps>
              <Margin top="5" bottom="3">
                <ReduxForm form={SGE_F} onSubmit={handleSubmit}>
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
                          Update
                        </Button>
                      </form>
                    </Fragment>
                  )}
                </ReduxForm>
              </Margin>
            </Fragment>
          </Else>
        </If>
      </Padding>
    </ViewContainer>
  );
};

export const Success = ({ match }) => {
  const id = match.params.sg;

  return (
    <ViewContainer main>
      <Margin top="5">
        <PostCreation id={id} object="service group">
          <PostCreationTitle>
            You have successfully updated a service group
          </PostCreationTitle>
          <PostCreationContent>
            Your service group has been updated and is currently being
            processed. It should only take a few minutes and the changes will
            reflected in your console.
          </PostCreationContent>
        </PostCreation>
      </Margin>
    </ViewContainer>
  );
};

export default compose(
  graphql(UpdateServiceGroup, { name: 'updateServiceGroup' }),
  graphql(GetServiceGroup, {
    options: ({ match }) => ({
      ssr: true,
      variables: {
        id: get(match, 'params.sg')
      }
    }),
    props: ({ data: { networkStatus, error, group } }) => ({
      loading: networkStatus === 1,
      error,
      group
    })
  }),
  connect(({ form, values = {} }, { group = {} }) => {
    const { template, capacity, name } = group;

    return {
      forms: Object.keys(form),
      initialCapacity: capacity,
      steps: {
        name: get(values, SGE_N_V) || { name, capacity },
        template
      }
    };
  }),
  connect(
    null,
    (dispatch, { forms, group, steps, history, updateServiceGroup }) => ({
      handleDefocus: name => value => {
        return dispatch(set({ name, value }));
      },
      handleSubmit: async () => {
        const [err, res] = await intercept(
          updateServiceGroup({
            variables: {
              id: group.id,
              name: group.name,
              template: group.template.id,
              capacity: steps.name.capacity
            },
            update: (proxy, { data: { createGroup: group } }) => {
              try {
                proxy.writeQuery({
                  query: ListServiceGroups,
                  data: {
                    groups: proxy
                      .readQuery({ query: ListServiceGroups })
                      .groups.map(g => (g.id === group.id ? group : g))
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
        const { updateGroup: ug } = data;
        const { id } = ug;

        dispatch([destroyAll(), forms.map(name => destroy(name))]);
        history.push(`/service-groups/~edit/${id}/success`);
      }
    })
  )
)(EditTemplate);
