import styled from 'styled-components';
import { Baseline } from '../../shared/composers';
import { colors } from '../../shared/constants';
import { remcalc, is } from '../../shared/functions';
import transferProps from '../../shared/transfer-props';
import Button from '../button';
import React from 'react';

const Nav = styled.nav`
  flex: 0 0 ${remcalc(47)};
  border-left: ${remcalc(1)} solid ${colors.base.grey};

  ${is('fromHeader')`
    border-left-color: ${colors.base.primary};
  `};
`;

const StyledButton = styled(Button)`
  border-width: 0;
  box-shadow: none;
  width: 100%;
  height: ${remcalc(124)};

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

const Options = transferProps([
  'collapsed',
  'headed',
  'fromHeader'
], ({
  children,
  fromHeader,
  ...props
}) => (
  <Nav
    fromHeader={fromHeader}
    name='list-item-options'
  >
    <StyledButton
      rect
      secondary={!fromHeader}
      {...props}
    >
      {children}
    </StyledButton>
  </Nav>
));

Options.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Options
);
