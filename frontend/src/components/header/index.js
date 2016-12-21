const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const selectors = require('@state/selectors');
const actions = require('@state/actions');

const Column = require('@ui/components/column');
const Container = require('@ui/components/container');
const Avatar = require('@ui/components/avatar');
const fns = require('@ui/shared/functions');
const logo = require('@resources/logo.png');
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
  connect
} = ReactRedux;

const {
  accountSelector,
  accountUISelector
} = selectors;

const {
  pseudoEl
} = composers;

const {
  handleToggleAction
} = actions;

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
    border-top: 5px solid black;

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

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const Header = ({
  account = {},
  accountUI = {},
  dispatch
}) => {
  const handleToggle = (ev) => {
    ev.preventDefault();
    dispatch(handleToggleAction(accountUI.profile_tooltip));
  };

  return (
    <StyledHeader>
      <Container fluid>
        <Row>
          <Column xs={2}>
            <Link to='/'>
              <StyledLogo
                alt="Joyent"
                src={logo}
              />
            </Link>
          </Column>
          <Column
            smOffset={8.5}
            xs={1.5}
          >
            <StyledProfileWrapper>

              <StyledAvatarWrapper>
                <Link
                  onClick={handleToggle}
                  to='/'
                >
                  <span>{account.name}</span>
                  <Avatar
                    alt={account.name}
                    name={account.name}
                    src={account.avatar}
                  />
                </Link>
              </StyledAvatarWrapper>

              { accountUI.profile_tooltip ? (
                <StyledTooltipWrapper>
                  <Tooltip arrowPosition={arrowPosition}>
                    <li><Link to={'/'}>My Account</Link></li>
                    <li><Link to={'/'}>Settings</Link></li>
                    <li><Link to={'/'}>About</Link></li>
                  </Tooltip>
                </StyledTooltipWrapper>
              ) : null }

            </StyledProfileWrapper>
          </Column>
        </Row>
      </Container>
    </StyledHeader>
  );
};

Header.propTypes = {
  account: React.PropTypes.shape({
    uuid: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string,
  }),
  accountUI: React.PropTypes.shape({
    profile_tooltip: React.PropTypes.boolean
  }),
  dispatch: React.PropTypes.func
};

const mapStateToProps = (state, ownProps) => ({
  account: accountSelector(state),
  accountUI: accountUISelector(state)
});

module.exports = connect(
  mapStateToProps
)(Header);
