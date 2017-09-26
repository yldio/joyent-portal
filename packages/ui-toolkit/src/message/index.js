import React from 'react';
import is from 'styled-is';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import P from '../text/p';
import CloseButton from '../close-button';
import { border, bottomShaddow } from '../boxes';

const StyledContainer = styled.div`
  position: relative;
  margin-bottom: ${unitcalc(2)};
  background-color: ${props => props.theme.white};
  box-shadow: ${bottomShaddow};
  border: ${border.confirmed};
  width: 100%;
  display: flex;
`;

const StyledColor = styled.div`
  min-width: ${remcalc(36)};
  margin-right: ${remcalc(18)};
  min-height: 100%;
  background-color: ${props => props.theme.green};
  ${is('error')`
    background-color: ${props => props.theme.red};
  `};
  ${is('warning')`
    background-color: ${props => props.theme.orange};
  `};
`;

const StyledMessageContainer = styled.div`
  padding: ${unitcalc(2)} 0 ${unitcalc(2.25)} 0;
`;

const StyledClose = styled(CloseButton)`
  position: absolute;
  right: ${unitcalc(0.5)};
  top: ${unitcalc(0.5)};
`;

const Message = ({ title, message, onCloseClick, children, ...type }) => {
  const renderTitle = title ? <H4>{title}</H4> : null;

  const renderClose = onCloseClick ? (
    <StyledClose onClick={onCloseClick} />
  ) : null;

  return (
    <StyledContainer>
      <StyledColor {...type} />
      <div>
        <StyledMessageContainer>
          {renderTitle}
          <P>{message || children}</P>
        </StyledMessageContainer>
      </div>
      {renderClose}
    </StyledContainer>
  );
};

Message.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onCloseClick: PropTypes.func,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool
};

export default Message;
