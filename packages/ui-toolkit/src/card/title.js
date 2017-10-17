import { Subscriber } from 'joy-react-broadcast';
import isString from 'lodash.isstring';
import { Link as BaseLink } from 'react-router-dom';
import remcalc from 'remcalc';
import is from 'styled-is';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';

import typography from '../typography';
import Baseline from '../baseline';

const Container = styled.div`
  font-size: ${remcalc(15)};
  line-height: 1.5;
  color: ${props => props.theme.secondary};

  ${typography.semibold};

  display: flex;
  flex-direction: row;
  align-items: center;

  flex-grow: 4;
  flex-basis: ${remcalc(90)};
  width: 100%;

  padding: ${remcalc(12)} ${remcalc(18)} 0 ${remcalc(18)};
  transition: all 300ms ease;

  ${is('fromHeader')`
    color: ${props => props.theme.white};
  `};

  ${is('collapsed')`
    width: auto;
    padding: 0 ${remcalc(18)};
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
  `};

  ${is('selected')`
    color: ${props => props.theme.primary};
  `};
`;

const Span = styled.span`
  display: inline-block;
  flex-direction: column;
  justify-content: center;

  ${is('collapsed')`
    display: flex;
  `};

  ${is('link')`
    text-decoration-color: ${props => props.theme.secondary};
    text-decoration-line: underline;
    text-decoration-style: solid;
  `};
`;

const Link = styled(BaseLink)`
  color: ${props => props.theme.secondary};

  ${is('fromHeader')`
    color: ${props => props.theme.white};
  `};

  ${is('selected')`
    color: ${props => props.theme.primary};
  `};
`;

const Title = ({ children, to, selected, ...rest }) => {
  const render = ({ collapsed = false, active = true, fromHeader = false }) => {
    const _children = isString(children) ? (
      <Span link={Boolean(to)}>{children}</Span>
    ) : (
      children
    );

    const __children = to ? (
      <Link to={to} selected={selected} fromHeader={fromHeader}>
        {_children}
      </Link>
    ) : (
      _children
    );

    return (
      <Container
        collapsed={collapsed}
        fromHeader={fromHeader}
        active={active}
        name="card-title"
        xs={collapsed ? 6 : 12}
        {...rest}
      >
        {__children}
      </Container>
    );
  };

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
