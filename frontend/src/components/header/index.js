import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Column from '@ui/components/column';
import Avatar from '@ui/components/avatar';
import { remcalc } from '@ui/shared/functions';
import logo from '@resources/logo.svg';
import PropTypes from '@root/prop-types';
import Row from '@ui/components/row';
import Tooltip from '@ui/components/tooltip';
import { pseudoEl } from '@ui/shared/composers';
import { colors } from '@ui/shared/constants';

const borderSide = props => props.toggled
  ? 'bottom'
  : 'top';

const StyledHeader = styled.header`
  background-color: ${colors.base.white};
  padding: 0 ${remcalc(18)};
`;

const StyledLogo = styled.img`
  padding-top: ${remcalc(12)};
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

const StyledTooltipWrapper = styled.div`
  position: absolute;
  right: ${remcalc(-18)};
  bottom: ${remcalc(-140)};
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
`;

const StyledAvatar = styled(Avatar)`
  marginLeft: ${remcalc(12)};
`;

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const Header = (props) => {

  const {
    account,
    handleToggle,
    tooltip
  } = props;

  const handleToggleClick = (ev) => {
    ev.preventDefault();
    handleToggle(!tooltip);
  };

  const handleHideToggle = (ev) => {
    ev.preventDefault();
    handleToggle(false);
  };

  const tooltipComponent = !tooltip ? null : (
    <StyledTooltipWrapper>
      <Tooltip arrowPosition={arrowPosition}>
        <li>
          <Link to='/'>My Account</Link>
        </li>
        <li>
          <Link to='/'>Settings</Link>
        </li>
        <li>
          <Link to='/'>About</Link>
        </li>
      </Tooltip>
    </StyledTooltipWrapper>
  );

  return (
    <StyledHeader
      name='application-header'
      onBlur={handleHideToggle}
      onFocus={handleHideToggle}
    >
      <Row>
        <Column lg={10} xs={8}>
          <Link to='/'>
            <StyledLogo alt='Joyent' src={logo} />
          </Link>
        </Column>
        <Column lg={2} xs={4}>
          <StyledProfileWrapper>
            <StyledAvatarWrapper toggled={tooltip}>
              <EmptyButton onClick={handleToggleClick}>
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
  handleToggle: React.PropTypes.func,
  tooltip: React.PropTypes.bool
};

export default Header;
