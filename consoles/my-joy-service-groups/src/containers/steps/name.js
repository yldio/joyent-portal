import React, { PureComponent } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { Field, change } from 'redux-form';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import plur from 'plur';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import {
  H2,
  P,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  InstanceCountIcon
} from 'joyent-ui-toolkit';

import { Forms } from '@root/constants';
import { name as validateName } from '@state/validators';

const { SGC_N_F } = Forms;

const Name = ({
  history,
  handleGetValue,
  preview = {},
  readOnlyName,
  initialValues,
  handleValidate,
  handlePlusClick,
  handleMinusClick,
  ...props
}) => (
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
      <Margin top="3">
        <Margin bottom="2">
          <H2>{preview.name}</H2>
        </Margin>
        <P>
          {preview.capacity} {plur('instance', preview.capacity)}
        </P>
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top="3">
          <ReduxForm
            form={SGC_N_F}
            validate={handleValidate}
            initialValues={initialValues}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={false}
            enableReinitialize
            keepDirtyOnReinitialize
          >
            {({ pristine, invalid }) => (
              <form onSubmit={() => history.push(next)}>
                <Margin bottom="5">
                  <FormGroup name="name" fluid field={Field}>
                    <FormLabel>Service group name</FormLabel>
                    <Margin top="0.5">
                      <Flex>
                        <FlexItem>
                          <Input
                            onBlur={null}
                            type="text"
                            disabled={readOnlyName}
                          />
                        </FlexItem>
                      </Flex>
                    </Margin>
                    <FormMeta />
                  </FormGroup>
                </Margin>
                <Margin bottom="5">
                  <FormGroup name="capacity" fluid field={Field}>
                    <FormLabel>Desired number of instances</FormLabel>
                    <Margin top="0.5">
                      <Flex>
                        <FlexItem>
                          <Input
                            type="number"
                            onBlur={null}
                            onPlusClick={handlePlusClick}
                            onMinusClick={handleMinusClick}
                            xSmall
                          />
                        </FlexItem>
                      </Flex>
                    </Margin>
                    <FormMeta />
                  </FormGroup>
                </Margin>
                <Button
                  type="button"
                  component={Link}
                  to={next}
                  disabled={pristine || invalid}
                >
                  Save
                </Button>
              </form>
            )}
          </ReduxForm>
        </Margin>
      )}
    </StepOutlet>
  </Step>
);

const Container = compose(
  withRouter,
  connect((store, { preview = {} }) => {
    const { form } = store;

    return {
      handleGetValue: () => get(form, `${SGC_N_F}.values`, {}),
      initialValues: {
        capacity: 1,
        ...preview
      }
    };
  }),
  connect(null, (dispatch, { handleGetValue }) => ({
    handleValidate: validateName,
    handlePlusClick: ({ shiftKey, metaKey }) => {
      const count = metaKey ? 100 : shiftKey ? 10 : 1;
      const capacity = handleGetValue().capacity || 0;
      return dispatch(change(SGC_N_F, 'capacity', capacity + count));
    },
    handleMinusClick: ({ shiftKey, metaKey }) => {
      const count = metaKey ? 100 : shiftKey ? 10 : 1;
      const capacity = handleGetValue().capacity || 0;
      return dispatch(change(SGC_N_F, 'capacity', capacity - count));
    }
  }))
)(Name);

export default class extends PureComponent {
  isValid(values) {
    const msgs = validateName(values);
    return !msgs || !Object.values(msgs).length;
  }

  render() {
    const { children, ...props } = this.props;
    return <Container {...props}>{children}</Container>;
  }
}
