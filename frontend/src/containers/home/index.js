const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const selectors = require('@state/selectors');

const Container = require('@ui/components/container');
const Li = require('@ui/components/horizontal-list/li');
const Org = require('@containers/org');
const Redirect = require('@components/redirect');
const Ul = require('@ui/components/horizontal-list/ul');
const NotFound = require('@containers/not-found');

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

const {
  orgsSelector
} = selectors;

const StyledNav = styled.div`
  background-color: #f2f2f2;
`;

const Home = ({
  orgs = []
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

  const notFound = !orgs.length
    ? <NotFound />
    : Redirect(`/${orgs[0].id}`);

  return (
    <div>
      <StyledNav>
        <Container>
          <Ul>
            {navLinks}
          </Ul>
        </Container>
      </StyledNav>
      <Container>
        <Match component={Org} pattern='/:org/:section?' />
        <Miss component={notFound} />
      </Container>
    </div>
  );
};

Home.propTypes = {
  orgs: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      owner: React.PropTypes.string,
      uuid: React.PropTypes.string,
      id: React.PropTypes.string,
      name: React.PropTypes.string
    })
  )
};

const mapStateToProps = (state) => ({
  orgs: orgsSelector(state)
});

module.exports = connect(mapStateToProps)(Home);
