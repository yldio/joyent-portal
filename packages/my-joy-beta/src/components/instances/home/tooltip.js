import React, { Component } from 'react';
import copy from 'clipboard-copy';
import styled from 'styled-components';
import {
  TooltipContainer,
  TooltipTarget,
  Tooltip,
  CopyIcon
} from 'joyent-ui-toolkit';

const CopyIconActionable = styled(CopyIcon)`
  cursor: pointer;
`;

class CopyToClipboard extends Component {
  constructor() {
    super();
    this.state = {
      copied: false
    };
  }

  handleClick = () => {
    const text = this.props.text;

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
        <CopyIconActionable onClick={this.handleClick} />
      </TooltipTarget>
      <Tooltip placement="top" success={Boolean(this.state.copied)}>
        {this.state.copied ? 'Copied To Clipboard' : 'Copy To Clipboard'}
      </Tooltip>
    </TooltipContainer>
  );
}

export default CopyToClipboard;
