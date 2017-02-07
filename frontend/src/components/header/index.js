const React = require('react');
const ReactRouter = require('react-router-dom');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const Avatar = require('@ui/components/avatar');
const fns = require('@ui/shared/functions');
const logo = require('@resources/logo.svg');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const Tooltip = require('@ui/components/tooltip');
const composers = require('@ui/shared/composers');
const constants = require('@ui/shared/constants');

const {
  Link
} = ReactRouter;

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  pseudoEl
} = composers;

const {
  colors,
} = constants;

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
      right: remcalc(-10),
    })}
  }
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  right: ${remcalc-18};
  bottom: ${remcalc(-180)};
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
`;

const StyledAvatar = styled(Avatar)`
  marginLeft: ${remcalc(12)};
`;

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const Header = ({
  account = {},
  tooltip = false,
  handleToggle
}) => {
  const handleToggleClick = (ev) => {
    ev.preventDefault();
    handleToggle();
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
    <StyledHeader name="application-header">
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

module.exports = Header;
