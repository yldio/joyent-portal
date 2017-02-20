import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from '@root/prop-types';
import Redirect from '@components/redirect';
import Section from '@components/section';
import SummarySection from './summary';
import InstancesSection from './instances';
import MetricsSection from './metrics';
import NetworksSection from './networks';
import TagsMetadataSection from './tags-metadata';
import ActivityFeedSection from './activity-feed';
import ServiceManifestSection from './service-manifest';
import FirewallSection from './firewall';

const SectionComponents = {
  summary: SummarySection,
  instances: InstancesSection,
  metrics: MetricsSection,
  networks: NetworksSection,
  'tags-metadata': TagsMetadataSection,
  'activity-feed': ActivityFeedSection,
  'service-manifest': ServiceManifestSection,
  firewall: FirewallSection
};

import {
  orgByIdSelector,
  serviceSectionsSelector,
  projectByIdSelector,
  serviceByIdSelector
} from '@state/selectors';

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
    <Route
      component={SectionComponents[name]}
      key={name}
      path={`/:org/projects/:projectId/services/:serviceId/${name}`}
    />
  ));


  const missMatch = !sections.length ? null : (
    <Route component={Redirect(redirectHref)} />
  );

  return (
    <Section links={navLinks} name={nameLinks}>
      <Switch>
        {navMatches}
        {missMatch}
      </Switch>
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
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.projectId)(state),
  sections: serviceSectionsSelector(state),
  service: serviceByIdSelector(match.params.serviceId)(state)
});

export default connect(
  mapStateToProps
)(Service);
