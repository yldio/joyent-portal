import React from 'react';
import { Field } from 'redux-form';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import {
  Button,
  FormGroup,
  Input,
  FormLabel,
  Divider
} from 'joyent-ui-toolkit';

export const Toolbar = ({
  searchable = true,
  searchLabel = 'Filter',
  searchPlaceholder = '',
  action = false,
  actionLabel = '',
  actionable = false,
  onActionClick
}) => (
  <Flex justifyBetween>
    <FormGroup name="filter" field={Field}>
      <FormLabel>{searchLabel}</FormLabel>
      <Margin top={0.5}>
        <Input placeholder={searchPlaceholder} disabled={!searchable} />
      </Margin>
    </FormGroup>
    {action ? (
      <FormGroup right>
        <Divider height={remcalc(21)} transparent />
        <Button
          type={onActionClick ? 'button' : 'submit'}
          disabled={!actionable}
          onClick={onActionClick}
          icon
          fluid
        >
          {actionLabel}
        </Button>
      </FormGroup>
    ) : null}
  </Flex>
);

export default ({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Toolbar {...rest} />
    <Divider height={remcalc(20)} transparent />
  </form>
);
