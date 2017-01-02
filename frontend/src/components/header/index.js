const React = require('react');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const Column = require('@ui/components/column');
const Container = require('@ui/components/container');
const Avatar = require('@ui/components/avatar');
const fns = require('@ui/shared/functions');
const logo = require('@resources/logo.png');
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

const StyledHeader = styled.header`
  background-color: #ffffff;
  padding-top: ${remcalc(21)};
  padding-bottom: ${remcalc(21)};
`;

const StyledLogo = styled.img`
  padding-top: ${remcalc(10)}
`;

const StyledProfileWrapper = styled.div`
  position: relative;
`;

const StyledAvatarWrapper = styled.div`
  &:after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-${props => props.toggled ? 'bottom' : 'top'}: 5px solid black;

    ${pseudoEl({
      top: '50%',
      right: '10px'
    })}
  }
`;

const StyledTooltipWrapper = styled.div`
  position: absolute;
  left: -40px;
  bottom: -180px;
`;

const StyledName = styled.span`
  position: relative;
  top: -12px;
`;

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const EmptyButton = styled.button`
  background: none
  border: none
`;

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
    <StyledHeader>
      <Container fluid>
        <Row>
          <Column xs={2}>
            <Link to='/'>
              <StyledLogo
                alt='Joyent'
                src={logo}
              />
            </Link>
          </Column>
          <Column
            smOffset={8.5}
            xs={1.5}
          >
            <StyledProfileWrapper>
              <StyledAvatarWrapper toggled={tooltip}>
                <EmptyButton onClick={handleToggleClick}>
                  <StyledName>{account.name}</StyledName>
                  <Avatar
                    alt={account.name}
                    name={account.name}
                    src={account.avatar}
                    style={{
                      marginLeft: '12px'
                    }}
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
