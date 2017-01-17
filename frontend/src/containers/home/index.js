const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');

const Container = require('@ui/components/container');
const Org = require('@containers/org');
const PropTypes = require('@root/prop-types');
const Redirect = require('@components/redirect');
const selectors = require('@state/selectors');
const NotFound = require('@containers/not-found');

const {
  connect
} = ReactRedux;

const {
  Match,
  Miss
} = ReactRouter;

const {
  orgsSelector
} = selectors;

const Home = ({
  orgs = []
}) => {

  const notFound = !orgs.length
    ? <NotFound />
    : Redirect(`/${orgs[0].id}`);

  return (
    <div>
      <Container>
        <Match component={Org} pattern='/:org/:section?' />
        <Miss component={notFound} />
      </Container>
    </div>
  );
};

Home.propTypes = {
  orgs: React.PropTypes.arrayOf(PropTypes.org)
};

const mapStateToProps = (state) => ({
  orgs: orgsSelector(state)
});

module.exports = connect(mapStateToProps)(Home);
