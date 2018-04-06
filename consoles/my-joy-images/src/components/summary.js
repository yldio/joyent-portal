import React, { Fragment } from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Margin, Padding } from 'styled-components-spacing';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import titleCase from 'title-case';
import remcalc from 'remcalc';
import { ValueBreakpoints as breakpoints } from 'joyent-ui-toolkit';

import {
  Card,
  CardOutlet,
  H2,
  P,
  Label as BaseLabel,
  Divider,
  Button,
  QueryBreakpoints,
  CopiableField,
  DuplicateIcon,
  DeleteIcon,
  DotIcon,
  FormLabel,
  Input
} from 'joyent-ui-toolkit';

import GLOBAL from '@state/global';
import { ImageType, OS } from '@root/constants';

const { SmallOnly, Medium } = QueryBreakpoints;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(18)};

  @media (max-width: ${remcalc(breakpoints.small.upper)}) {
    display: none;
  }
`;

const Label = styled(BaseLabel)`
  font-weight: 200;
`;

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const StateColor = {
  ACTIVE: 'green',
  UNACTIVATED: 'grey',
  DISABLED: 'secondaryActive',
  CREATING: 'primary',
  FAILED: 'red'
};

// eslint-disable-next-line camelcase
export const Meta = ({ name, version, type, published_at, state, os }) => (
  <Fragment>
    <Flex alignCenter>
      <FlexItem>
        <Margin right="2">
          {React.createElement(OS[os], {
            width: '30',
            height: '30'
          })}
        </Margin>
      </FlexItem>
      <FlexItem>
        <H2 bold>{name}</H2>
      </FlexItem>
    </Flex>
    <Margin top="2" bottom="3">
      <Flex>
        <Label>{version}</Label>
        <VerticalDivider />
        <Label>{ImageType[type]}</Label>
        <VerticalDivider />
        <Fragment>
          <GreyLabel>Created:</GreyLabel>
          <Label> {distanceInWordsToNow(published_at)} ago</Label>
        </Fragment>
        <VerticalDivider />
        <Flex>
          <FlexItem>
            <DotIcon
              right={remcalc(6)}
              size={remcalc(15)}
              color={StateColor[state]}
            />
          </FlexItem>
          <FlexItem>
            <Label>{titleCase(state)}</Label>
          </FlexItem>
        </Flex>
      </Flex>
    </Margin>
  </Fragment>
);

export default ({ theme = {}, onRemove, removing, ...image }) => (
  <Row>
    <Col xs={12} sm={12} md={9}>
      <Card>
        <CardOutlet>
          <Padding all={5}>
            <Meta {...image} />
            <Row between="xs">
              <Col xs={9}>
                <SmallOnly>
                  <Button type="button" small icon>
                    <DuplicateIcon light />
                  </Button>
                </SmallOnly>
                <Medium>
                  <Button
                    type="button"
                    href={`${GLOBAL.origin}/instances/~create/?image=${
                      image.id
                    }`}
                    target="__blank"
                    rel="noopener noreferrer"
                    bold
                    icon
                  >
                    <span>Create Instance</span>
                  </Button>
                </Medium>
              </Col>
              <Col xs={3}>
                <SmallOnly>
                  <Button type="button" small icon error right>
                    <DeleteIcon fill="red" />
                  </Button>
                </SmallOnly>
                <Medium>
                  <Button
                    type="button"
                    loading={removing}
                    onClick={onRemove}
                    bold
                    icon
                    error
                    right
                  >
                    <Margin right="1">
                      <DeleteIcon fill="red" />
                    </Margin>
                    <span>Delete</span>
                  </Button>
                </Medium>
              </Col>
            </Row>
            <Margin bottom="4" top="4">
              <Divider height={remcalc(1)} />
            </Margin>
            <Margin bottom="2">
              <P>{image.description}</P>
            </Margin>
            <Margin bottom="3">
              <CopiableField text={(image.id || '').split('-')[0]} label="ID" />
            </Margin>
            <Margin bottom="3">
              <CopiableField text={image.id} label="UUID" />
            </Margin>
            <Row>
              <Col xs={12} md={7}>
                <Margin bottom="3">
                  <FormLabel>Operating system</FormLabel>
                  <Input
                    monospace
                    onBlur={null}
                    fluid
                    value={titleCase(image.os)}
                  />
                </Margin>
              </Col>
            </Row>
          </Padding>
        </CardOutlet>
      </Card>
    </Col>
  </Row>
);
