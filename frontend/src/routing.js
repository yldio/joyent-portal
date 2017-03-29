import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import App from '@containers/app';
import Header from '@containers/header';

import {
  Breadcrumb,
  Menu,
  Org
} from '@containers/navigation';

import {
  OrgPeople,
  OrgSettings
} from '@containers/org';

import {
  ProjectsList,
  ProjectsNewProject,
  ProjectsNewProjectBilling,
  ProjectsNewProjectNewBilling
} from '@containers/projects';

import {
  ProjectFeed,
  ProjectInstances,
  ProjectManifest,
  // ProjectPeople,
  ProjectRollback,
  ProjectSettings
} from '@containers/project';

import {
  ServicesTopology,
  ServicesList,
  ServicesView
} from '@containers/services';

import {
  ServiceActivityFeed,
  ServiceFirewall,
  ServiceInstances,
  ServiceMetrics,
  ServiceNetworks,
  ServiceManifest,
  ServiceSummary,
  ServiceMetadata
} from '@containers/service';

const orgRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/projects`} />
);

const projectRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/services-topology`} />
);

const servicesRedirect = (p) => (
  <Redirect to={`${p.location.pathname}-topology`} />
);

const serviceRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/summary`} />
);

const emptyRoute = (p) => {
  return null;
};

const orgPath = '/:org';
const projectPath = `${orgPath}/projects/:project`;
const servicePath = `${projectPath}/services/:service`;

/* eslint-disable */
const Router = (
  <BrowserRouter>
    <App>
      <Route path='/' component={Header} />

      {/* Navigation */}
      <Route path={orgPath} component={Org} />
      <Switch>
        <Route path={`${orgPath}/projects/~create`} render={emptyRoute} />

        <Route path={servicePath} component={Breadcrumb} />
        <Route path={projectPath} component={Breadcrumb} />
        <Route path={orgPath} component={Breadcrumb} />
      </Switch>
      <Switch>
        <Route path={`${orgPath}/projects/~create`} render={emptyRoute} />

        <Route path={servicePath} component={Menu} />
        <Route path={projectPath} component={Menu} />
        <Route path={orgPath} component={Menu} />
      </Switch>

      {/* Projects */}
      <Route path={orgPath} exact render={orgRedirect} />
      <Route path={`${orgPath}/projects`} exact component={ProjectsList} />
      <Switch>
        {/* Redirect to services only for project root */}
        {/* Projects - New Project */}
        <Route path={`${orgPath}/projects/~create/billing/create`} component={ProjectsNewProjectNewBilling} />
        <Route path={`${orgPath}/projects/~create/billing`} component={ProjectsNewProjectBilling} />
        <Route path={`${orgPath}/projects/~create`} component={ProjectsNewProject} />
        {/* Project */}
        <Route path={projectPath} exact render={projectRedirect} />
      </Switch>

      {/* Project / Feed */}
      <Route path={`${projectPath}/project-feed`} component={ProjectFeed} />
      {/* Project / Services */}
      <Route path={`${projectPath}/services`} render={servicesRedirect} />
      <Route path={`${projectPath}/services-topology`} exact component={ServicesView} />
      <Route path={`${projectPath}/services-topology`} exact component={ServicesTopology} />
      <Route path={`${projectPath}/services-list`} exact component={ServicesView} />
      <Route path={`${projectPath}/services-list`} exact component={ServicesList} />
      {/* Project / Instances */}
      <Route path={`${projectPath}/instances`} component={ProjectInstances} />
      {/* Project / Rollback */}
      <Route path={`${projectPath}/rollback`} component={ProjectRollback} />
      {/* Project / Manifest */}
      <Route path={`${projectPath}/manifest`} component={ProjectManifest} />
      {/* Project / Settings */}
      <Route path={`${projectPath}/settings`} component={ProjectSettings} />

      {/* Service */}
      {/* Redirect to services only for service root */}
      <Route path={servicePath} render={serviceRedirect} />
      <Route path={`${servicePath}/activity-feed`} component={ServiceActivityFeed} />
      <Route path={`${servicePath}/firewall`} component={ServiceFirewall} />
      {/* Instances */}
      <Route path={`${servicePath}/instances`} component={ServiceInstances} />
      {/* Metrics */}
      <Route path={`${servicePath}/metrics`} component={ServiceMetrics} />
      <Route path={`${servicePath}/networks`} component={ServiceNetworks} />
      <Route path={`${servicePath}/service-manifest`} component={ServiceManifest} />
      <Route path={`${servicePath}/summary`} component={ServiceSummary} />
      <Route path={`${servicePath}/tags-metadata`} component={ServiceMetadata} />

      {/* People - TODO This route is broken */}
      <Route path={`${orgPath}/people`} exact component={OrgPeople} />

      {/* Settings */}
      <Route path={`${orgPath}/settings`} exact component={OrgSettings} />

    </App>
  </BrowserRouter>
);
/* eslint-enable */
export default Router;
