import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import Baseline from '../baseline';
import typography from '../typography';
import remcalc from 'remcalc';
import is from 'styled-is';
import PropTypes from 'prop-types';
import Title from './title';
import React from 'react';

const Span = styled.span`
  display: inline-block;
  flex-direction: column;

  ${typography.fontFamily};
  ${typography.normal};
  font-style: normal;
  font-stretch: normal;
  font-size: ${remcalc(14)};

  justify-content: flex-end;

  ${is('collapsed')`
    display: flex;
  `};

  ${is('fromHeader')`
    color: ${props => props.theme.white};
  `};
`;

const StyledTitle = Title.extend`
  display: inline-block;
  padding: 0 ${remcalc(18)};

  ${typography.fontFamily};
  ${typography.normal};

  ${is('collapsed')`
    display: flex;
    padding: 0;
  `};
`;

const Subtitle = ({ children, ...props }) => {
  const render = ({ active = true, fromHeader = false, collapsed = false }) => (
    <StyledTitle
      name="card-subtitle"
      fromHeader={fromHeader}
      collapsed={collapsed}
      active={active}
      {...props}
    >
      <Span fromHeader={fromHeader} collapsed={collapsed}>
        {children}
      </Span>
    </StyledTitle>
  );

  return <Subscriber channel="card">{render}</Subscriber>;
};

Subtitle.propTypes = {
  children: PropTypes.node,
  collapsed: PropTypes.bool,
  fromHeader: PropTypes.bool
};

export default Baseline(Subtitle);
