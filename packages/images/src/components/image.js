import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Field } from 'redux-form';
import {
  Card,
  Anchor,
  CardHeader,
  Divider,
  ActionsIcon,
  PopoverTarget,
  Popover,
  PopoverItem,
  PopoverDivider,
  PopoverContainer,
  Radio,
  FormLabel,
  FormGroup
} from 'joyent-ui-toolkit';

import Flex, { FlexItem } from 'styled-flex-component';
import { Padding, Margin } from 'styled-components-spacing';

import { ImageType, OS } from '../constants';

const A = styled(Anchor)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: ${props => props.theme.font.weight.semibold};
`;

export const Image = ({ name, os, version, type }) => (
  <Margin bottom={3}>
    <Card>
      <CardHeader white>
        <Padding left={2} right={2}>
          <Flex full alignCenter>
            <Margin right={2}>
              {React.createElement(OS[os], {
                width: '24',
                height: '24'
              })}
            </Margin>
            <A to={`/${name}`} component={Link}>
              {name}
            </A>
          </Flex>
        </Padding>
      </CardHeader>
      <Flex justifyBetween>
        <Padding left={2} top={2} bottom={2}>
          <Flex justifyBetween>
            <Flex>
              <Flex>{version}</Flex>
              <Margin left={1}>
                <Divider width={remcalc(1)} height="100%" />
              </Margin>
              <Padding left={2}>{ImageType[type]}</Padding>
            </Flex>
          </Flex>
        </Padding>
        <PopoverContainer clickable>
          <FlexItem basis={remcalc(48)}>
            <PopoverTarget box style={{ borderLeft: '1px solid #D8D8D8' }}>
              <ActionsIcon />
            </PopoverTarget>
            <Popover placement="bottom">
              <PopoverItem disabled={false} onClick={() => {}}>
                Create Instance
              </PopoverItem>
              <PopoverDivider />
              <PopoverItem disabled={false} onClick={() => {}}>
                Remove
              </PopoverItem>
            </Popover>
          </FlexItem>
        </PopoverContainer>
      </Flex>
    </Card>
  </Margin>
);

export const Filters = () => (
  <Fragment>
    <FormGroup name="image-type" value="all" field={Field} type="radio">
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel>All</FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
    <FormGroup
      name="image-type"
      value="hardware-virtual-machine"
      field={Field}
      type="radio"
    >
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel>Virtual machines</FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
    <FormGroup
      name="image-type"
      value="infrastructure-container"
      field={Field}
      type="radio"
    >
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel>Infrastructure container</FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
  </Fragment>
);
