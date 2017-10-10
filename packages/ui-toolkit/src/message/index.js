import React from 'react';
import is from 'styled-is';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import unitcalc from 'unitcalc';
import remcalc from 'remcalc';

import { H4 } from '../text/headings';
import P from '../text/p';
import CloseButton from '../close-button';
import { border, bottomShadow } from '../boxes';

const Container = styled.div`
  position: relative;
  margin-bottom: ${unitcalc(2)};
  background-color: ${props => props.theme.white};
  box-shadow: ${bottomShadow};
  border: ${border.confirmed};
  width: 100%;
  display: flex;
`;

const Color = styled.div`
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

const Outlet = styled.div`
  /* trick prettier */
  padding: ${unitcalc(2)} 0 ${unitcalc(2.25)} 0;
`;

const Close = styled(CloseButton)`
  position: absolute;
  right: ${unitcalc(0.5)};
  top: ${unitcalc(0.5)};
`;

const Message = ({ onCloseClick, children, ...type }) => (
  <Container>
    <Color {...type} />
    <Outlet>{children}</Outlet>
    {onCloseClick && <Close onClick={onCloseClick} />}
  </Container>
);

export const Title = ({ children }) => <H4>{children}</H4>;

export const Description = ({ children }) => <P>{children}</P>;

Message.propTypes = {
  onCloseClick: PropTypes.func,
  error: PropTypes.bool,
  warning: PropTypes.bool,
  success: PropTypes.bool
};

export default Message;
