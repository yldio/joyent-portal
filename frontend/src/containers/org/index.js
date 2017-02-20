const isEmpty = require('lodash.isempty');
const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');

const NotFound = require('@containers/not-found');
const PropTypes = require('@root/prop-types');
const Redirect = require('@components/redirect');
const selectors = require('@state/selectors');

const NewProject = require('@containers/new-project');

const SectionComponents = {
  people: require('./people'),
  projects: require('./projects'),
  settings: require('./settings')
};

const {
  connect
} = ReactRedux;

const {
  Switch,
  Route
} = ReactRouter;

const {
  orgByIdSelector,
  orgSectionsSelector
} = selectors;

const Org = ({
  org = {},
  sections = []
}) => {
  if (isEmpty(org)) {
    return (
      <NotFound />
    );
  }

  const missMatch = !sections.length ? null : (
    <Route
      component={Redirect(`/${org.id}/${sections[0]}`)}
      exact
      path={`/${org.id}`}
    />
  );

  const navMatches = sections.map((name) => (
    <Route
      component={SectionComponents[name]}
      key={name}
      path={`/:org/${name}`}
    />
  ));

  navMatches.push(
    <Route
      component={NewProject}
      key='new-project'
      path={'/:org/new-project'}
    />
  );

  return (
    <Switch>
      {missMatch}
      {navMatches}
    </Switch>
  );
};

Org.propTypes = {
  org: PropTypes.org,
  sections: PropTypes.sections
};

const mapStateToProps = (state, ownProps) => ({
  org: orgByIdSelector(ownProps.match.params.org)(state),
  sections: orgSectionsSelector(ownProps.match.params.org)(state)
});

module.exports = connect(mapStateToProps)(Org);
