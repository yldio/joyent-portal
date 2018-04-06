import React, { PureComponent } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { Field } from 'redux-form';
import { reset } from 'redux-form';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import {
  H2,
  Divider,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon,
  NameIcon
} from 'joyent-ui-toolkit';

const Template = ({ handleGetValue, preview = {}, ...props }) => (
  <Step name="template" getValue={handleGetValue} {...props}>
    <StepHeader icon={<NameIcon />}>Select template</StepHeader>
    <StepDescription>
      Select the template you’d like to deloy your instances from. Once a
      Service Group is deployed with a templates, any changes to that template
      will not effect the acting service group.
    </StepDescription>
    <StepPreview>
      <Margin top="5" />
    </StepPreview>
    <StepOutlet />
  </Step>
);

const Container = compose(connect(null, null))(Template);

export default class extends PureComponent {
  isValid = values => {
    return false;
  };

  render = () => {
    const { children, ...props } = this.props;
    return <Container {...props}>{children}</Container>;
  };
}
