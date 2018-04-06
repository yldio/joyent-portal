import React, { Component } from 'react';
import ReduxForm from 'declarative-redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import get from 'lodash.get';

import {
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  Button
} from 'joyent-ui-toolkit';

import { Provider as ResourceSteps } from 'joyent-ui-resource-step';
import Template from './template';
import Name from './name';

const names = {
  template: 'SG_TEMPLATE',
  deploy: 'SG_DEPLOY'
};

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
    const { error, match, steps, handleDefocus } = this.props;
    const { params } = match;
    const { step } = params;
    const { template, name } = steps;

    return (
      <ViewContainer main>
        <Padding top="5">
          <ResourceSteps namespace="service-groups/~create">
            <Margin bottom="4">
              <Template
                ref={this.setIsValid('template')}
                expanded={step === 'template'}
                next="image"
                saved={get(steps, 'template.id', false)}
                onDefocus={handleDefocus('template')}
                preview={template}
                isValid={this.isStepValid('template')}
              />
            </Margin>
            <Margin bottom="4">
              <Name
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                next="image"
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus('name')}
                preview={name}
                isValid={this.isStepValid('name')}
              />
            </Margin>
          </ResourceSteps>
          <Margin top={5} bottom={3}>
            {error ? (
              <Margin bottom={4}>
                <Message error>
                  <MessageTitle>Ooops!</MessageTitle>
                  <MessageDescription>{error}</MessageDescription>
                </Message>
              </Margin>
            ) : null}
            <ReduxForm form={names.deploy}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Button disabled={!this.isFormValid()} loading={submitting}>
                    Deploy
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
  connect(
    ({ values = {} }) => ({
      steps: {
        name: values[names.name]
      }
    }),
    (dispatch, ownProps) => ({
      handleDefocus: name => value =>
        dispatch(set({ name: names[name], value }))
    })
  )
)(CreateTemplate);
