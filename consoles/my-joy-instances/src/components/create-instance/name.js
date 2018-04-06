import React from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

import {
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon
} from 'joyent-ui-toolkit';

export default ({ placeholderName, randomizing, onRandomize, onSave }) => (
  <form>
    <Flex wrap alignEnd>
      <FlexItem flex>
        <FormGroup name="name" fluid field={Field}>
          <FormLabel>Instance name</FormLabel>
          <Margin top={0.5}>
            <Input placeholder={placeholderName} onBlur={null} />
          </Margin>
          <FormMeta />
        </FormGroup>
      </FlexItem>
      <FlexItem>
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
            <Margin right={1}>
              <RandomizeIcon />
            </Margin>
            <span>Randomize</span>
          </Button>
        </Margin>
      </FlexItem>
    </Flex>
    <Margin top={4}>
      <Button type="button" onClick={onSave}>
        Save
      </Button>
    </Margin>
  </form>
);
