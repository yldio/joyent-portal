const paramCase = require('param-case');
const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const Container = require('@ui/components/container');
const Dashboard = require('@containers/dashboard');
const fns = require('@ui/shared/functions');
const Org = require('@containers/org');

const {
  FormattedMessage
} = ReactIntl;

const {
  connect
} = ReactRedux;

const {
  Link,
  Match
} = ReactRouter;

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const StyledNav = styled.div`
  background-color: #f2f2f2;
`;

const StyledUl = styled.ul`
  list-style-type: none;
`;

const StyledLi = styled.li`
  display: inline-block;
  margin-right: ${remcalc(10)};
  padding-top: ${remcalc(10)};
  padding-bottom: ${remcalc(10)};

  & a.active {
    cursor: default;
    color: #373A3C;
    text-decoration: none;
  }
`;

const Home = ({
  orgs = [],
  pathname = '/'
}) => {
  const parent = pathname.replace(/\/$/, '');
  const links = orgs.map((org) => `${parent}/${paramCase(org.name)}`);

  const isDashboardActive = (location) => {
    return !links.some((link) => location.pathname.indexOf(link) >= 0);
  };

  const navLinks = orgs.map(({
    name
  }) => {
    const to = `${parent}/${paramCase(name)}`;

    return (
      <StyledLi key={to}>
        <Link
          activeClassName='active'
          to={to}
        >
          {name}
        </Link>
      </StyledLi>
    );
  });

  return (
    <div>
      <StyledNav>
        <Container>
          <StyledUl>
            <StyledLi key={pathname}>
              <Link
                activeClassName='active'
                isActive={isDashboardActive}
                to={pathname}
              >
                <FormattedMessage id='your-dashboard' />
              </Link>
            </StyledLi>
            {navLinks}
          </StyledUl>
        </Container>
      </StyledNav>
      <Container>
        <Match
          exactly
          pattern={parent}
          render={Dashboard}
        />
        <Match
          component={Org}
          pattern={`${parent}/:org`}
        />
      </Container>
    </div>
  );
};

Home.propTypes = {
  orgs: React.PropTypes.arrayOf(React.PropTypes.shape({
    name: React.PropTypes.string
  })),
  pathname: React.PropTypes.string
};

const mapStateToProps = (state) => ({
  orgs: state.session.data.orgs
});

module.exports = connect(mapStateToProps)(Home);
