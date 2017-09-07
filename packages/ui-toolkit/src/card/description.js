import { Subscriber } from 'react-broadcast';
import Baseline from '../baseline';
import typography from '../typography';
import { isNot } from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './title';
import React from 'react';

const StyledTitle = Title.extend`
  ${typography.fontFamily};
  ${typography.normal};

  flex-grow: 1;
  flex-basis: ${remcalc(90)};

  ${isNot('collapsed')`
    padding-bottom: ${remcalc(12)};
  `};
`;

const InnerDescription = styled.div`
  justify-content: flex-start;
  height: 100%;
  position: relative;
`;

const Description = ({ children, ...rest }) => {
  const render = ({ collapsed = false }) => (
    <StyledTitle
      collapsed={collapsed}
      name="card-description"
      xs={collapsed ? 6 : 12}
      {...rest}
    >
      <InnerDescription collapsed={collapsed}>{children}</InnerDescription>
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
