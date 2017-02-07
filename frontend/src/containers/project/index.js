const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');

const PropTypes = require('@root/prop-types');
const Redirect = require('@components/redirect');
const selectors = require('@state/selectors');

const SectionComponents = {
  services: require('./services'),
  instances: require('./instances'),
  people: require('./people'),
  settings: require('./settings'),
  manifest: require('./manifest')
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
  projectSectionsSelector,
  projectByIdSelector
} = selectors;

const Project = ({
  org = {},
  project = {},
  sections = []
}) => {
  const navMatches = sections.map((name) => (
    <Route
      component={SectionComponents[name]}
      key={name}
      path={`/:org/projects/:projectId/${name}`}
    />
  ));

  const missMatch = !sections.length ? null : (
    <Route component={Redirect(`/${org.id}/projects/${project.id}/services`)} />
  );

  return (
    <Switch>
      {navMatches}
      {missMatch}
    </Switch>
  );
};

Project.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  sections: PropTypes.sections
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  sections: projectSectionsSelector(state)
});

module.exports = connect(
  mapStateToProps
)(Project);
