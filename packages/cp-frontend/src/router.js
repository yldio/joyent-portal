import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Header } from '@components/navigation';

import { Breadcrumb, Menu } from '@containers/navigation';

import { DeploymentGroupList } from '@containers/deployment-groups';
import {
  ServiceList,
  ServicesTopology,
  ServicesMenu
} from '@containers/services';
import { InstanceList } from '@containers/instances';

const rootRedirect = p => <Redirect to="/deployment-groups" />;

const deploymentGroupRedirect = p => (
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services-list`}
  />
);

const serviceRedirect = p => (
  <Redirect
    to={`/deployment-groups/${p.match.params.deploymentGroup}/services/${p.match.params.service}/instances`}
  />
);

const Router = (
  <BrowserRouter>
    <div>

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
        path="/deployment-groups/:deploymentGroup/services-list"
        exact
        component={ServicesMenu}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services-list"
        exact
        component={ServiceList}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services-topology"
        exact
        component={ServicesMenu}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services-topology"
        exact
        component={ServicesTopology}
      />

      <Route
        path="/deployment-groups/:deploymentGroup/services/:service"
        exact
        component={serviceRedirect}
      />
      <Route
        path="/deployment-groups/:deploymentGroup/services/:service/instances"
        exact
        component={InstanceList}
      />

    </div>
  </BrowserRouter>
);

export default Router;
