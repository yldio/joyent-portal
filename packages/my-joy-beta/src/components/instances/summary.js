import React, { Component } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import styled, { withTheme } from 'styled-components';
import { Margin, Padding } from 'styled-components-spacing';
import remcalc from 'remcalc';
import is from 'styled-is';
import titleCase from 'title-case';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import copy from 'clipboard-copy';

import {
  Card,
  CardOutlet,
  Divider,
  ResetIcon,
  Button,
  FormLabel,
  Input,
  H2,
  Label,
  QueryBreakpoints,
  DotIcon,
  DeleteIcon,
  StartIcon,
  StopIcon,
  TooltipContainer,
  TooltipTarget,
  Tooltip,
  ClipboardIcon
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

const InputIconWrapper = styled.div`
  display: flex;
  margin-bottom: ${remcalc(10)};
  align-items: center;

  ${is('noMargin')`
    margin-bottom: ${remcalc(0)};
  `};

  input {
    padding-right: ${remcalc(30)};
  }

  div {
    position: relative;
    left: ${remcalc(-26)};
  }
`;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(18)};

  @media (max-width: ${remcalc(767)}) {
    display: none;
  }
`;

const ClipboardIconActionable = styled(ClipboardIcon)`
  cursor: pointer;
`;

export class CopyToClipboardTooltip extends Component {
  constructor() {
    super();

    this.state = {
      copied: false
    };
  }

  handleClick = () => {
    const { children: text } = this.props;

    copy(text);

    this.setState(
      {
        copied: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            copied: false
          });
        }, 4000);
      }
    );
  };

  render = () => (
    <TooltipContainer hoverable>
      <TooltipTarget>
        <ClipboardIconActionable onClick={this.handleClick} />
      </TooltipTarget>
      <Tooltip placement="top" success={Boolean(this.state.copied)}>
        {this.state.copied ? 'Copied To Clipboard' : 'Copy To Clipboard'}
      </Tooltip>
    </TooltipContainer>
  );
}

export const CopiableField = ({ label, text, ...rest }) => (
  <Row>
    <Col xs={12} md={7}>
      <FormLabel>{label}</FormLabel>
      <InputIconWrapper {...rest}>
        <Input fluid value={text} />
        <CopyToClipboardTooltip>{text}</CopyToClipboardTooltip>
      </InputIconWrapper>
    </Col>
  </Row>
);

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
      <H2>{(instance.package || {}).name}</H2>
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
      <Flex>
        <DotIcon
          borderRadius="50%"
          marginRight={remcalc(6)}
          marginTop={remcalc(1)}
          width={remcalc(11)}
          height={remcalc(11)}
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
              {(instance.ips || []).map((ip, i) => (
                <CopiableField
                  key={i}
                  noMargin={i === instance.ips.length - 1}
                  text={ip}
                  label={`IP address ${i + 1}`}
                />
              ))}
            </Padding>
          </CardOutlet>
        </Card>
      </Col>
    </Row>
  )
);
