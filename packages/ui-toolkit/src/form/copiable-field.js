import React, { Component } from 'react';
import copy from 'clipboard-copy';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Col, Row } from 'joyent-react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';

import { FormLabel, Input } from '..';

import {
  default as BaseTooltip,
  Container as TooltipContainer,
  Target as TooltipTarget
} from '../tooltip';

import { Clipboard } from '../icons';

const InputIconWrapper = styled.div`
  display: flex;
  align-items: center;

  input {
    padding-right: ${remcalc(30)};
  }

  div {
    position: relative;
    left: ${remcalc(-26)};
  }
`;

const Tooltip = styled(BaseTooltip)`
  top: ${remcalc(-6)} !important;
`;

const ClipboardIconActionable = styled(Clipboard)`
  cursor: pointer;
`;

class CopyToClipboardTooltip extends Component {
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

const CopiableField = ({ md, label, text, ...rest }) => (
  <Row>
    <Col xs="12" md={md || '7'}>
      <Margin bottom="0.5">
        {label ? <FormLabel>{label}</FormLabel> : null}
      </Margin>
      <InputIconWrapper {...rest}>
        <Input {...rest} monospace onBlur={null} fluid value={text} />
        <CopyToClipboardTooltip>{text}</CopyToClipboardTooltip>
      </InputIconWrapper>
    </Col>
  </Row>
);

export default CopiableField;
