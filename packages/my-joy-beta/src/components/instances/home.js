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
  DotIcon,
  DeleteIcon,
  StartIcon,
  StopIcon,
  TooltipContainer,
  TooltipTarget,
  Tooltip,
  ClipboardIcon
} from 'joyent-ui-toolkit';

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

const FlexEnd = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  flex-grow: 1;
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

const HorizontalDivider = styled.div`
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
      <H2>{instance.package.name}</H2>
    </Col>
  </Row>,
  <Margin top={2} bottom={3}>
    <Flex>
      <Label>{image ? titleCase(image.name) : 'Custom Image'}</Label>
      <HorizontalDivider />
      <Label>
        {brand === 'LX'
          ? 'Infrastructure Container'
          : 'Hardware Virtual Machine'}
      </Label>
      <HorizontalDivider />
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
        <HorizontalDivider />
        <Flex>
          <GreyLabel>Updated: </GreyLabel>
          <Label> {distanceInWordsToNow(updated)} ago</Label>
        </Flex>
      </Flex>
    </Margin>
  </Margin>
];

export default withTheme(
  ({ instance, starting, stopping, rebooting, deleteing, onAction, theme }) => (
    <Row>
      <Col xs={12} sm={12} md={9}>
        <Card>
          <CardOutlet big>
            <Meta {...instance} />
            <Flex>
              <Button
                secondary
                bold
                icon
                loading={starting}
                disabled={instance.state === 'RUNNING'}
                onClick={() => onAction('start')}
              >
                <StartIcon disabled={instance.state === 'RUNNING'} />
                <Padding left={1}>Start</Padding>
              </Button>
              <Button
                secondary
                bold
                icon
                loading={stopping}
                disabled={instance.state === 'STOPPED'}
                onClick={() => onAction('stop')}
              >
                <StopIcon disabled={instance.state === 'STOPPED'} />
                <Padding left={1}>Stop</Padding>
              </Button>
              <Button
                secondary
                bold
                icon
                loading={rebooting}
                disabled={instance.state === 'PROVISIONING'}
                onClick={() => onAction('reboot')}
              >
                <ResetIcon disabled={instance.state === 'PROVISIONING'} />
                <Padding left={1}>Restart</Padding>
              </Button>
            </Flex>
            <FlexEnd>
              <Button
                error
                bold
                icon
                loading={deleteing}
                disabled={instance.state === 'PROVISIONING'}
                onClick={() => onAction('delete')}
              >
                <DeleteIcon
                  fill={theme.red}
                  disabled={instance.state === 'PROVISIONING'}
                />
                <Padding left={1}>Delete</Padding>
              </Button>
            </FlexEnd>
            <Margin bottom={5} top={4}>
              <Divider height={remcalc(1)} />
            </Margin>
            <CopiableField text={instance.id.split('-')[0]} label="Short ID" />
            <CopiableField text={instance.id} label="ID" />
            <CopiableField text={instance.compute_node} label="CN UUID" />
            {instance.image && (
              <CopiableField text={instance.image.id} label="Image UUID" />
            )}
            <CopiableField
              text={`$ ssh root@${instance.primary_ip}`}
              label="Login"
            />
            {instance.ips.map((ip, i) => (
              <CopiableField
                text={`$ ssh root@${instance.primary_ip}`}
                label="Login"
              />
            ))}
            {instance.ips.map((ip, i) => (
              <CopiableField
                key={i}
                noMargin={i === instance.ips.length - 1}
                text={ip}
                label={`IP address ${i + 1}`}
              />
            ))}
          </CardOutlet>
        </Card>
      </Col>
    </Row>
  )
);
