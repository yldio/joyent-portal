import { Subscriber } from 'react-broadcast';
import Baseline from '../baseline';
import typography from '../typography';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './title';
import React from 'react';

const StyledTitle = Title.extend`
  ${typography.normal};

  flex-grow: 1;
  flex-basis: ${remcalc(90)};

  ${isNot('collapsed')`
    padding-bottom: ${remcalc(12)};
  `};

  ${is('disabled')`
    color: ${props => props.theme.text};
  `};
`;

const InnerDescription = styled.div`
  justify-content: flex-start;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;

  span {
    display: flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-start;
    justify-content: space-between;
  }
`;

const Description = ({ children, ...rest }) => {
  const render = ({ collapsed = false }) => (
    <StyledTitle
      collapsed={collapsed}
      name="card-description"
      xs={collapsed ? 6 : 12}
      {...rest}
    >
      <InnerDescription collapsed={collapsed}>
        <span>{children}</span>
      </InnerDescription>
    </StyledTitle>
  );

  return <Subscriber channel="card">{render}</Subscriber>;
};

Description.propTypes = {
  children: PropTypes.node,
  /**
   * @ignore
   */
  collapsed: PropTypes.bool
};

export default Baseline(Description);
