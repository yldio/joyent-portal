import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { LayoutContainer } from '@components/layout';

import { Breadcrumb, Menu } from '@containers/navigation';

import { DeploymentGroupList } from '@containers/deployment-groups';
import { ServiceList } from '@containers/services';
import { InstanceList } from '@containers/instances';

import { ServiceMetrics, SingleMetrics } from '@containers/service';

const rootRedirect = (p) => (
  <Redirect to='/deployment-groups' />
);

const deploymentGroupRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/services`} />
);

const Router = (
  <BrowserRouter>
    <LayoutContainer>

      <Switch>
        <Route path='/deployment-groups/:deploymentGroup/services/:service' component={Breadcrumb} />
        <Route path='/deployment-groups/:deploymentGroup' component={Breadcrumb} />
      </Switch>
      <Switch>
        <Route path='/deployment-groups/:deploymentGroup/services/:service' component={Menu} />
        <Route path='/deployment-groups/:deploymentGroup' component={Menu} />
      </Switch>

      <Route path='/' exact component={rootRedirect} />
      <Route path='/deployment-groups' exact component={DeploymentGroupList} />

      <Route path='/deployment-groups/:deploymentGroup' exact component={deploymentGroupRedirect} />
      <Route path='/deployment-groups/:deploymentGroup/services' exact component={ServiceList} />

      <Route path='/deployment-groups/:deploymentGroup/services/:service/instances' exact component={InstanceList} />
      <Route path='/deployment-groups/:deploymentGroup/services/:service/metrics' exact component={ServiceMetrics} />
      <Route path='/deployment-groups/:deploymentGroup/services/:service/single-metrics' exact component={SingleMetrics} />

    </LayoutContainer>
  </BrowserRouter>
);

export default Router;
