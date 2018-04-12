import React, { Component } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import get from 'lodash.get';

import { ViewContainer } from 'joyent-ui-toolkit';
import { Provider as ResourceSteps } from 'joyent-ui-resource-step';
import { Name, Image, validators } from 'joyent-ui-instance-steps';

const names = {
  name: 'IC_NAME',
  image: 'IC_IMAGE',
  package: 'IC_PACKAGE',
  tags: 'IC_TAGS'
};

class CreateInstance extends Component {
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

    return Object.keys(this.isValids).filter(
      name => !this.isValids[name](steps[name] || {})
    ).length;
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
    const { match, steps, handleDefocus } = this.props;
    const { params } = match;
    const { step } = params;
    const { name, image } = steps;

    return (
      <ViewContainer main>
        <Padding top="5">
          <ResourceSteps namespace="instance-resource-steps/~create">
            <Margin bottom="4">
              <Name
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                next="image"
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus('name')}
                preview={name}
                isValid={this.isStepValid('name')}
                optional
              />
            </Margin>
            <Margin bottom="4">
              <Image
                ref={this.setIsValid('image')}
                expanded={step === 'image'}
                next="package"
                saved={steps.image}
                onDefocus={handleDefocus('image')}
                preview={image}
              />
            </Margin>
          </ResourceSteps>
        </Padding>
      </ViewContainer>
    );
  }
}

export default compose(
  connect(
    ({ values = {} }) => ({
      steps: {
        name: values[names.name],
        image: values[names.image],
        package: values[names.package],
        tags: values[names.tags]
      }
    }),
    (dispatch, ownProps) => ({
      handleDefocus: name => value =>
        dispatch(set({ name: names[name], value }))
    })
  )
)(CreateInstance);
