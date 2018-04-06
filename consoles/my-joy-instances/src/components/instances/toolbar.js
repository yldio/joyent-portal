import React from 'react';
import { Field } from 'redux-form';
import Flex from 'styled-flex-component';
import { Margin } from 'styled-components-spacing';
import { Link } from 'react-router-dom';

import { FormGroup, Input, FormLabel, Button } from 'joyent-ui-toolkit';

export const Toolbar = ({
  searchLabel = 'Filter',
  searchPlaceholder = '',
  searchable = true,
  actionLabel = 'Create',
  actionable = true,
  onActionClick,
  actionTo
}) => (
  <Flex justifyBetween alignEnd>
    <FormGroup name="filter" field={Field}>
      <FormLabel>{searchLabel}</FormLabel>
      <Margin top="0.5">
        <Input placeholder={searchPlaceholder} disabled={!searchable} />
      </Margin>
    </FormGroup>
    <FormGroup right>
      <Button
        type={actionTo || onActionClick ? 'button' : 'submit'}
        disabled={!actionable}
        component={actionTo ? Link : undefined}
        to={actionTo}
        onClick={onActionClick}
        icon
        fluid
      >
        {actionLabel}
      </Button>
    </FormGroup>
  </Flex>
);

export default ({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Toolbar {...rest} />
  </form>
);
