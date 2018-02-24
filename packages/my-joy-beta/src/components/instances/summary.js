import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled, { withTheme } from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import titleCase from 'title-case';
import get from 'lodash.get';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  Divider,
  ResetIcon,
  Button,
  H2,
  Label,
  CopiableField,
  QueryBreakpoints,
  DotIcon,
  DeleteIcon,
  StartIcon,
  StopIcon,
  InstanceTypeIcon
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  @media (max-width: ${remcalc(767)}) {
    display: block;
  }
`;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(12)};

  @media (max-width: ${remcalc(767)}) {
    display: none;
  }
`;

export const Meta = ({
  created,
  updated,
  state,
  brand,
  image,
  ...instance
}) => [
  <Row middle="xs">
    <Col xs={12}>
      <H2>{instance.name}</H2>
    </Col>
  </Row>,
  <Margin top={2} bottom={3}>
    <Flex>
      <Label>
        {image && image.name ? titleCase(image.name) : 'Custom Image'}
      </Label>
      <VerticalDivider />
      <Label>
        {brand === 'LX'
          ? 'Infrastructure Container'
          : 'Hardware Virtual Machine'}
      </Label>
      <VerticalDivider />
      <Label>{(instance.package || {}).name}</Label>
      <VerticalDivider />
      <Flex>
        <DotIcon
          right={remcalc(6)}
          size={remcalc(15)}
          color={stateColor[state]}
        />
        {titleCase(state)}
      </Flex>
    </Flex>
    <Margin top={1}>
      <Flex>
        <Flex>
          <GreyLabel>Created: </GreyLabel>
          <Label> {distanceInWordsToNow(created)} ago</Label>
        </Flex>
        <VerticalDivider />
        <Flex>
          <GreyLabel>Updated: </GreyLabel>
          <Label> {distanceInWordsToNow(updated)} ago</Label>
        </Flex>
      </Flex>
    </Margin>
  </Margin>
];

export default withTheme(
  ({
    instance = {},
    starting = false,
    stopping = false,
    rebooting = false,
    removing = false,
    onAction,
    theme = {}
  }) => (
    <Row>
      <Col xs={12} sm={12} md={9}>
        <Card>
          <CardOutlet>
            <Padding all={4}>
              <Meta {...instance} />
              <Row between="xs">
                <Col xs={9}>
                  <Button
                    href={`http://localhost:3070/~create/${instance.name}`}
                    target="__blank"
                    rel="noopener noreferrer"
                    secondary
                    small
                    icon
                  >
                    <InstanceTypeIcon />
                  </Button>
                  <SmallOnly>
                    <Button
                      type="button"
                      loading={starting}
                      disabled={instance.state !== 'STOPPED'}
                      onClick={() => onAction('start')}
                      secondary
                      small
                      icon
                    >
                      <StartIcon disabled={instance.state !== 'STOPPED'} />
                    </Button>
                  </SmallOnly>
                  <Medium>
                    <Button
                      type="button"
                      loading={starting}
                      disabled={instance.state !== 'STOPPED'}
                      onClick={() => onAction('start')}
                      secondary
                      bold
                      icon
                    >
                      <StartIcon disabled={instance.state !== 'STOPPED'} />
                      <span>Start</span>
                    </Button>
                  </Medium>
                  <SmallOnly>
                    <Button
                      type="button"
                      loading={stopping}
                      disabled={instance.state !== 'RUNNING'}
                      onClick={() => onAction('stop')}
                      secondary
                      small
                      icon
                    >
                      <StopIcon disabled={instance.state !== 'RUNNING'} />
                    </Button>
                  </SmallOnly>
                  <Medium>
                    <Button
                      type="button"
                      loading={stopping}
                      disabled={instance.state !== 'RUNNING'}
                      onClick={() => onAction('stop')}
                      secondary
                      bold
                      icon
                    >
                      <StopIcon disabled={instance.state !== 'RUNNING'} />
                      <span>Stop</span>
                    </Button>
                  </Medium>
                  <SmallOnly>
                    <Button
                      type="button"
                      loading={rebooting}
                      disabled={instance.state !== 'RUNNING'}
                      onClick={() => onAction('reboot')}
                      secondary
                      small
                      icon
                    >
                      <ResetIcon disabled={instance.state !== 'RUNNING'} />
                    </Button>
                  </SmallOnly>
                  <Medium>
                    <Button
                      type="button"
                      loading={rebooting}
                      disabled={instance.state !== 'RUNNING'}
                      onClick={() => onAction('reboot')}
                      secondary
                      bold
                      icon
                    >
                      <ResetIcon disabled={instance.state !== 'RUNNING'} />
                      <span>Reboot</span>
                    </Button>
                  </Medium>
                </Col>
                <Col xs={3}>
                  <SmallOnly>
                    <Button
                      type="button"
                      loading={removing}
                      disabled={
                        ['RUNNING', 'STOPPED'].indexOf(instance.state) < 0
                      }
                      onClick={() => onAction('remove')}
                      secondary
                      small
                      right
                      icon
                      error
                    >
                      <DeleteIcon
                        fill={theme.red}
                        disabled={
                          ['RUNNING', 'STOPPED'].indexOf(instance.state) < 0
                        }
                      />
                    </Button>
                  </SmallOnly>
                  <Medium>
                    <Button
                      type="button"
                      loading={removing}
                      disabled={
                        ['RUNNING', 'STOPPED'].indexOf(instance.state) < 0
                      }
                      onClick={() => onAction('remove')}
                      secondary
                      bold
                      right
                      icon
                      error
                    >
                      <DeleteIcon
                        fill={
                          ['RUNNING', 'STOPPED'].indexOf(instance.state) >= 0
                            ? theme.red
                            : undefined
                        }
                        disabled={
                          ['RUNNING', 'STOPPED'].indexOf(instance.state) < 0
                        }
                      />
                      <span>Remove</span>
                    </Button>
                  </Medium>
                </Col>
              </Row>
              <Margin bottom={5} top={4}>
                <Divider height={remcalc(1)} />
              </Margin>
              <CopiableField
                text={(instance.id || '').split('-')[0]}
                label="Short ID"
              />
              <CopiableField text={instance.id} label="ID" />
              <CopiableField text={instance.compute_node} label="CN UUID" />
              {instance.image &&
                instance.image.id && (
                  <CopiableField text={instance.image.id} label="Image UUID" />
                )}
              <CopiableField
                text={`ssh root@${instance.primary_ip}`}
                label="Login"
              />
              {get(instance, 'ips.public', []).map((ip, i, ips) => (
                <CopiableField
                  key={`public-${i}`}
                  label={`Public IP address ${ips.length > 1 ? i + 1 : ''}`}
                  text={ip}
                />
              ))}
              {get(instance, 'ips.private', []).map((ip, i, ips) => (
                <CopiableField
                  key={`private-${i}`}
                  noMargin={i === ips.length - 1}
                  label={`Private IP address ${ips.length > 1 ? i + 1 : ''}`}
                  text={ip}
                />
              ))}
            </Padding>
          </CardOutlet>
        </Card>
      </Col>
    </Row>
  )
);
