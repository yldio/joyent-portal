import React from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  Divider,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon
} from 'joyent-ui-toolkit';

export default ({ placeholderName, randomizing, onRandomize }) => (
  <form>
    <Flex wrap>
      <FlexItem flex>
        <FormGroup name="name" fluid field={Field}>
          <FormLabel>Instance Name</FormLabel>
          <Margin top={0.5}>
            <Input placeholder={placeholderName} onBlur={null} />
          </Margin>
          <FormMeta />
        </FormGroup>
      </FlexItem>
      <FlexItem>
        <Divider height={remcalc(13)} transparent />
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
  </form>
);
