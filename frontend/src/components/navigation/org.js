const React = require('react');
const ReactRedux = require('react-redux');
const Styled = require('styled-components');

const Avatar = require('@ui/components/avatar');
const Container = require('@ui/components/container');
const NavLink = require('@ui/components/nav-link');
const constants = require('@ui/shared/constants');
const PropTypes = require('@root/prop-types');
const selectors = require('@state/selectors');
const Ul = require('@ui/components/horizontal-list/ul');
const fns = require('@ui/shared/functions');

const {
  connect
} = ReactRedux;

const {
  default: styled
} = Styled;

const {
  colors
} = constants;

const {
  orgsSelector
} = selectors;

const {
  remcalc
} = fns;

const StyledNav = styled.div`
  background-color: #f2f2f2;
  border-bottom: ${remcalc(1)} solid ${colors.base.greyDark};

  & ul {
    height: ${remcalc(60)};
    margin: 0px 0px 0px 0px !important;
  }
`;

// TODO: refactor colours into constants in UI
const NavigationLinkContainer = styled.div`
  position: relative;
  padding: ${remcalc(11)} ${remcalc(12)} ${remcalc(12)};
  color: #646464;
  border: ${remcalc(1)} solid ${colors.base.greyDark};
  height: ${remcalc(24)};
  background-color: #f2f2f2;

  &.active {
    background-color: #fafafa;
    border-bottom: solid ${remcalc(1)} #fafafa;
  }
`;

const OrgImage = styled.div`
  float: left;
`;

const OrgAvatar = styled(Avatar)`
  display: block !important;
`;

const OrgName = styled.span`
  margin-left: ${remcalc(12)};
  margin-top: ${remcalc(3)};
`;

const NavLi = styled.li`
  display: inline-block;
  padding-top: ${remcalc(12)};
  padding-left: ${remcalc(3)};

  & a {
    text-decoration: none !important;
  }
`;

const Shadow = styled.div`
  z-index: 1;
  position: absolute;
  height: ${remcalc(5)};
  width: 100%;
  left: 0;
  bottom: 0;
  background-image:
    linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.06));
`;

const StyledUL = styled(Ul)`
  padding: 0;
`;

const OrgNavigation = ({
  orgs = []
}) => {
  const navLinks = orgs.map(({
    id,
    name,
    image,
  }) => {
    const to = `/${id}`;

    return (
      <NavLi key={to}>
        <NavLink activeClassName='active' to={to}>{({
          isActive
        }) =>
          <NavigationLinkContainer className={isActive ? 'active' : ''}>
            { !isActive && <Shadow />}
            <OrgImage>
              <OrgAvatar
                height={remcalc(26)}
                name={name}
                src={image}
                width={remcalc(26)}
              />
            </OrgImage>
            <OrgName>
              {name}
            </OrgName>
          </NavigationLinkContainer>
        }</NavLink>
      </NavLi>
    );
  });

  return (
    <StyledNav>
      <Container>
        <StyledUL>
          {navLinks}
        </StyledUL>
      </Container>
    </StyledNav>
  );
};

OrgNavigation.propTypes = {
  orgs: React.PropTypes.arrayOf(PropTypes.org)
};

const mapStateToProps = (state) => ({
  orgs: orgsSelector(state)
});

module.exports = connect(mapStateToProps)(OrgNavigation);
