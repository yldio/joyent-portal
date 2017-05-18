import { Subscriber } from 'react-broadcast';
import Baseline from '../baseline';
import typography from '../typography';
import is, { isNot } from 'styled-is';
import remcalc from 'remcalc';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from './title';
import React from 'react';

const StyledTitle = styled(Title)`
  ${typography.fontFamily};
  ${typography.normal};

  flex-grow: 2;

  ${isNot('collapsed')`
    position: absolute;
    bottom: 0;
    padding-bottom: ${remcalc(12)};
    padding-top: 0;
  `};
`;

const InnerDescription = styled.div`
  justify-content: flex-start;

  ${is('collapsed')`
    justify-content: flex-end;
    margin-left: auto;
  `};
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
        {children}
      </InnerDescription>
    </StyledTitle>
  );

  return (
    <Subscriber channel="card">
      {render}
    </Subscriber>
  );
};

Description.propTypes = {
  children: PropTypes.node,
  /**
   * @ignore
   */
  collapsed: PropTypes.bool
};

export default Baseline(Description);
