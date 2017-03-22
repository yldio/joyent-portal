import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Column from '@ui/components/column';
import Avatar from '@ui/components/avatar';
import { remcalc } from '@ui/shared/functions';
// import Logo from '../../resources/logo.svg';
import Logo from '../../resources/triton_logo_dark.png';
import PropTypes from '@root/prop-types';
import Row from '@ui/components/row';
import Tooltip, { TooltipButton } from '@ui/components/tooltip';
import { pseudoEl, typography } from '@ui/shared/composers';
import { colors } from '@ui/shared/constants';

const borderSide = props => props.toggled
  ? 'bottom'
  : 'top';

const StyledHeader = styled.header`
  background-color: ${colors.base.white};
  padding: 0 ${remcalc(18)};
`;

const StyledLogo = styled.img`
  padding-top: ${remcalc(18)};
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const StyledProfileWrapper = styled.div`
  position: relative;
  padding-top: ${remcalc(6)};
  text-align: right;
`;

const StyledAvatarWrapper = styled.div`
  display: inline-block;

  &:after {
    border-left: ${remcalc(5)} solid transparent;
    border-right: ${remcalc(5)} solid transparent;
    border-${borderSide}: ${remcalc(5)} solid black;

    ${pseudoEl({
      top: '50%',
      right: '0'
    })}
  }
`;

const StyledName = styled.span`
  color: ${colors.base.secondaryDark};
  font-size: ${remcalc(16)};
  height: ${remcalc(66)};
  position: relative;
  top: ${remcalc(-12)};
  margin-right: ${remcalc(6)}
`;

const EmptyButton = styled.button`
  background: none;
  border: none;
  padding-right: ${remcalc(20)};

  ${typography.libreFranklin};
  ${typography.normal};
`;

const StyledAvatar = styled(Avatar)`
  marginLeft: ${remcalc(12)};
`;

const arrowPosition = {
  bottom: '100%',
  right: 18
};

const Header = ({
  account,
  onHeaderToggle,
  tooltip,
  ...props
}) => {
  const handleHeaderToggle = (ev) => {
    ev.preventDefault();
    onHeaderToggle();
  };

  const tooltipComponent = !tooltip ? null : (
    <Tooltip
      onBlur={handleHeaderToggle}
      arrowPosition={arrowPosition}
      right={0}
      top={39}
    >
      <li>
        <TooltipButton to='/'>My Account</TooltipButton>
      </li>
      <li>
        <TooltipButton to='/'>Settings</TooltipButton>
      </li>
      <li>
        <TooltipButton to='/'>About</TooltipButton>
      </li>
    </Tooltip>
  );

  return (
    <StyledHeader name='application-header' {...props}>
      <Row>
        <Column lg={10} xs={8}>
          <Link to='/'>
            <StyledLogo src={Logo} />
          </Link>
        </Column>
        <Column lg={2} xs={4}>
          <StyledProfileWrapper>
            <StyledAvatarWrapper toggled={tooltip}>
              <EmptyButton onClick={handleHeaderToggle}>
                <StyledName>
                  {account.name}
                </StyledName>
                <StyledAvatar
                  alt={account.name}
                  name={account.name}
                  src={account.avatar}
                />
              </EmptyButton>
            </StyledAvatarWrapper>
            {tooltipComponent}
          </StyledProfileWrapper>
        </Column>
      </Row>
    </StyledHeader>
  );
};

Header.propTypes = {
  account: PropTypes.account,
  onHeaderToggle: React.PropTypes.func,
  tooltip: React.PropTypes.bool
};

export default Header;
