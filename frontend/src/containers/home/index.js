const React = require('react');
const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const Container = require('@ui/components/container');
const Dashboard = require('@containers/dashboard');
const Li = require('@ui/components/horizontal-list/li');
const Org = require('@containers/org');
const Redirect = require('@components/redirect');
const Ul = require('@ui/components/horizontal-list/ul');

const {
  FormattedMessage
} = ReactIntl;

const {
  connect
} = ReactRedux;

const {
  Link,
  Match,
  Miss
} = ReactRouter;

const {
  default: styled
} = Styled;

const StyledNav = styled.div`
  background-color: #f2f2f2;
`;

const Home = ({
  orgs = [],
  pathname = '/',
  user = {}
}) => {
  const navLinks = orgs.map(({
    id,
    name
  }) => {
    const to = `/${id}`;

    return (
      <Li key={to}>
        <Link activeClassName='active' to={to}>
          {name}
        </Link>
      </Li>
    );
  });

  return (
    <div>
      <StyledNav>
        <Container>
          <Ul>
            <Li key={pathname}>
              <Link activeClassName='active' to={`/${user.id}`}>
                <FormattedMessage id='your-dashboard' />
              </Link>
            </Li>
            {navLinks}
          </Ul>
        </Container>
      </StyledNav>
      <Container>
        <Match component={Dashboard} pattern={`/${user.id}/:section?`} />
        <Match component={Org} pattern='/:org' />
        <Miss component={Redirect(`/${user.id}`)} />
      </Container>
    </div>
  );
};

Home.propTypes = {
  orgs: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })),
  pathname: React.PropTypes.string,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    name: React.PropTypes.string
  })
};

const mapStateToProps = (state) => ({
  orgs: state.session.data.orgs,
  user: {
    id: state.session.data.name,
    name: state.session.data.name
  }
});

module.exports = connect(mapStateToProps)(Home);
