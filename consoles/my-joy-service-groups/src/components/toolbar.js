import React from 'react';
import Flex from 'styled-flex-component';
import { If, Then } from 'react-if';
import { Margin } from 'styled-components-spacing';
import { Link } from 'react-router-dom';
import { Field } from 'redux-form';

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
    <If condition={actionable}>
      <Then>
        <FormGroup right>
          <Button
            type={actionTo || onActionClick ? 'button' : 'submit'}
            component={actionTo ? Link : undefined}
            to={actionTo}
            onClick={onActionClick}
            icon
            fluid
          >
            {actionLabel}
          </Button>
        </FormGroup>
      </Then>
    </If>
  </Flex>
);

export default ({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <Toolbar {...rest} />
  </form>
);
