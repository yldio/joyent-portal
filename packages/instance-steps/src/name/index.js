import React, { PureComponent } from 'react';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { withRouter } from 'react-router';
import { Field, reset } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';
import get from 'lodash.get';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import {
  H2,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon as BaseRandomizeIcon,
  NameIcon
} from 'joyent-ui-toolkit';

import GetRandomName from '../graphql/get-random-name.gql';
import { Forms, Values } from '../constants';
import { instanceName as validateName } from '../validators';
import { QueryBreakpoints } from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

const { IR_NAME_F } = Forms;
const { IR_NAME_V_USE_RANDOM } = Values;

const RandomizeIcon = styled(BaseRandomizeIcon)`
  height: ${remcalc(16)};
  width: ${remcalc(16)};
`;

const NameContainer = ({
  history,
  randomizable = false,
  initialValues,
  handleValidate,
  randomizing,
  handleRandomize,
  handleGetValue,
  preview = {},
  children,
  ...props
}) => (
  <Step
    name="name"
    getValue={handleGetValue}
    isValid={handleValidate(preview)}
    {...props}
  >
    {children}
    <StepPreview>
      <Margin top="5">
        <H2>{preview.name}</H2>
      </Margin>
    </StepPreview>
    <StepOutlet>
      {({ next }) => (
        <Margin top="3">
          <ReduxForm
            form={IR_NAME_F}
            validate={handleValidate}
            initialValues={initialValues}
            destroyOnUnmount={false}
            forceUnregisterOnUnmount={false}
            enableReinitialize
            keepDirtyOnReinitialize
          >
            {({ invalid }) => (
              <form onSubmit={() => history.push(next)}>
                <FormGroup id="input-name" name="name" fluid field={Field}>
                  <FormLabel>Instance name</FormLabel>
                  <Margin top="0.5">
                    <SmallOnly>
                      <Flex column>
                        <FlexItem>
                          <Input onBlur={null} fluid />
                        </FlexItem>
                        {randomizable ? (
                          <FlexItem>
                            <Margin top="2">
                              <Button
                                id="randomize-button-name"
                                type="button"
                                loading={randomizing}
                                onClick={handleRandomize}
                                marginless
                                secondary
                                icon
                                fluid
                              >
                                <Margin right="1">
                                  <RandomizeIcon />
                                </Margin>
                                Randomize
                              </Button>
                            </Margin>
                          </FlexItem>
                        ) : null}
                      </Flex>
                    </SmallOnly>
                    <Medium>
                      <Flex>
                        <FlexItem>
                          <Input onBlur={null} />
                        </FlexItem>
                        {randomizable ? (
                          <FlexItem>
                            <Margin left="1" inline>
                              <Button
                                id="randomize-button-name"
                                type="button"
                                loading={randomizing}
                                onClick={handleRandomize}
                                marginless
                                secondary
                                icon
                              >
                                <Margin right="1">
                                  <RandomizeIcon />
                                </Margin>
                                Randomize
                              </Button>
                            </Margin>
                          </FlexItem>
                        ) : null}
                      </Flex>
                    </Medium>
                  </Margin>
                  <FormMeta />
                </FormGroup>
                <Margin top="5">
                  <Button
                    id="next-button-name"
                    type="button"
                    component={Link}
                    disabled={invalid}
                    to={next}
                  >
                    Next
                  </Button>
                </Margin>
              </form>
            )}
          </ReduxForm>
        </Margin>
      )}
    </StepOutlet>
  </Step>
);

const TemplateName = props => (
  <NameContainer {...props}>
    <StepHeader icon={<NameIcon />}>Name this template</StepHeader>
    <StepDescription>
      Please give your Template a name and define what prefix will be attached
      to all instances created from this template.
    </StepDescription>
  </NameContainer>
);

const InstanceName = props => (
  <NameContainer {...props}>
    <StepHeader icon={<NameIcon />} randomizable>
      Name this instance
    </StepHeader>
    <StepDescription>
      Your instance name will be used to identify this specific instance.
    </StepDescription>
  </NameContainer>
);

const Name = ({ type = 'instance', ...props }) =>
  type === 'instance' ? (
    <InstanceName {...props} />
  ) : (
    <TemplateName {...props} />
  );

const Container = compose(
  withRouter,
  graphql(GetRandomName, {
    options: () => ({
      ssr: false
    }),
    props: ({ data = {} }) => data
  }),
  connect(
    (store, ownProps) => {
      const { values = {}, form } = store;
      const { loading, rndName } = ownProps;

      const formState = get(form, `${IR_NAME_F}.values`, {});
      const useRandomName = get(values, IR_NAME_V_USE_RANDOM, false);
      const name = (useRandomName && rndName) || '';

      return {
        randomizing: loading && useRandomName,
        handleGetValue: () => formState,
        initialValues: {
          name
        }
      };
    },
    dispatch => ({
      handleValidate: validateName,
      handleRandomize: () => {
        return dispatch([
          reset(IR_NAME_F, 'name', ''),
          set({ name: IR_NAME_V_USE_RANDOM, value: true })
        ]);
      }
    })
  )
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
