import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Breadcrumb, Menu } from '@containers/navigation';
import Manifest from '@containers/manifest';
import Environment from '@containers/environment';

import {
  DeploymentGroupList,
  DeploymentGroupCreate,
  DeploymentGroupImport
} from '@containers/deployment-groups';

import {
  ServiceList,
  ServicesTopology,
  ServicesMenu,
  ServicesQuickActions
} from '@containers/services';

import {
  ServiceScale,
  ServiceDelete,
  ServiceMetrics
} from '@containers/service';

import { InstanceList, InstancesTooltip } from '@containers/instances';

import { DeploymentGroupDelete } from '@containers/deployment-group';

import { NotFound } from '@components/navigation';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-flow: column;
`;

const rootRedirect = p => <Redirect to="/deployment-groups" />;

const servicesListRedirect = p => (
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services-list`}
  />
);

const servicesTopologyRedirect = p => (
  <Redirect
    to={`/deployment-groups/${p.match.params
      .deploymentGroup}/services-topology`}
  />
);

const serviceRedirect = p => (
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services/${p.match
      .params.service}/instances`}
  />
);

const App = p => (
  <div>
    <Switch>
      <Route
        path="/deployment-groups/:deploymentGroup/services/:service"
        component={Breadcrumb}
      />
      <Route
        path="/deployment-groups/:deploymentGroup"
        component={Breadcrumb}
      />
      <Route path="/deployment-groups" component={Breadcrumb} />
    </Switch>

    <Switch>
      <Route
        path="/deployment-groups/:deploymentGroup/delete"
        exact
        component={DeploymentGroupDelete}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services/:service"
        component={Menu}
      />
      <Route path="/deployment-groups/:deploymentGroup" component={Menu} />
    </Switch>

    <Route path="/deployment-groups" exact component={DeploymentGroupList} />

    <Route
      path="/deployment-groups/:deploymentGroup/services-list"
      component={ServicesMenu}
    />

    <Route
      path="/deployment-groups/:deploymentGroup/services-topology"
      component={ServicesMenu}
    />

    <Route
      path="/deployment-groups/:deploymentGroup/services-list"
      component={ServicesQuickActions}
    />

    <Route
      path="/deployment-groups/:deploymentGroup/services-topology"
      component={ServicesQuickActions}
    />

    <Route
      path="/deployment-groups/:deploymentGroup/instances"
      exact
      component={InstancesTooltip}
    />

    <Route
      path="/deployment-groups/:deploymentGroup/services/:service/instances"
      exact
      component={InstancesTooltip}
    />

    <Switch>
      <Route
        path="/deployment-groups/:deploymentGroup/delete"
        exact
        component={DeploymentGroupList}
      />

      <Route
        path="/deployment-groups/~create/:stage?"
        exact
        component={DeploymentGroupCreate}
      />
      <Route
        path="/deployment-groups/~import/:slug"
        exact
        component={DeploymentGroupImport}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/instances"
        exact
        component={InstanceList}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/manifest/:stage?"
        exact
        component={Manifest}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/environment"
        exact
        component={Environment}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-list"
        component={ServiceList}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-topology"
        component={ServicesTopology}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services/:service/instances"
        exact
        component={InstanceList}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services/:service/metrics"
        exact
        component={ServiceMetrics}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services/:service"
        component={serviceRedirect}
      />

      <Route
        path="/deployment-groups/:deploymentGroup"
        component={servicesListRedirect}
      />
    </Switch>

    <Switch>
      <Route
        path="/deployment-groups/:deploymentGroup/services-list/:service/scale"
        exact
        component={ServiceScale}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-list/:service/delete"
        exact
        component={ServiceDelete}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-topology/:service/scale"
        exact
        component={ServiceScale}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services-topology/:service/delete"
        exact
        component={ServiceDelete}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-list"
        component={servicesListRedirect}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services-topology"
        component={servicesTopologyRedirect}
      />
    </Switch>
  </div>
);

const Router = (
  <BrowserRouter>
    <Container>
      <Route path="/" component={Header} />
      <Switch>
        <Route path="/deployment-groups" component={App} />
        <Route path="/" exact component={rootRedirect} />
        <Route path="/*" component={NotFound} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default Router;
