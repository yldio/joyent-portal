import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

import { Header, Breadcrumb, Menu } from '@containers/navigation';
import { ServiceScale, ServiceDelete } from '@containers/service';
import { InstanceList } from '@containers/instances';
import Manifest from '@containers/manifest';

import {
  DeploymentGroupList,
  DeploymentGroupCreate,
  DeploymentGroupImport
} from '@containers/deployment-groups';

import {
  ServiceList,
  ServicesTopology,
  ServicesMenu
} from '@containers/services';

const Container = styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-flow: column;
`;

const rootRedirect = p => <Redirect to="/deployment-groups" />;

const deploymentGroupRedirect = p =>
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services-list`}
  />;

const serviceRedirect = p =>
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services/${p.match
      .params.service}/instances`}
  />;

const Router = (
  <BrowserRouter>
    <Container>

      <Route path="/" component={Header} />

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
          path="/deployment-groups/:deploymentGroup/services/:service"
          component={Menu}
        />
        <Route path="/deployment-groups/:deploymentGroup" component={Menu} />
      </Switch>

      <Route path="/" exact component={rootRedirect} />
      <Route path="/deployment-groups" exact component={DeploymentGroupList} />

      <Route
        path="/deployment-groups/:deploymentGroup"
        exact
        component={deploymentGroupRedirect}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services/:service"
        exact
        component={serviceRedirect}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-list"
        component={ServicesMenu}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-topology"
        component={ServicesMenu}
      />

      <Switch>
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
          path="/deployment-groups/:deploymentGroup/services"
          exact
          component={deploymentGroupRedirect}
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
      </Switch>

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

    </Container>
  </BrowserRouter>
);

export default Router;
