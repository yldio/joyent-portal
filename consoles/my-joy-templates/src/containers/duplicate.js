import React, { Component } from 'react';
import ReduxForm from 'declarative-redux-form';
import { SubmissionError, destroy } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set, destroyAll } from 'react-redux-values';
import intercept from 'apr-intercept';
import isString from 'lodash.isstring';
import get from 'lodash.get';

import {
  H3,
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  Button,
  StatusLoader
} from 'joyent-ui-toolkit';

import { Name } from 'joyent-ui-instance-steps';
import { Provider as ResourceSteps } from 'joyent-ui-resource-step';

import { Forms } from '@root/constants';
import { Meta } from '@components/summary';
import parseError from '@state/parse-error';
import CreateTemplateMutation from '@graphql/create-template.gql';
import GetTemplate from '@graphql/get-template.gql';

const { TD_F } = Forms;
const names = { name: 'TD_NAME' };

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
      Object.keys(this.isValids).filter(name => name =>
        !this.isValids[name](steps[name] || {})
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
    const {
      template,
      error,
      loading,
      match,
      steps,
      disabled,
      handleDefocus,
      handleSubmit
    } = this.props;

    const { params } = match;
    const { step, template: id } = params;
    const { name } = steps;

    return (
      <ViewContainer main>
        <Margin top="5">
          <H3>Duplicate Template</H3>
        </Margin>
        {error ? (
          <Margin bottom="5">
            <Message error>
              <MessageTitle>Ooops!</MessageTitle>
              <MessageDescription>
                {isString(error)
                  ? error
                  : 'An error occurred while loading your template'}
              </MessageDescription>
            </Message>
          </Margin>
        ) : null}
        <Margin top="5">
          {loading ? <StatusLoader /> : <Meta {...template} actions={false} />}
        </Margin>
        <Padding top="5">
          <ResourceSteps namespace={`templates/~duplicate/${id}`}>
            <Margin bottom="5">
              <Name
                type="template"
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus('name')}
                preview={name}
                isValid={this.isStepValid('name')}
              />
            </Margin>
          </ResourceSteps>
          <Margin bottom="5">
            <ReduxForm form={TD_F} onSubmit={handleSubmit}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Button
                    disabled={disabled || !this.isFormValid()}
                    loading={submitting}
                  >
                    Duplicate
                  </Button>
                </form>
              )}
            </ReduxForm>
          </Margin>
        </Padding>
      </ViewContainer>
    );
  }
}

export default compose(
  graphql(CreateTemplateMutation, { name: 'createTemplate' }),
  graphql(GetTemplate, {
    options: ({ match }) => ({
      ssr: true,
      variables: {
        id: get(match, 'params.template')
      }
    }),
    props: ({ data: { loading, error, template } }) => ({
      loading,
      error,
      template
    })
  }),
  connect((state, ownProps) => {
    const { template, loading, error: loadingError } = ownProps;

    const { form, values = {} } = state;

    const steps = { name: values[names.name] };
    const error = get(form, `${TD_F}.error`, null);

    // Maybe re-use saved to only write the rule once
    const disabled = !(
      !error &&
      !loading &&
      template &&
      steps.name &&
      steps.name.name
    );

    return {
      disabled,
      forms: Object.keys(form), // improve this
      error: Boolean(loadingError) || error,
      steps
    };
  }),
  connect(null, (dispatch, ownProps) => {
    const { steps = {}, forms, history, template, createTemplate } = ownProps;

    return {
      handleDefocus: name => value => {
        return dispatch(set({ name: names[name], value }));
      },
      handleSubmit: async () => {
        const [err, res] = await intercept(
          createTemplate({
            variables: {
              ...template,
              name: steps.name.name,
              metadata: template.metadata.map(({ name, value }) => ({
                name,
                value
              })),
              tags: template.tags.map(({ name, value }) => ({ name, value }))
            }
          })
        );

        if (err) {
          throw new SubmissionError({
            _error: parseError(err)
          });
        }

        dispatch([destroyAll(), forms.map(name => destroy(name))]);
        history.push(
          `/templates/~duplicate/${res.data.createTemplate.id}/success`
        );
      }
    };
  })
)(CreateTemplate);
