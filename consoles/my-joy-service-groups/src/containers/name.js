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
  InstanceCountIcon
} from 'joyent-ui-toolkit';

const Template = ({ handleGetValue, preview = {}, ...props }) => (
  <Step name="name" getValue={handleGetValue} {...props}>
    <StepHeader icon={<InstanceCountIcon />}>
      Name and instance count
    </StepHeader>
    <StepDescription>
      Input the name of your Service Group and the desired number of instances
      this group will aim to maintain. You can scale up or down your Service
      Group anytime after commisioning.
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
