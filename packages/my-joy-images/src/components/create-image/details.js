import React from 'react';
import { Field } from 'redux-form';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';

import {
  Divider,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  RandomizeIcon,
  Textarea
} from 'joyent-ui-toolkit';

export default ({ placeholderName, randomizing, onRandomize }) => (
  <form>
    <Flex wrap>
      <FlexItem flex>
        <FormGroup name="name" fluid field={Field}>
          <FormLabel>Image name</FormLabel>
          <Margin top={0.5}>
            <Input placeholder={placeholderName} onBlur={null} required />
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
    <Margin top={3}>
      <FormGroup name="version" fluid field={Field}>
        <FormLabel>Version</FormLabel>
        <Margin top={0.5}>
          <Input placeholder="Example: v1.0" onBlur={null} required />
        </Margin>
        <FormMeta />
      </FormGroup>
    </Margin>
    <Row>
      <Col xs={12} sm={8}>
        <Margin top={3}>
          <FormGroup name="description" fluid field={Field}>
            <FormLabel>Description</FormLabel>
            <Margin top={0.5}>
              <Textarea
                placeholder="Example: JarJarBinks, Anakin Skywalker, Obi Wan Kenobi, Qui-Gon Jinn, Han Solo, Wookies"
                fluid
              />
            </Margin>
            <FormMeta />
          </FormGroup>
        </Margin>
      </Col>
    </Row>
  </form>
);
