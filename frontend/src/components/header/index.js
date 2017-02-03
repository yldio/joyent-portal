const React = require('react');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const Container = require('@ui/components/container');
const Avatar = require('@ui/components/avatar');
const fns = require('@ui/shared/functions');
const logo = require('@resources/logo.svg');
const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const Tooltip = require('@ui/components/tooltip');
const composers = require('@ui/shared/composers');

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

const borderSide = props => props.toggled
  ? 'bottom'
  : 'top';

const StyledHeader = styled.header`
  background-color: #ffffff;
  padding-top: ${remcalc(21)};
  padding-bottom: ${remcalc(21)};
`;

const StyledLogo = styled.img`
  padding-top: ${remcalc(10)};
`;

const StyledProfileWrapper = styled.div`
  position: relative;
`;

const StyledAvatarWrapper = styled.div`
  &:after {
    border-left: ${remcalc(5)} solid transparent;
    border-right: ${remcalc(5)} solid transparent;
    border-${borderSide}: ${remcalc(5)} solid black;

    ${pseudoEl({
      top: '50%',
      right: remcalc(10)
    })}
  }
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  left: ${remcalc(-40)};
  bottom: ${remcalc(-180)};
`;

const StyledName = styled.span`
  color: #646464;
  font-size: ${remcalc(16)}
  position: relative;
  top: ${remcalc(-12)};
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
      <Container fluid>
        <Row>
          <Column xs={2}>
            <Link to='/'>
              <StyledLogo alt='Joyent' src={logo} />
            </Link>
          </Column>
          <Column smOffset={8.5} xs={1.5}>
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
      </Container>
    </StyledHeader>
  );
};

Header.propTypes = {
  account: PropTypes.account,
  handleToggle: React.PropTypes.func,
  tooltip: React.PropTypes.bool
};

module.exports = Header;
