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
  Match,
  Miss
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
    <Match
      component={SectionComponents[name]}
      key={name}
      pattern={`/:org/projects/:projectId/${name}`}
    />
  ));

  const missMatch = !sections.length ? null : (
    <Miss component={Redirect(`/${org.id}/projects/${project.id}/services`)} />
  );

  return (
    <div>
      {navMatches}
      {missMatch}
    </div>
  );
};

Project.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  sections: PropTypes.sections
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  project: projectByIdSelector(params.projectId)(state),
  sections: projectSectionsSelector(state)
});

module.exports = connect(
  mapStateToProps
)(Project);
