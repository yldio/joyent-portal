import { Subscriber } from 'react-broadcast';
import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc, is } from '../../shared/functions';
import Button from '../button';
import React from 'react';

const Nav = styled.nav`
  flex: 0 0 ${remcalc(47)};
  border-left: ${remcalc(1)} solid ${colors.base.grey};
  box-sizing: border-box;

  ${is('fromHeader')`
    border-left-color: ${colors.base.primary};
  `};
`;

const StyledButton = styled(Button)`
  border-width: 0;
  box-shadow: none;
  width: 100%;
  min-width: auto;
  height: ${remcalc(124)};

  display: flex;
  overflow-x: visible;
  overflow-y: visible;

  ${is('collapsed')`
    height: ${remcalc(46)};
  `};

  &:focus {
    border-width: 0;
  }

  &:hover {
    border-width: 0;
  }

  &:active,
  &:active:hover,
  &:active:focus {
    border-width: 0;
  }
`;

const Options = ({
  children,
  ...props
}) => {
  const render = ({
    fromHeader = false,
    collapsed = false
  }) => (
    <Nav fromHeader={fromHeader} name='list-item-options'>
      <StyledButton
        secondary={!fromHeader}
        collapsed={collapsed}
        rect
        {...props}
      >
        {children}
      </StyledButton>
    </Nav>
  );

  return (
    <Subscriber channel='list-item'>
      {render}
    </Subscriber>
  );
};

Options.propTypes = {
  children: React.PropTypes.node,
  collapsed: React.PropTypes.bool,
  fromHeader: React.PropTypes.bool
};

export default Baseline(
  Options
);
