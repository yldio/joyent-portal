import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  H3,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon
} from 'joyent-ui-toolkit';

import Description from '@components/create-instance/description';

export default ({
  handleSubmit,
  pristine,
  asyncValidating,
  expanded,
  name,
  placeholderName,
  randomizing,
  onCancel,
  onRandomize
}) => (
  <form onSubmit={handleSubmit}>
    {expanded ? (
      <Fragment>
        <Description>
          Your instance name will be used to identify this specific instance.
        </Description>
        <Flex>
          <FlexItem>
            <FormGroup name="name" fluid field={Field}>
              <FormLabel>Instance Name</FormLabel>
              <Input placeholder={placeholderName} onBlur={null} />
              <FormMeta marginless />
            </FormGroup>
          </FlexItem>
          <FlexItem>
            <FormLabel>&#8291;</FormLabel>
            <Margin left={1}>
              <Button
                type="button"
                marginTop={remcalc(8)}
                onClick={onRandomize}
                loading={randomizing}
                marginless
                secondary
                icon
              >
                <RandomizeIcon />
                <span>Randomize</span>
              </Button>
            </Margin>
          </FlexItem>
        </Flex>
        <Margin top={2} bottom={4}>
          <Button type="submit" disabled={pristine} loading={asyncValidating}>
            Next
          </Button>
        </Margin>
      </Fragment>
    ) : (
      <Fragment>
        {name ? (
          <Fragment>
            <Margin bottom={2} top={3}>
              <H3 bold>{name}</H3>
            </Margin>
            <Button type="button" secondary onClick={onCancel}>
              Edit
            </Button>
          </Fragment>
        ) : null}
      </Fragment>
    )}
  </form>
);
