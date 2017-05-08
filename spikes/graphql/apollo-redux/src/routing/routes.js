import React from 'react';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { Container } from '../components/layout';
import { DeploymentGroupList } from '../containers/deployment-groups';
import { ServiceList } from '../containers/services';
import { InstanceList } from '../containers/instances';

const rootRedirect = (p) => (
  <Redirect to='/deployment-groups' />
);

const deploymentGroupRedirect = (p) => (
  <Redirect to={`${p.location.pathname}/services`} />
);

const Router = (
  <BrowserRouter>
    <Container>

      <Route path='/' exact component={rootRedirect} />
      <Route path='/deployment-groups' exact component={DeploymentGroupList} />

      <Route path='/deployment-groups/:deploymentGroup' exact component={deploymentGroupRedirect} />
      <Route path='/deployment-groups/:deploymentGroup/services' exact component={ServiceList} />

      <Route path='/deployment-groups/:deploymentGroup/services/:service/instances' exact component={InstanceList} />

    </Container>
  </BrowserRouter>
);

export default Router;
