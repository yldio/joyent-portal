const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');

const PropTypes = require('@root/prop-types');
const Redirect = require('@components/redirect');
const Section = require('@components/section');
const selectors = require('@state/selectors');

const SectionComponents = {
  summary: require('./summary'),
  instances: require('./instances'),
  metrics: require('./metrics'),
  networks: require('./networks'),
  'tags-metadata': require('./tags-metadata'),
  'activity-feed': require('./activity-feed'),
  'service-manifest': require('./service-manifest'),
  firewall: require('./firewall')
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
  serviceSectionsSelector,
  projectByIdSelector,
  serviceByIdSelector
} = selectors;

const Service = ({
  org = {},
  project = {},
  sections = [],
  service = {}
}) => {
  const pathname = ({
    org,
    project,
    service,
    section
  }) => (
    `/${org}/projects/${project}/services/${service}/${section}`
  );

  const redirectHref = pathname({
    org: org.id,
    project: project.id,
    service: service.id,
    section: 'summary'
  });

  const navLinks = sections.map((name) => ({
    pathname: pathname({
      org: org.id,
      project: project.id,
      service: service.id,
      section: name
    }),
    name
  }));

  const nameLinks = [{
    pathname: `/${org.id}`,
    name: org.name
  }, {
    pathname: `/${org.id}/projects/${project.id}`,
    name: project.name
  }, {
    pathname: redirectHref,
    name: service.name
  }];

  const navMatches = sections.map((name) => (
    <Match
      component={SectionComponents[name]}
      key={name}
      pattern={`/:org/projects/:projectId/services/:serviceId/${name}`}
    />
  ));


  const missMatch = !sections.length ? null : (
    <Miss component={Redirect(redirectHref)} />
  );

  return (
    <Section links={navLinks} name={nameLinks}>
      {navMatches}
      {missMatch}
    </Section>
  );
};

Service.propTypes = {
  org: PropTypes.org,
  project: PropTypes.project,
  sections: PropTypes.sections,
  service: PropTypes.service
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  org: orgByIdSelector(params.org)(state),
  project: projectByIdSelector(params.projectId)(state),
  sections: serviceSectionsSelector(state),
  service: serviceByIdSelector(params.serviceId)(state)
});

module.exports = connect(
  mapStateToProps
)(Service);
