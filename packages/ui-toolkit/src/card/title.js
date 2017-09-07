import { Subscriber } from 'react-broadcast';
import isString from 'lodash.isstring';
import typography from '../typography';
import Baseline from '../baseline';
import remcalc from 'remcalc';
import is from 'styled-is';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

const Container = styled.div`
  font-size: ${remcalc(15)};
  line-height: 1.5;
  color: ${props => props.theme.secondary};

  ${typography.fontFamily};
  ${typography.semibold};

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  flex-grow: 2;
  flex-basis: ${remcalc(90)};
  width: 100%;

  padding: ${remcalc(12)} ${remcalc(18)} 0 ${remcalc(18)};

  ${is('fromHeader')`
    color: ${props => props.theme.white};
  `};

  ${is('collapsed')`
    flex-grow: 6;
    flex-direction: column;
    width: auto;
    justify-content: center;
    padding: 0 ${remcalc(18)};
  `};
`;

const Span = styled.span`
  display: inline-block;
  flex-direction: column;
  justify-content: center;

  ${is('collapsed')`
    display: flex;
  `};
`;

const Title = ({ children, ...rest }) => {
  const _children = isString(children) ? <Span>{children}</Span> : children;

  const render = ({ collapsed = false, active = true, fromHeader = false }) => (
    <Container
      collapsed={collapsed}
      fromHeader={fromHeader}
      active={active}
      name="card-title"
      xs={collapsed ? 6 : 12}
      {...rest}
      name="container"
    >
      {_children}
    </Container>
  );

  return <Subscriber channel="card">{render}</Subscriber>;
};

Title.propTypes = {
  children: PropTypes.node,
  /**
   * @ignore
   */
  collapsed: PropTypes.bool,
  /**
   * @ignore
   */
  fromHeader: PropTypes.bool
};

export default Baseline(Title);
