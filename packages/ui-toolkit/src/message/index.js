import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';

import { H3 } from '../text/headings';
import P from '../text/p';
import CloseButton from '../close-button';
import { border, bottomShaddow } from '../boxes';

const StyledContainer = styled.div`
  position: relative;
  margin-bottom: ${unitcalc(2)};
  background-color: ${props => props.theme.white};
  box-shadow: ${bottomShaddow};
  border: ${border.confirmed};
`;

const StyledColor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${unitcalc(6)};
  height: 100%;
  background-color: ${props =>
    props.type === 'ERROR'
      ? props.theme.red
      : props.type === 'WARNING'
        ? props.theme.orange
        : props.type === 'EDUCATION' ? props.theme.green : props.theme.green};
`;

const StyledMessageContainer = styled.div`
  padding: ${unitcalc(2)} 0 ${unitcalc(2.25)} 0;
`;

const StyledTitle = styled(H3)`
  margin: 0 ${unitcalc(9)} ${unitcalc(0.25)} ${unitcalc(9)};
  font-weight: 600;
`;

const StyledMessage = styled(P)`
  margin: ${unitcalc(0.25)} ${unitcalc(9)} 0 ${unitcalc(9)};
`;

const StyledClose = styled(CloseButton)`
  position: absolute;
  right: ${unitcalc(0.5)};
  top: ${unitcalc(0.5)};
`;

const Message = ({ title, message, onCloseClick, type = 'MESSAGE' }) => {
  const renderTitle = title
    ? <StyledTitle>
        {title}
      </StyledTitle>
    : null;

  const renderClose = onCloseClick
    ? <StyledClose onClick={onCloseClick} />
    : null;

  return (
    <StyledContainer>
      <StyledColor type={type} />
      <StyledMessageContainer>
        {renderTitle}
        <StyledMessage>
          {message}
        </StyledMessage>
      </StyledMessageContainer>
      {renderClose}
    </StyledContainer>
  );
};

Message.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  onCloseClick: PropTypes.func,
  type: PropTypes.oneOf(['ERROR', 'WARNING', 'EDUCATION', 'MESSAGE'])
};

export default Message;
